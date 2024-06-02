"use client";

import {
    cn,
    DateTime,
    isOptional,
    type ValuesSchema
}                       from "@use-pico/common";
import {type ReactNode} from "react";
import {useController}  from "react-hook-form";
import {RequiredIcon}   from "../../icon/RequiredIcon";
import {Icon}           from "../../ui/Icon";
import {errorOf}        from "../errorOf";
import type {Input}     from "../Input";

export namespace YearInput {
	export interface Props<TValuesSchema extends ValuesSchema> extends Input.Props<TValuesSchema> {
		/**
		 * Various texts used in this input
		 */
		text?: {
			/**
			 * Label of this input
			 */
			label?: ReactNode;
			/**
			 * Placeholder of this input
			 */
			placeholder?: string;
		};
	}
}

export const YearInput = <
	TValuesSchema extends ValuesSchema
>(
	{
		name,
		schema,
		text,
		theme,
	}: YearInput.Props<TValuesSchema>,
) => {
	const {
        field: {
                   value,
                   ...field
               },
		formState: {errors}
	} = useController({name});
	const date = DateTime.fromISO(value as string);

	return <div
		className={cn(
			"w-full",
			theme?.root,
		)}
	>
		{text?.label && <div
			className={cn(
				"flex justify-between items-center",
			)}
		>
			<label
				htmlFor={`${name}-year-input`}
				className={cn(
					"block text-sm font-medium text-slate-900",
					theme?.label,
				)}
			>
				<span>{text?.label}</span>
				<span
					className={cn(
						"text-red-600 text-sm pl-2",
						theme?.error,
					)}
				>
					{errorOf(errors, name)}
				</span>
			</label>
			{!isOptional(schema, name) && <Icon
				icon={RequiredIcon}
				size={"xs"}
				cx={[
					"text-red-600 opacity-50",
				]}
			/>}
		</div>}
		<input
			id={`${name}-year-input`}
			required={!isOptional(schema, name)}
			type={"text"}
			className={cn(
				"bg-slate-50 text-slate-900 text-sm border border-slate-300 rounded focus:border-sky-400 focus:outline-none block w-full p-2.5",
				theme?.input,
			)}
			placeholder={text?.placeholder}
			value={date.isValid ? date.year : ""}
			{...field}
		/>
	</div>;
};
