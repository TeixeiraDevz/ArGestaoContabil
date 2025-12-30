import { z } from "zod";
export const BrowserStartInputSchema = z.object({
    headless: z.boolean().default(false),
    slowMoMs: z.number().int().min(0).max(2000).optional(),
    viewport: z
        .object({ width: z.number().int().min(320).max(3840), height: z.number().int().min(320).max(2160) })
        .optional(),
    eventBufferSize: z.number().int().min(100).max(20000).default(4000)
});
export const PageOpenInputSchema = z.object({
    url: z.string().min(1)
});
export const ScreenshotInputSchema = z.object({
    fullPage: z.boolean().default(true)
});
export const MonitorEventsInputSchema = z.object({
    sinceSeq: z.number().int().min(0).optional(),
    limit: z.number().int().min(1).max(5000).default(500)
});
