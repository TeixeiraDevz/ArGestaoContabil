import { chromium } from "playwright";
import { RingBuffer } from "../../shared/ringBuffer.js";
export class PlaywrightSession {
    config;
    browser = null;
    context = null;
    page = null;
    events;
    monitoring = false;
    seq = 0;
    constructor(config) {
        this.config = config;
        this.events = new RingBuffer(config.eventBufferSize);
    }
    isStarted() {
        return this.browser !== null && this.context !== null && this.page !== null;
    }
    getEvents() {
        return this.events.toArray();
    }
    clearEvents() {
        this.events.clear();
    }
    async start() {
        if (this.isStarted())
            return;
        this.browser = await chromium.launch({
            headless: this.config.headless,
            slowMo: this.config.slowMoMs
        });
        this.context = await this.browser.newContext({
            viewport: this.config.viewport
        });
        this.page = await this.context.newPage();
    }
    async stop() {
        this.monitoring = false;
        const browser = this.browser;
        this.page = null;
        this.context = null;
        this.browser = null;
        if (browser) {
            await browser.close();
        }
    }
    async goto(url) {
        const page = this.requirePage();
        await page.goto(url, { waitUntil: "domcontentloaded" });
    }
    async refresh() {
        const page = this.requirePage();
        await page.reload({ waitUntil: "domcontentloaded" });
    }
    async scrollToBottom() {
        const page = this.requirePage();
        await page.evaluate(() => {
            const root = document.scrollingElement ?? document.documentElement;
            const y = Math.max(0, root.scrollHeight - window.innerHeight);
            window.scrollTo(0, y);
        });
    }
    async screenshotBase64(fullPage) {
        const page = this.requirePage();
        const buf = await page.screenshot({ fullPage, type: "png" });
        return buf.toString("base64");
    }
    async contentHtml() {
        const page = this.requirePage();
        return await page.content();
    }
    async waitForTimeout(ms) {
        const page = this.requirePage();
        await page.waitForTimeout(ms);
    }
    startMonitoring() {
        if (this.monitoring)
            return;
        const page = this.requirePage();
        this.monitoring = true;
        page.on("console", (msg) => {
            this.events.push({
                seq: this.nextSeq(),
                kind: "console",
                at: new Date().toISOString(),
                message: msg.text(),
                data: { type: msg.type() }
            });
        });
        page.on("pageerror", (err) => {
            this.events.push({
                seq: this.nextSeq(),
                kind: "pageerror",
                at: new Date().toISOString(),
                message: err.message
            });
        });
        page.on("request", (req) => {
            this.events.push({
                seq: this.nextSeq(),
                kind: "request",
                at: new Date().toISOString(),
                message: `${req.method()} ${req.url()}`,
                data: {
                    method: req.method(),
                    url: req.url(),
                    resourceType: req.resourceType()
                }
            });
        });
        page.on("response", async (res) => {
            this.events.push({
                seq: this.nextSeq(),
                kind: "response",
                at: new Date().toISOString(),
                message: `${res.status()} ${res.url()}`,
                data: {
                    status: res.status(),
                    url: res.url(),
                    fromServiceWorker: res.fromServiceWorker()
                }
            });
        });
        page.on("requestfailed", (req) => {
            this.events.push({
                seq: this.nextSeq(),
                kind: "requestfailed",
                at: new Date().toISOString(),
                message: `${req.method()} ${req.url()}`,
                data: {
                    method: req.method(),
                    url: req.url(),
                    failure: req.failure()?.errorText
                }
            });
        });
    }
    async evaluate(fn, arg) {
        const page = this.requirePage();
        return await page.evaluate(fn, arg);
    }
    requirePage() {
        if (!this.page) {
            throw new Error("Browser session not started. Call browser_start first.");
        }
        return this.page;
    }
    nextSeq() {
        this.seq += 1;
        return this.seq;
    }
}
