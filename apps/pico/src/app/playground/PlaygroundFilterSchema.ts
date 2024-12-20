import { z } from "zod";

export const PlaygroundFilterSchema = z.object({
	fulltext: z.string().nullish(),
});
