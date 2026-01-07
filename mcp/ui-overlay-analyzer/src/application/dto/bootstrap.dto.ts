import { z } from "zod";

export const BootstrapInputSchema = z.object({
  url: z.string().min(1).default("http://localhost:4200/"),
  headless: z.boolean().default(false),
  slowMoMs: z.number().int().min(0).max(2000).optional(),
  waitAfterRefreshMs: z.number().int().min(0).max(20000).default(1500),
  preScrollToBottom: z.boolean().default(false),
  minAreaPx: z.number().int().min(0).default(400),
  annotateScreenshot: z.boolean().default(true),
  annotateTop: z.number().int().min(1).max(25).default(10)
});

export type BootstrapInputDto = z.infer<typeof BootstrapInputSchema>;


