import {type IfExtends}       from "@use-pico/types";
import {type IStorePropsType} from "./IStorePropsType";

/**
 * Actual store with separated mandatory fields defining store values (and actions) needed within creation and (required/optional) values provided
 * when store provider component is created.
 */
export interface IStoreProps<TStoreProps extends IStorePropsType = IStorePropsType, TStoreValueProps extends IStorePropsType | unknown = unknown> {
    Props: TStoreProps;
    Props$: Partial<TStoreProps>;
    State: TStoreValueProps;
    StoreProps: IfExtends<TStoreProps, TStoreValueProps>;
}
