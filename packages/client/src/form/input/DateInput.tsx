import {
	cssOf,
	DateTime,
	isNumeric,
	isOptional,
	type ValuesSchema,
} from "@use-pico/common";
import { useEffect, useState, type ReactNode } from "react";
import { useController } from "react-hook-form";
import { tx } from "../../i18n/tx";
import { RequiredIcon } from "../../icon/RequiredIcon";
import { Icon } from "../../ui/Icon";
import { errorOf } from "../errorOf";
import type { Input } from "../Input";

const ORDER_YEAR = 0;
const ORDER_MONTH = 1;
const ORDER_DAY = 2;

export namespace DateInput {
	export type Template = "YYYY-MM-DD" | "DD-MM-YYYY" | "YYYY-DD-MM";

	export interface Props<TValuesSchema extends ValuesSchema>
		extends Input.Props<TValuesSchema> {
		template?: Template;
		text?: {
			label?: ReactNode;
		};

		onDate?(date: DateTime): void;
	}
}

export const DateInput = <TValuesSchema extends ValuesSchema>({
	name,
	text,
	template = "DD-MM-YYYY",
	onDate,
	schema,
	css,
}: DateInput.Props<TValuesSchema>) => {
	const {
		field: { value, onChange },
		formState: { errors, isLoading },
	} = useController({ name });
	const date = DateTime.fromISO(value as string);

	const [year, setYear] = useState<number | undefined>(
		date.isValid ? date.year : undefined,
	);
	const [month, setMonth] = useState<number | undefined>(
		date.isValid ? date.month : undefined,
	);
	const [day, setDay] = useState<number | undefined>(
		date.isValid ? date.day : undefined,
	);
	const [valid, setValid] = useState<boolean | undefined>(true);

	useEffect(() => {
		setYear(undefined);
		setMonth(undefined);
		setDay(undefined);
		if (date.isValid) {
			setYear(date.year);
			setMonth(date.month);
			setDay(date.day);
		}
	}, [value]);

	const order = {
		"YYYY-MM-DD": [ORDER_YEAR, ORDER_MONTH, ORDER_DAY] as const,
		"DD-MM-YYYY": [ORDER_DAY, ORDER_MONTH, ORDER_YEAR] as const,
		"YYYY-DD-MM": [ORDER_YEAR, ORDER_DAY, ORDER_MONTH] as const,
	}[template];
	const styles = [
		[
			"focus:border-sky-400 focus:border-r-slate-200",
			"border-r-slate-200 rounded-r-none",
		],
		["border-r-0 border-l-0 rounded-none"],
		[
			"focus:border-sky-400 focus:border-l-slate-200",
			"border-l-slate-200 rounded-l-none",
		],
	] as const;

	const validate = () => {
		setValid(undefined);
		if (year && month && day) {
			const date = DateTime.fromObject({
				year,
				month,
				day,
			});
			setValid(date.isValid);
			if (date.isValid) {
				onChange(date.toISODate());
				onDate?.(date);
			}
		}
	};

	const input = [
		<input
			key={"year"}
			type={"text"}
			className={cssOf(
				"bg-slate-50 text-slate-900 text-sm border border-slate-300 rounded focus:outline-none block w-full p-2.5",
				"text-center",
				!valid && "border border-red-600",
				...styles[order[ORDER_YEAR]],
				isLoading && "cursor-not-allowed bg-blue-50",
				css?.input,
			)}
			placeholder={isLoading ? undefined : tx()`Date - year`}
			onChange={(e) => {
				if (isNumeric(e.target.value)) {
					setYear(e.target.value);
				}
				if (!e.target.value) {
					setYear(undefined);
				}
			}}
			value={year ?? ""}
			onBlur={validate}
		/>,
		<input
			key={"month"}
			type={"text"}
			className={cssOf(
				"bg-slate-50 text-slate-900 text-sm border border-slate-300 rounded focus:border-sky-400 focus:outline-none block w-full p-2.5",
				"text-center",
				!valid && "border border-red-600",
				...styles[order[ORDER_MONTH]],
				isLoading && "cursor-not-allowed bg-blue-50",
				css?.input,
			)}
			placeholder={isLoading ? undefined : tx()`Date - month`}
			min={1}
			max={12}
			onChange={(e) => {
				const { value, min, max } = e.target;
				if (isNumeric(e.target.value)) {
					setMonth(Math.max(Number(min), Math.min(Number(max), Number(value))));
				}
				if (!e.target.value) {
					setMonth(undefined);
				}
			}}
			value={month ?? ""}
			onBlur={validate}
		/>,
		<input
			key={"day"}
			type={"text"}
			className={cssOf(
				"bg-slate-50 text-slate-900 text-sm border border-slate-300 rounded focus:border-sky-400 focus:outline-none block w-full p-2.5",
				"text-center",
				!valid && "border border-red-600",
				...styles[order[ORDER_DAY]],
				isLoading && "cursor-not-allowed bg-blue-50",
				css?.input,
			)}
			placeholder={isLoading ? undefined : tx()`Date - day`}
			min={1}
			max={31}
			onChange={(e) => {
				const { value, min, max } = e.target;
				if (isNumeric(e.target.value)) {
					setDay(Math.max(Number(min), Math.min(Number(max), Number(value))));
				}
				if (!e.target.value) {
					setDay(undefined);
				}
			}}
			value={day ?? ""}
			onBlur={validate}
		/>,
	] as const;

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
			<div className={cssOf("flex flex-row items-center")}>
				{input[order[ORDER_YEAR]]}
				{input[order[ORDER_MONTH]]}
				{input[order[ORDER_DAY]]}
			</div>
		</div>
	);
};
