"use client";

import {
    createStore,
    type IStoreProps
}                              from "@pico/store";
import {cleanOf}               from "@pico/utils";
import {type IWithTranslation} from "../utils/IWithTranslation";

export namespace WithTranslationStore {
    export type Props = IStoreProps<IWithTranslation & {
        withTranslation(withTranslation?: IWithTranslation): IWithTranslation;
    }>;
}

export const WithTranslationStore = createStore<WithTranslationStore.Props>({
    name:  "WithTranslationStore",
    state: () => (_, get) => ({
        namespace: undefined,
        label:     undefined,
        withLabel: undefined,
        values:    {},
        withTranslation(
            {
                values = {},
                ...withTranslation
            } = {}) {
            const state = get();
            return {
                namespace: state.namespace,
                label:     state.label,
                withLabel: state.withLabel,
                /**
                 * If we've some values, merge them with "defaults", so we can change only some
                 * values while preserving the others.
                 */
                values: {
                    ...state.values,
                    ...values,
                },
                /**
                 * Override rest of default values, if provided
                 */
                ...cleanOf(withTranslation || {}),
            };
        }
    }),
});
