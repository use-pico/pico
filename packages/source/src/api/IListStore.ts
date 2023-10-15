import {type IStoreSchema}    from "@pico/store/src/api/IStoreSchema";
import {type z}               from "@pico/utils";
import {type IListStoreProps} from "./IListStoreProps";

export type IListStore<TSchema extends z.ZodSchema> = IStoreSchema.Of<IListStoreProps<TSchema>>["Store"];
