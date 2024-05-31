import type {z} from "zod";
import type {FilterSchema} from "./FilterSchema";
import type {OrderBySchema} from "./OrderBySchema";
import type {QuerySchema} from "./QuerySchema";

export type OrderByOf<TQuerySchema extends QuerySchema<FilterSchema, OrderBySchema>> = (keyof NonNullable<z.infer<TQuerySchema>["orderBy"]>);
