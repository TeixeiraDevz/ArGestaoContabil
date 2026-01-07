import fs from "node:fs/promises";
import path from "node:path";
import process from "node:process";
import { BootstrapInputSchema } from "./application/dto/bootstrap.dto.js";
import { BrowserService } from "./application/services/browserService.js";
import { OverlayAnalyzerService } from "./application/services/overlayAnalyzerService.js";

type ArgvMap = Record<string, string | boolean>;

function parseArgv(argv: string[]): ArgvMap {
  const out: ArgvMap = {};
  for (let i = 0; i < argv.length; i += 1) {
    const token = argv[i] ?? "";
    if (!token.startsWith("--")) continue;
    const key = token.slice(2);
    const next = argv[i + 1];
    if (!next || next.startsWith("--")) {
      out[key] = true;
      continue;
    }
    out[key] = next;
    i += 1;
  }
  return out;
}

function toBool(v: string | boolean | undefined): boolean | undefined {
  if (v === undefined) return undefined;
  if (typeof v === "boolean") return v;
  if (v.toLowerCase() === "true") return true;
  if (v.toLowerCase() === "false") return false;
  return undefined;
}

function toInt(v: string | boolean | undefined): number | undefined {
  if (v === undefined || typeof v === "boolean") return undefined;
  const n = Number.parseInt(v, 10);
  return Number.isFinite(n) ? n : undefined;
}

async function ensureDir(dir: string): Promise<void> {
  await fs.mkdir(dir, { recursive: true });
}

async function main(): Promise<void> {
  const [, , cmd, ...rest] = process.argv;
  if (!cmd || cmd === "help" || cmd === "--help" || cmd === "-h") {
    // eslint-disable-next-line no-console
    console.log(
      [
        "Usage:",
        "  node dist/cli.js bootstrap --url http://localhost:4200/ --outDir ./out",
        "",
        "Options (bootstrap):",
        "  --url <string>",
        "  --headless <true|false>",
        "  --slowMoMs <int>",
        "  --waitAfterRefreshMs <int>",
        "  --minAreaPx <int>",
        "  --annotateScreenshot <true|false>",
        "  --annotateTop <int>",
        "  --outDir <path> (default: ./out)",
        "  --name <string> (default: bootstrap)",
        ""
      ].join("\n")
    );
    return;
  }

  if (cmd !== "bootstrap") {
    throw new Error(`Unknown command: ${cmd}`);
  }

  // Support both:
  //  - flags:   bootstrap --url ... --waitAfterRefreshMs 1500 --outDir ./out --name run1
  //  - positional (Windows/npm-friendly): bootstrap <url> <waitAfterRefreshMs> <outDir> <name>
  const args = parseArgv(rest);
  const positional = rest.filter((t) => !t.startsWith("--"));

  const urlPos = positional[0];
  const waitPos = positional[1];
  const outDirPos = positional[2];
  const namePos = positional[3];
  const preScrollBottomPos = positional[4];

  const outDir = (args.outDir && typeof args.outDir === "string"
    ? args.outDir
    : (outDirPos ?? "./out")) as string;
  const name = (args.name && typeof args.name === "string"
    ? args.name
    : (namePos ?? "bootstrap")) as string;
  await ensureDir(outDir);

  const input = BootstrapInputSchema.parse({
    url: (args.url && typeof args.url === "string" ? args.url : urlPos),
    headless: toBool(args.headless),
    slowMoMs: toInt(args.slowMoMs),
    waitAfterRefreshMs: (toInt(args.waitAfterRefreshMs) ?? toInt(waitPos)),
    preScrollToBottom: (toBool(args.preScrollToBottom) ?? toBool(preScrollBottomPos)),
    minAreaPx: toInt(args.minAreaPx),
    annotateScreenshot: toBool(args.annotateScreenshot),
    annotateTop: toInt(args.annotateTop)
  });

  const browser = new BrowserService();

  try {
    await browser.start({
      headless: input.headless,
      slowMoMs: input.slowMoMs,
      eventBufferSize: 4000
    });
    browser.startMonitoring();
    await browser.open({ url: input.url });
    if (input.preScrollToBottom) {
      await browser.scrollToBottom();
      await browser.waitForTimeout(150);
    }
    await browser.refresh();
    await browser.waitForTimeout(input.waitAfterRefreshMs);

    const events = browser.getEvents({ sinceSeq: 0, limit: 500 });

    const overlay = new OverlayAnalyzerService(browser.getSessionForInternalUse());
    const { findings } = await overlay.findOverlaps({
      minAreaPx: input.minAreaPx,
      maxElements: 900,
      maxFindings: 40,
      annotateScreenshot: input.annotateScreenshot,
      annotateTop: input.annotateTop
    });

    let screenshotPngPath: string | null = null;
    if (input.annotateScreenshot) {
      await overlay.clearAnnotations();
      await overlay.annotateOverlaps(findings, input.annotateTop);
      const b64 = await browser.screenshotBase64({ fullPage: true });
      await overlay.clearAnnotations();

      const png = Buffer.from(b64, "base64");
      screenshotPngPath = path.join(outDir, `${name}.png`);
      await fs.writeFile(screenshotPngPath, png);
    }

    const result = {
      url: input.url,
      eventsCount: events.length,
      lastEventSeq: events.length ? events[events.length - 1]!.seq : 0,
      findingsCount: findings.length,
      annotatedScreenshot: screenshotPngPath ? path.resolve(screenshotPngPath) : null,
      events,
      findings
    };

    const jsonPath = path.join(outDir, `${name}.json`);
    await fs.writeFile(jsonPath, JSON.stringify(result, null, 2), "utf8");

    // eslint-disable-next-line no-console
    console.log(`OK. Wrote: ${path.resolve(jsonPath)}${screenshotPngPath ? ` and ${path.resolve(screenshotPngPath)}` : ""}`);
  } finally {
    await browser.stop();
  }
}

main();


