"use client";

import {createQueryStore}      from "@use-pico/query";
import {TranslationDullSchema} from "../schema/TranslationDullSchema";

export const TranslationQueryStore = createQueryStore({
    name:   "TranslationQueryStore",
    schema: TranslationDullSchema.query
});
