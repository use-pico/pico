import { Css as CoolCss, ValuesSchema, type InferOf } from "@use-pico/common";
import type { FC } from "react";
import type { FieldPath, UseFormReturn } from "react-hook-form";
import { z } from "zod";

export namespace Input {
	/**
	 * Extracts the keys of a value schema used to index input keys.
	 */
	export type Keys<TValuesSchema extends ValuesSchema> = FieldPath<
		z.infer<TValuesSchema>
	>;

	export type KeysOf<TUseForm extends UseFormReturn<any>> =
		TUseForm extends UseFormReturn<infer TValues> ? FieldPath<TValues> : never;

	export type InputCss = CoolCss<"root" | "label" | "error" | "input">;

	/**
	 * Props for an input component (in user-land).
	 */
	export interface Props<TValuesSchema extends ValuesSchema = ValuesSchema>
		extends InputCss {
		name: Keys<TValuesSchema>;
		schema: TValuesSchema;
		disabled?: boolean;
	}

	/**
	 * Inputs type definition
	 */
	export type Inputs<TValuesSchema extends ValuesSchema> = Partial<
		Record<Keys<TValuesSchema>, FC<Props<TValuesSchema>>>
	>;

	export interface FactoryProps<TValuesSchema extends ValuesSchema> {
		form: UseFormReturn<z.infer<TValuesSchema>>;

		useWatch<TKey extends Keys<TValuesSchema>>(
			key: TKey,
		): InferOf<TKey, TValuesSchema>;

		useSetValue(): <TKey extends Input.Keys<TValuesSchema>>(
			key: TKey,
			value: InferOf<TKey, TValuesSchema>,
		) => void;
	}

	/**
	 * Input factory type definition
	 */
	export type Factory<TValuesSchema extends ValuesSchema> =
		| Inputs<TValuesSchema>
		| ((props: FactoryProps<TValuesSchema>) => Inputs<TValuesSchema>);
}
