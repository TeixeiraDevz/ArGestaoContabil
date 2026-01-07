import type { MonitorEvent } from "../../domain/models.js";
import { PlaywrightSession, type PlaywrightSessionConfig } from "../../infra/playwright/playwrightSession.js";
import type {
  BrowserStartInputDto,
  MonitorEventsInputDto,
  PageOpenInputDto,
  ScreenshotInputDto
} from "../dto/browser.dto.js";

export interface BrowserStatusDto {
  started: boolean;
  monitoring: boolean;
}

export class BrowserService {
  private session: PlaywrightSession | null = null;
  private monitoring = false;

  getStatus(): BrowserStatusDto {
    return { started: this.session?.isStarted() ?? false, monitoring: this.monitoring };
  }

  async start(input: BrowserStartInputDto): Promise<void> {
    if (this.session?.isStarted()) return;

    const cfg: PlaywrightSessionConfig = {
      headless: input.headless,
      slowMoMs: input.slowMoMs,
      viewport: input.viewport,
      eventBufferSize: input.eventBufferSize
    };

    this.session = new PlaywrightSession(cfg);
    await this.session.start();
  }

  async stop(): Promise<void> {
    this.monitoring = false;
    if (!this.session) return;
    await this.session.stop();
    this.session = null;
  }

  async open(input: PageOpenInputDto): Promise<void> {
    this.requireSession();
    await this.session!.goto(input.url);
  }

  async refresh(): Promise<void> {
    this.requireSession();
    await this.session!.refresh();
  }

  async scrollToBottom(): Promise<void> {
    this.requireSession();
    await this.session!.scrollToBottom();
  }

  startMonitoring(): void {
    this.requireSession();
    this.session!.startMonitoring();
    this.monitoring = true;
  }

  clearEvents(): void {
    this.requireSession();
    this.session!.clearEvents();
  }

  getEvents(input: MonitorEventsInputDto): MonitorEvent[] {
    this.requireSession();
    const all = this.session!.getEvents();
    const sinceSeq = input.sinceSeq ?? 0;
    const filtered = all.filter((e) => e.seq > sinceSeq);
    return filtered.slice(Math.max(0, filtered.length - input.limit));
  }

  async screenshotBase64(input: ScreenshotInputDto): Promise<string> {
    this.requireSession();
    return await this.session!.screenshotBase64(input.fullPage);
  }

  async html(): Promise<string> {
    this.requireSession();
    return await this.session!.contentHtml();
  }

  async waitForTimeout(ms: number): Promise<void> {
    this.requireSession();
    await this.session!.waitForTimeout(ms);
  }

  getSessionForInternalUse(): PlaywrightSession {
    this.requireSession();
    return this.session!;
  }

  private requireSession(): void {
    if (!this.session || !this.session.isStarted()) {
      throw new Error("Browser not started. Call browser_start first.");
    }
  }
}


