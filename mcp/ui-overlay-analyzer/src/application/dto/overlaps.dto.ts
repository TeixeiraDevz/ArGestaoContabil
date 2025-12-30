import { z } from "zod";

export const FindOverlapsInputSchema = z.object({
  minAreaPx: z.number().int().min(0).default(400),
  maxElements: z.number().int().min(50).max(3000).default(900),
  maxFindings: z.number().int().min(1).max(200).default(40),
  annotateScreenshot: z.boolean().default(false),
  annotateTop: z.number().int().min(1).max(25).default(10)
});

export type FindOverlapsInputDto = z.infer<typeof FindOverlapsInputSchema>;


