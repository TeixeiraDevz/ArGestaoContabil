import { PlaywrightSession } from "../../infra/playwright/playwrightSession.js";
export class BrowserService {
    session = null;
    monitoring = false;
    getStatus() {
        return { started: this.session?.isStarted() ?? false, monitoring: this.monitoring };
    }
    async start(input) {
        if (this.session?.isStarted())
            return;
        const cfg = {
            headless: input.headless,
            slowMoMs: input.slowMoMs,
            viewport: input.viewport,
            eventBufferSize: input.eventBufferSize
        };
        this.session = new PlaywrightSession(cfg);
        await this.session.start();
    }
    async stop() {
        this.monitoring = false;
        if (!this.session)
            return;
        await this.session.stop();
        this.session = null;
    }
    async open(input) {
        this.requireSession();
        await this.session.goto(input.url);
    }
    async refresh() {
        this.requireSession();
        await this.session.refresh();
    }
    async scrollToBottom() {
        this.requireSession();
        await this.session.scrollToBottom();
    }
    startMonitoring() {
        this.requireSession();
        this.session.startMonitoring();
        this.monitoring = true;
    }
    clearEvents() {
        this.requireSession();
        this.session.clearEvents();
    }
    getEvents(input) {
        this.requireSession();
        const all = this.session.getEvents();
        const sinceSeq = input.sinceSeq ?? 0;
        const filtered = all.filter((e) => e.seq > sinceSeq);
        return filtered.slice(Math.max(0, filtered.length - input.limit));
    }
    async screenshotBase64(input) {
        this.requireSession();
        return await this.session.screenshotBase64(input.fullPage);
    }
    async html() {
        this.requireSession();
        return await this.session.contentHtml();
    }
    async waitForTimeout(ms) {
        this.requireSession();
        await this.session.waitForTimeout(ms);
    }
    getSessionForInternalUse() {
        this.requireSession();
        return this.session;
    }
    requireSession() {
        if (!this.session || !this.session.isStarted()) {
            throw new Error("Browser not started. Call browser_start first.");
        }
    }
}
