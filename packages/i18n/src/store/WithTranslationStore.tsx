"use client";

import {
    createStore,
    type IStore
}                              from "@use-pico/store";
import {cleanOf}               from "@use-pico/utils";
import {type IWithTranslation} from "../utils/IWithTranslation";

export namespace WithTranslationStore {
    export type Props = IStore<{
        withTranslation(withTranslation?: IWithTranslation): IWithTranslation;
    }, IWithTranslation>;
}

export const WithTranslationStore = createStore<WithTranslationStore.Props>(values => (_, get) => ({
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
    },
    ...values,
}));
