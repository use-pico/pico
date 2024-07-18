import { cssOf, isOptional, type ValuesSchema } from "@use-pico/common";
import type { ReactNode } from "react";
import { useController } from "react-hook-form";
import { RequiredIcon } from "../../icon/RequiredIcon";
import { Icon } from "../../ui/Icon";
import { type Input } from "../Input";
import { errorOf } from "../errorOf";

export namespace TextInput {
	export interface Props<TValuesSchema extends ValuesSchema>
		extends Input.Props<TValuesSchema> {
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

export const TextInput = <TValuesSchema extends ValuesSchema>({
	name,
	schema,
	text,
	css,
}: TextInput.Props<TValuesSchema>) => {
	const {
		field: { value, ...field },
		formState: { errors, isLoading },
	} = useController({ name });

	return (
		<div className={cssOf("w-full", css?.root)}>
			{text?.label && (
				<div className={cssOf("flex justify-between items-center")}>
					<label
						htmlFor={`${name}-text-input`}
						className={cssOf(
							"block text-sm font-medium text-slate-900",
							css?.label,
						)}
					>
						<span>{text?.label}</span>
						<span className={cssOf("text-red-600 text-sm pl-2", css?.error)}>
							{errorOf(errors, name)}
						</span>
					</label>
					{!isOptional(schema, name) && (
						<Icon
							icon={RequiredIcon}
							size={"xs"}
							css={["text-red-600 opacity-50"]}
						/>
					)}
				</div>
			)}
			<input
				id={`${name}-text-input`}
				required={!isOptional(schema, name)}
				type={"text"}
				disabled={isLoading}
				className={cssOf(
					"bg-slate-50 text-slate-900 text-sm border border-slate-300 rounded focus:border-sky-400 focus:outline-none block w-full p-2.5",
					isLoading && "cursor-not-allowed bg-blue-50",
					css?.input,
				)}
				placeholder={isLoading ? undefined : text?.placeholder}
				value={value ?? ""}
				{...field}
			/>
		</div>
	);
};
