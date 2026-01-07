import { z } from "zod";

export const BrowserStartInputSchema = z.object({
  headless: z.boolean().default(false),
  slowMoMs: z.number().int().min(0).max(2000).optional(),
  viewport: z
    .object({ width: z.number().int().min(320).max(3840), height: z.number().int().min(320).max(2160) })
    .optional(),
  eventBufferSize: z.number().int().min(100).max(20000).default(4000)
});

export type BrowserStartInputDto = z.infer<typeof BrowserStartInputSchema>;

export const PageOpenInputSchema = z.object({
  url: z.string().min(1)
});

export type PageOpenInputDto = z.infer<typeof PageOpenInputSchema>;

export const ScreenshotInputSchema = z.object({
  fullPage: z.boolean().default(true)
});

export type ScreenshotInputDto = z.infer<typeof ScreenshotInputSchema>;

export const MonitorEventsInputSchema = z.object({
  sinceSeq: z.number().int().min(0).optional(),
  limit: z.number().int().min(1).max(5000).default(500)
});

export type MonitorEventsInputDto = z.infer<typeof MonitorEventsInputSchema>;


