import {z} from "zod";

export const WithLocaleSchema = z.object({
	locale: z.string(),
});
export type WithLocaleSchema = typeof WithLocaleSchema;
export namespace WithLocaleSchema {
	export type Type = z.infer<WithLocaleSchema>;
}
