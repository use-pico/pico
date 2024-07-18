import { cssOf, isOptional, type ValuesSchema } from "@use-pico/common";
import type { ReactNode } from "react";
import { useController } from "react-hook-form";
import { RequiredIcon } from "../../icon/RequiredIcon";
import { Icon } from "../../ui/Icon";
import { type Input } from "../Input";
import { errorOf } from "../errorOf";

export namespace PasswordInput {
	export interface Props<TValuesSchema extends ValuesSchema>
		extends Input.Props<TValuesSchema> {
		text?: {
			label?: ReactNode;
			placeholder?: string;
		};
	}
}

export const PasswordInput = <TValuesSchema extends ValuesSchema>({
	name,
	schema,
	text,
	css,
}: PasswordInput.Props<TValuesSchema>) => {
	const {
		field: { value, ...field },
		formState: { errors, isLoading },
	} = useController({ name });

	return (
		<div className={cssOf("w-full", css?.root)}>
			{text?.label && (
				<div className={cssOf("flex justify-between items-center")}>
					<label
						htmlFor={`${name}-password-input`}
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
				id={`${name}-password-input`}
				required={!isOptional(schema, name)}
				type={"password"}
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
