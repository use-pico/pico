import {
	cssOf,
	DateTime,
	isNumeric,
	isOptional,
	type ValuesSchema,
} from "@use-pico/common";
import { useState, type ReactNode } from "react";
import { useController } from "react-hook-form";
import { RequiredIcon } from "../../icon/RequiredIcon";
import { Icon } from "../../ui/Icon";
import { errorOf } from "../errorOf";
import type { Input } from "../Input";

export namespace YearInput {
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

export const YearInput = <TValuesSchema extends ValuesSchema>({
	name,
	schema,
	text,
	css,
}: YearInput.Props<TValuesSchema>) => {
	const {
		field: { value, onChange },
		formState: { errors, isLoading },
	} = useController({ name });
	const date = DateTime.fromISO(value as string);
	const [valid, setValid] = useState<boolean | undefined>(true);
	const [year, setYear] = useState<number | undefined>(
		date.isValid ? date.year : undefined,
	);

	const validate = () => {
		setValid(true);
		if (year) {
			const date = DateTime.fromObject({
				year,
			});
			setValid(date.isValid);
			if (date.isValid) {
				onChange(date.toISODate());
			}
		}
	};

	return (
		<div className={cssOf("w-full", css?.root)}>
			{text?.label && (
				<div className={cssOf("flex justify-between items-center")}>
					<label
						htmlFor={`${name}-year-input`}
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
				id={`${name}-year-input`}
				required={!isOptional(schema, name)}
				type={"text"}
				className={cssOf(
					"bg-slate-50 text-slate-900 text-sm border border-slate-300 rounded focus:border-sky-400 focus:outline-none block w-full p-2.5",
					isLoading && "cursor-not-allowed bg-blue-50",
					!valid && "border border-red-600",
					css?.input,
				)}
				placeholder={isLoading ? undefined : text?.placeholder}
				value={year || ""}
				onChange={(e) => {
					if (isNumeric(e.target.value)) {
						setYear(e.target.value);
					}
					if (!e.target.value) {
						setYear(undefined);
					}
				}}
				onBlur={validate}
			/>
		</div>
	);
};
