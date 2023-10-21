import {type PicoSchema}      from "@use-pico/schema";
import {type IStoreSchema}    from "@use-pico/store/src/api/IStoreSchema";
import {type IListStoreProps} from "./IListStoreProps";

export type IListStore<TSchema extends PicoSchema> = IStoreSchema.Of<IListStoreProps<TSchema>>["Store"];
