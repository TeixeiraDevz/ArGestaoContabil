import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { CallToolRequestSchema, ListToolsRequestSchema } from "@modelcontextprotocol/sdk/types.js";
import { z } from "zod";
import { BrowserStartInputSchema, MonitorEventsInputSchema, PageOpenInputSchema, ScreenshotInputSchema } from "./application/dto/browser.dto.js";
import { FindOverlapsInputSchema } from "./application/dto/overlaps.dto.js";
import { BootstrapInputSchema } from "./application/dto/bootstrap.dto.js";
import { BrowserService } from "./application/services/browserService.js";
import { OverlayAnalyzerService } from "./application/services/overlayAnalyzerService.js";
const server = new Server({ name: "ar-ui-overlay-analyzer", version: "0.1.0" }, { capabilities: { tools: {} } });
const browser = new BrowserService();
const okText = (text) => ({ content: [{ type: "text", text }] });
const okJson = (obj) => okText(JSON.stringify(obj, null, 2));
const errText = (text) => ({ isError: true, content: [{ type: "text", text }] });
const getOverlayService = () => new OverlayAnalyzerService(browser.getSessionForInternalUse());
server.setRequestHandler(ListToolsRequestSchema, async () => {
    return {
        tools: [
            {
                name: "ar_ui_browser_start",
                description: "Start a Playwright browser session (Chromium).",
                inputSchema: BrowserStartInputSchema
            },
            {
                name: "ar_ui_browser_stop",
                description: "Stop the Playwright browser session.",
                inputSchema: z.object({})
            },
            {
                name: "ar_ui_page_open",
                description: "Open a URL in the current page (waits for domcontentloaded).",
                inputSchema: PageOpenInputSchema
            },
            {
                name: "ar_ui_page_refresh",
                description: "Refresh (F5) the current page (waits for domcontentloaded).",
                inputSchema: z.object({})
            },
            {
                name: "ar_ui_monitor_start",
                description: "Start capturing console logs, page errors and network events into a buffer.",
                inputSchema: z.object({})
            },
            {
                name: "ar_ui_monitor_events",
                description: "Get buffered events (console/network/errors).",
                inputSchema: MonitorEventsInputSchema
            },
            {
                name: "ar_ui_monitor_clear",
                description: "Clear buffered events.",
                inputSchema: z.object({})
            },
            {
                name: "ar_ui_page_screenshot",
                description: "Take a PNG screenshot and return it as base64.",
                inputSchema: ScreenshotInputSchema
            },
            {
                name: "ar_ui_overlaps_find",
                description: "Detect element overlaps using getBoundingClientRect intersection area. Optionally returns an annotated screenshot.",
                inputSchema: FindOverlapsInputSchema
            },
            {
                name: "ar_ui_bootstrap",
                description: "One-shot: start browser + monitor, open URL, refresh (F5), wait, then return events + overlaps (+ optional annotated screenshot).",
                inputSchema: BootstrapInputSchema
            }
        ]
    };
});
server.setRequestHandler(CallToolRequestSchema, async (req) => {
    const name = req.params.name;
    const args = (req.params.arguments ?? {});
    try {
        if (name === "ar_ui_browser_start") {
            const input = BrowserStartInputSchema.parse(args);
            await browser.start(input);
            return okJson({ status: browser.getStatus() });
        }
        if (name === "ar_ui_browser_stop") {
            await browser.stop();
            return okJson({ status: browser.getStatus() });
        }
        if (name === "ar_ui_page_open") {
            const input = PageOpenInputSchema.parse(args);
            await browser.open(input);
            return okText(`Opened: ${input.url}`);
        }
        if (name === "ar_ui_page_refresh") {
            await browser.refresh();
            return okText("Refreshed (F5).");
        }
        if (name === "ar_ui_monitor_start") {
            browser.startMonitoring();
            return okJson({ status: browser.getStatus() });
        }
        if (name === "ar_ui_monitor_events") {
            const input = MonitorEventsInputSchema.parse(args);
            const events = browser.getEvents(input);
            const lastSeq = events.length ? events[events.length - 1].seq : input.sinceSeq ?? 0;
            return okJson({ lastSeq, events });
        }
        if (name === "ar_ui_monitor_clear") {
            browser.clearEvents();
            return okText("Events cleared.");
        }
        if (name === "ar_ui_page_screenshot") {
            const input = ScreenshotInputSchema.parse(args);
            const b64 = await browser.screenshotBase64(input);
            return {
                content: [
                    { type: "text", text: "Screenshot captured." },
                    { type: "image", mimeType: "image/png", data: b64 }
                ]
            };
        }
        if (name === "ar_ui_overlaps_find") {
            const input = FindOverlapsInputSchema.parse(args);
            const overlay = getOverlayService();
            const { findings } = await overlay.findOverlaps(input);
            if (!input.annotateScreenshot) {
                return okJson({ findingsCount: findings.length, findings });
            }
            await overlay.clearAnnotations();
            await overlay.annotateOverlaps(findings, input.annotateTop);
            const b64 = await browser.screenshotBase64({ fullPage: true });
            await overlay.clearAnnotations();
            const top = findings.slice(0, input.annotateTop);
            return {
                content: [
                    {
                        type: "text",
                        text: JSON.stringify({
                            findingsCount: findings.length,
                            annotatedTop: top.length,
                            findings
                        }, null, 2)
                    },
                    { type: "image", mimeType: "image/png", data: b64 }
                ]
            };
        }
        if (name === "ar_ui_bootstrap") {
            const input = BootstrapInputSchema.parse(args);
            await browser.start({
                headless: input.headless,
                slowMoMs: input.slowMoMs,
                eventBufferSize: 4000
            });
            browser.startMonitoring();
            await browser.open({ url: input.url });
            // Reproduce the common user scenario: being at the footer when pressing F5.
            if (input.preScrollToBottom) {
                await browser.scrollToBottom();
                await browser.waitForTimeout(150);
            }
            await browser.refresh();
            await browser.waitForTimeout(input.waitAfterRefreshMs);
            const events = browser.getEvents({ sinceSeq: 0, limit: 500 });
            const overlay = getOverlayService();
            const { findings } = await overlay.findOverlaps({
                minAreaPx: input.minAreaPx,
                maxElements: 900,
                maxFindings: 40,
                annotateScreenshot: input.annotateScreenshot,
                annotateTop: input.annotateTop
            });
            if (!input.annotateScreenshot) {
                return okJson({
                    url: input.url,
                    eventsCount: events.length,
                    events,
                    findingsCount: findings.length,
                    findings
                });
            }
            await overlay.clearAnnotations();
            await overlay.annotateOverlaps(findings, input.annotateTop);
            const b64 = await browser.screenshotBase64({ fullPage: true });
            await overlay.clearAnnotations();
            const top = findings.slice(0, input.annotateTop);
            return {
                content: [
                    {
                        type: "text",
                        text: JSON.stringify({
                            url: input.url,
                            eventsCount: events.length,
                            lastEventSeq: events.length ? events[events.length - 1].seq : 0,
                            findingsCount: findings.length,
                            annotatedTop: top.length,
                            events,
                            findings
                        }, null, 2)
                    },
                    { type: "image", mimeType: "image/png", data: b64 }
                ]
            };
        }
        return errText(`Unknown tool: ${name}`);
    }
    catch (e) {
        const msg = e instanceof Error ? e.message : String(e);
        return errText(msg);
    }
});
async function main() {
    const transport = new StdioServerTransport();
    await server.connect(transport);
    // Keep the process alive for Cursor; some environments may provide closed stdin by default.
    await new Promise(() => { });
}
main().catch((e) => {
    // one last resort, keep stderr meaningful for Cursor
    // eslint-disable-next-line no-console
    console.error(e);
    process.exit(1);
});
