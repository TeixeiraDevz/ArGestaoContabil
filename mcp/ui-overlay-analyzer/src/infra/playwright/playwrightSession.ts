import { chromium, type Browser, type BrowserContext, type Page } from "playwright";
import { RingBuffer } from "../../shared/ringBuffer.js";
import type { MonitorEvent } from "../../domain/models.js";

export interface PlaywrightSessionConfig {
  headless: boolean;
  slowMoMs?: number;
  viewport?: { width: number; height: number };
  eventBufferSize: number;
}

export class PlaywrightSession {
  private browser: Browser | null = null;
  private context: BrowserContext | null = null;
  private page: Page | null = null;
  private readonly events: RingBuffer<MonitorEvent>;
  private monitoring = false;
  private seq = 0;

  constructor(private readonly config: PlaywrightSessionConfig) {
    this.events = new RingBuffer<MonitorEvent>(config.eventBufferSize);
  }

  isStarted(): boolean {
    return this.browser !== null && this.context !== null && this.page !== null;
  }

  getEvents(): MonitorEvent[] {
    return this.events.toArray();
  }

  clearEvents(): void {
    this.events.clear();
  }

  async start(): Promise<void> {
    if (this.isStarted()) return;

    this.browser = await chromium.launch({
      headless: this.config.headless,
      slowMo: this.config.slowMoMs
    });

    this.context = await this.browser.newContext({
      viewport: this.config.viewport
    });

    this.page = await this.context.newPage();
  }

  async stop(): Promise<void> {
    this.monitoring = false;
    const browser = this.browser;
    this.page = null;
    this.context = null;
    this.browser = null;
    if (browser) {
      await browser.close();
    }
  }

  async goto(url: string): Promise<void> {
    const page = this.requirePage();
    await page.goto(url, { waitUntil: "domcontentloaded" });
  }

  async refresh(): Promise<void> {
    const page = this.requirePage();
    await page.reload({ waitUntil: "domcontentloaded" });
  }

  async scrollToBottom(): Promise<void> {
    const page = this.requirePage();
    await page.evaluate(() => {
      const root = document.scrollingElement ?? document.documentElement;
      const y = Math.max(0, root.scrollHeight - window.innerHeight);
      window.scrollTo(0, y);
    });
  }

  async screenshotBase64(fullPage: boolean): Promise<string> {
    const page = this.requirePage();
    const buf = await page.screenshot({ fullPage, type: "png" });
    return buf.toString("base64");
  }

  async contentHtml(): Promise<string> {
    const page = this.requirePage();
    return await page.content();
  }

  async waitForTimeout(ms: number): Promise<void> {
    const page = this.requirePage();
    await page.waitForTimeout(ms);
  }

  startMonitoring(): void {
    if (this.monitoring) return;
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

  async evaluate<TResult>(fn: (arg: any) => TResult | Promise<TResult>, arg: any): Promise<TResult> {
    const page = this.requirePage();
    return await page.evaluate(fn as any, arg);
  }

  private requirePage(): Page {
    if (!this.page) {
      throw new Error("Browser session not started. Call browser_start first.");
    }
    return this.page;
  }

  private nextSeq(): number {
    this.seq += 1;
    return this.seq;
  }
}


