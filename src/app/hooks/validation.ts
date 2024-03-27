import { z } from "zod";

export const youtubeFormSchema = z.object({
    url: z.string().url(),
});

export const configFormSchema = z.object({
    bitrate: z.string(),
});