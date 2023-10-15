import {type IStoreSchema}    from "@use-pico/store/src/api/IStoreSchema";
import {type z}               from "@use-pico/utils";
import {type IListStoreProps} from "./IListStoreProps";

export type IListStore<TSchema extends z.ZodSchema> = IStoreSchema.Of<IListStoreProps<TSchema>>["Store"];
