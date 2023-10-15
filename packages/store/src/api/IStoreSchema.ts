import {type MergeIf}         from "@pico/types";
import {
    type Consumer,
    type Context,
    type FC,
    type PropsWithChildren
}                             from "react";
import {
    type StateCreator,
    type StoreApi
}                             from "zustand/esm";
import {type IStoreProps}     from "./IStoreProps";
import {type IStorePropsType} from "./IStorePropsType";

/**
 * Store schema contains all the types a Store uses.
 *
 * This interface should be used as a type only.
 */
export interface IStoreSchema<TStoreProps extends IStoreProps> {
    /**
     * Store props (store shape).
     */
    Props: TStoreProps;
    /**
     * Props used in store factory (to make a store).
     */
    FactoryProps: {
        state: IStoreSchema<TStoreProps>["StateCreator"],
        name: string,
        hint?: string
    };

    /**
     * Method used to create a store.
     */
    Create(props: IStoreSchema<TStoreProps>["StateCreatorProps"]): StoreApi<TStoreProps["StoreProps"]>;

    StateCreator(props: IStoreSchema<TStoreProps>["StateCreatorProps"]): StateCreator<TStoreProps["StoreProps"]>;

    StateCreatorProps: PropsWithChildren<MergeIf<
        {
            defaults?: Partial<TStoreProps["Props$"]>;
        },
        TStoreProps["State"],
        IStorePropsType,
        {
            state: TStoreProps["State"];
        },
        {
            state?: never;
        }
    >>;
    /**
     * User-land Store shape.
     */
    Store: {
        name: string;
        Provider: IStoreSchema<TStoreProps>["Provider"];
        Consumer: IStoreSchema<TStoreProps>["Consumer"];
        use: IStoreSchema<TStoreProps>["UseState"];
        use$: IStoreSchema<TStoreProps>["UseState$"];
        useStore: () => StoreApi<TStoreProps["StoreProps"]>;
        useStore$: () => StoreApi<TStoreProps["StoreProps"]> | null;
    };

    StoreContext: {
        name: string;
        state: TStoreProps["StoreProps"];
        store: StoreApi<TStoreProps["StoreProps"]>;
    };

    Context: Context<IStoreSchema<TStoreProps>["StoreContext"] | null>;
    Provider: FC<IStoreSchema<TStoreProps>["ProviderProps"]>;
    Consumer: Consumer<IStoreSchema<TStoreProps>["StoreContext"] | null>;
    ProviderProps: IStoreSchema<TStoreProps>["StateCreatorProps"];

    UseState$: {
        /**
         * Use store with a selector
         */<U>(selector: (state: TStoreProps["StoreProps"]) => U): U | null;

        /**
         * Use the whole store without a selector
         */
        (): TStoreProps["StoreProps"] | null;
    };

    UseState: {
        <U>(selector: (state: TStoreProps["StoreProps"]) => U): U;

        (): TStoreProps["StoreProps"];
    };
}

export namespace IStoreSchema {
    export type Of<TStoreProps extends IStoreProps> = IStoreSchema<TStoreProps>;
}
