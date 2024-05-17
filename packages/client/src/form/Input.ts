import {
    type cn,
    ValuesSchema
}                from "@use-pico2/common";
import type {FC} from "react";
import type {
    FieldPath,
    UseFormReturn
}                from "react-hook-form";
import {z}       from "zod";

export namespace Input {
    /**
     * Extracts the keys of a value schema used to index input keys.
     */
    export type Keys<TValuesSchema extends ValuesSchema> = FieldPath<z.infer<TValuesSchema>>;

    /**
     * Props for an input component (in user-land).
     */
    export interface Props<
        TValuesSchema extends ValuesSchema = ValuesSchema,
    > extends cn.WithClass {
        name: Keys<TValuesSchema>;
        form: UseFormReturn<
            z.infer<TValuesSchema>
        >;
        schema: TValuesSchema;
    }

    /**
     * Component props of an input renderer (in user-land).
     */
    export type Component<
        TValuesSchema extends ValuesSchema,
    > = FC<{
        name: Input.Keys<TValuesSchema>;
    }>

    /**
     * Inputs type definition
     */
    export type Inputs<
        TValuesSchema extends ValuesSchema,
    > = Partial<
        Record<
            Keys<TValuesSchema>,
            FC<Props<TValuesSchema>>
        >
    >;

    /**
     * Input factory type definition
     */
    export type Factory<
        TValuesSchema extends ValuesSchema,
    > =
        Inputs<TValuesSchema>
        | ((props: FactoryProps<TValuesSchema>) => Inputs<TValuesSchema>)

    export interface FactoryProps<
        TValuesSchema extends ValuesSchema,
    > {
        form: UseFormReturn<
            z.infer<TValuesSchema>
        >;
    }
}
