export class OverlayAnalyzerService {
    session;
    constructor(session) {
        this.session = session;
    }
    async findOverlaps(input) {
        const findings = await this.session.evaluate(this.findOverlapsInPage, input);
        return { findings };
    }
    async annotateOverlaps(findings, top) {
        const slice = findings.slice(0, Math.max(0, top));
        await this.session.evaluate(this.annotateInPage, { findings: slice });
    }
    async clearAnnotations() {
        await this.session.evaluate(this.clearAnnotationsInPage, {});
    }
    // NOTE: functions below run inside the browser page context (no Node APIs)
    findOverlapsInPage = (input) => {
        const minAreaPx = input.minAreaPx ?? 400;
        const maxElements = input.maxElements ?? 900;
        const maxFindings = input.maxFindings ?? 40;
        const root = document.body ?? document.documentElement;
        const all = Array.from(root.querySelectorAll("*"));
        const isVisible = (el) => {
            const style = window.getComputedStyle(el);
            if (style.display === "none")
                return false;
            if (style.visibility === "hidden")
                return false;
            if (Number(style.opacity || "1") === 0)
                return false;
            const rect = el.getBoundingClientRect();
            if (rect.width <= 0 || rect.height <= 0)
                return false;
            if (rect.bottom < 0 || rect.right < 0)
                return false;
            if (rect.top > window.innerHeight || rect.left > window.innerWidth)
                return false;
            return true;
        };
        const rectOf = (el) => {
            const r = el.getBoundingClientRect();
            return { x: r.x, y: r.y, width: r.width, height: r.height };
        };
        const areaOf = (r) => r.width * r.height;
        const cssPath = (el) => {
            // prefer stable selectors when possible
            const anyEl = el;
            const id = anyEl.id;
            if (id)
                return `#${CSS.escape(id)}`;
            const parts = [];
            let cur = el;
            while (cur && cur.nodeType === Node.ELEMENT_NODE && parts.length < 6) {
                const e = cur;
                const tag = e.tagName.toLowerCase();
                const classes = Array.from(e.classList).slice(0, 2).map((c) => CSS.escape(c));
                let part = tag + (classes.length ? `.${classes.join(".")}` : "");
                const parent = e.parentElement;
                if (parent) {
                    const sameTag = Array.from(parent.children).filter((c) => c.tagName === e.tagName);
                    if (sameTag.length > 1) {
                        const idx = sameTag.indexOf(e) + 1;
                        part += `:nth-of-type(${idx})`;
                    }
                }
                parts.unshift(part);
                cur = parent;
            }
            return parts.join(" > ");
        };
        const candidates = all
            .filter(isVisible)
            .map((el) => {
            const rect = rectOf(el);
            return {
                el,
                rect,
                area: areaOf(rect),
                tag: el.tagName.toLowerCase(),
                id: el.id || undefined,
                classes: Array.from(el.classList)
            };
        })
            .filter((x) => x.area >= minAreaPx);
        const limited = candidates.length <= maxElements
            ? candidates
            : candidates
                .sort((a, b) => b.area - a.area)
                .slice(0, maxElements);
        const rectRight = (r) => r.x + r.width;
        const rectBottom = (r) => r.y + r.height;
        const nodes = limited.map((n) => ({ ...n, selector: cssPath(n.el) }));
        nodes.sort((a, b) => a.rect.x - b.rect.x);
        const active = [];
        const findings = [];
        const intersectArea = (a, b) => {
            const left = Math.max(a.rect.x, b.rect.x);
            const right = Math.min(rectRight(a.rect), rectRight(b.rect));
            if (right <= left)
                return 0;
            const top = Math.max(a.rect.y, b.rect.y);
            const bottom = Math.min(rectBottom(a.rect), rectBottom(b.rect));
            if (bottom <= top)
                return 0;
            return (right - left) * (bottom - top);
        };
        for (const cur of nodes) {
            const curLeft = cur.rect.x;
            for (let i = active.length - 1; i >= 0; i -= 1) {
                if (rectRight(active[i].rect) <= curLeft) {
                    active.splice(i, 1);
                }
            }
            for (const prev of active) {
                const area = intersectArea(prev, cur);
                if (area <= 0)
                    continue;
                findings.push({
                    intersectionArea: area,
                    a: {
                        selector: prev.selector,
                        tag: prev.tag,
                        id: prev.id,
                        classes: prev.classes,
                        rect: prev.rect
                    },
                    b: {
                        selector: cur.selector,
                        tag: cur.tag,
                        id: cur.id,
                        classes: cur.classes,
                        rect: cur.rect
                    }
                });
            }
            active.push(cur);
        }
        findings.sort((x, y) => y.intersectionArea - x.intersectionArea);
        return findings.slice(0, maxFindings);
    };
    annotateInPage = (arg) => {
        const id = "__mcp_overlay_boxes__";
        const existing = document.getElementById(id);
        if (existing)
            existing.remove();
        const container = document.createElement("div");
        container.id = id;
        container.style.position = "fixed";
        container.style.left = "0";
        container.style.top = "0";
        container.style.width = "100vw";
        container.style.height = "100vh";
        container.style.pointerEvents = "none";
        container.style.zIndex = "2147483647";
        const colors = ["#ff2d55", "#007aff", "#34c759", "#ff9500", "#af52de"];
        arg.findings.forEach((f, idx) => {
            const color = colors[idx % colors.length];
            const makeBox = (rect, label) => {
                const box = document.createElement("div");
                box.style.position = "fixed";
                box.style.left = `${Math.max(0, rect.x)}px`;
                box.style.top = `${Math.max(0, rect.y)}px`;
                box.style.width = `${Math.max(0, rect.width)}px`;
                box.style.height = `${Math.max(0, rect.height)}px`;
                box.style.outline = `2px solid ${color}`;
                box.style.boxShadow = `0 0 0 2px rgba(0,0,0,0.15)`;
                const tag = document.createElement("div");
                tag.textContent = label;
                tag.style.position = "absolute";
                tag.style.left = "0";
                tag.style.top = "0";
                tag.style.transform = "translateY(-100%)";
                tag.style.background = color;
                tag.style.color = "white";
                tag.style.font = "12px/1.2 system-ui, -apple-system, Segoe UI, Roboto, sans-serif";
                tag.style.padding = "2px 6px";
                tag.style.borderRadius = "4px";
                box.appendChild(tag);
                return box;
            };
            container.appendChild(makeBox(f.a.rect, `A (${idx + 1})`));
            container.appendChild(makeBox(f.b.rect, `B (${idx + 1})`));
        });
        document.documentElement.appendChild(container);
    };
    clearAnnotationsInPage = () => {
        const existing = document.getElementById("__mcp_overlay_boxes__");
        if (existing)
            existing.remove();
    };
}
