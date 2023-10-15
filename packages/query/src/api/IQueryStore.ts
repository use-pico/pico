import {type IStoreSchema}     from "@use-pico/store";
import {type FilterSchema}     from "../schema/FilterSchema";
import {type OrderBySchema}    from "../schema/OrderBySchema";
import {type IQueryStoreProps} from "./IQueryStoreProps";

export type IQueryStore<
    TFilterSchema extends FilterSchema,
    TOrderBySchema extends OrderBySchema,
> = IStoreSchema<
    IQueryStoreProps<TFilterSchema, TOrderBySchema>
>["Store"];
