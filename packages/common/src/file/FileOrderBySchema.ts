import { z } from "zod";
import { OrderSchema } from "../query/OrderSchema";

export const FileOrderBySchema = z
	.object({
		name: OrderSchema,
		path: OrderSchema,
		created: OrderSchema,
		size: OrderSchema,
		mime: OrderSchema,
	})
	.partial();
export type FileOrderBySchema = typeof FileOrderBySchema;
export namespace FileOrderBySchema {
	export type Type = z.infer<FileOrderBySchema>;
}
