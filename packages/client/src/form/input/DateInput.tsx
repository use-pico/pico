"use client";

import {cn, DateTime, isNumberic, isOptional, type ValuesSchema} from "@use-pico/common";
import {type ReactNode, useState} from "react";
import {useController} from "react-hook-form";
import {tx} from "../../i18n/tx";
import {RequiredIcon} from "../../icon/RequiredIcon";
import {Icon} from "../../ui/Icon";
import {errorOf} from "../errorOf";
import type {Input} from "../Input";

export namespace DateInput {
    export type Template =
        "YYYY-MM-DD"
        | "DD-MM-YYYY"
        | "YYYY-DD-MM";

    export interface Props<TValuesSchema extends ValuesSchema> extends Input.Props<TValuesSchema> {
        template?: Template;
        text?: {
            label?: ReactNode;
            placeholder?: string;
        };

        onDate?(date: DateTime): void;
    }
}

export const DateInput = <
    TValuesSchema extends ValuesSchema,
>(
    {
        name,
        text,
        template = "DD-MM-YYYY",
        onDate,
        schema,
        theme,
    }: DateInput.Props<TValuesSchema>,
) => {
    const {
        field: {
            value,
            onChange,
        },
        formState: {errors}
    } = useController({name});
    const date = DateTime.fromISO(value as string);
    const [year, setYear] = useState<number | undefined>(date.isValid ? date.year : undefined);
    const [month, setMonth] = useState<number | undefined>(date.isValid ? date.month : undefined);
    const [day, setDay] = useState<number | undefined>(date.isValid ? date.day : undefined);
    const [valid, setValid] = useState<boolean | undefined>(undefined);

    const order = {
        "YYYY-MM-DD": [0, 1, 2] as const,
        "DD-MM-YYYY": [2, 1, 0] as const,
        "YYYY-DD-MM": [0, 2, 1] as const,
    }[template];
    const styles = [
        [
            "focus:border-sky-400 focus:border-r-slate-200",
            "border-r-slate-200 rounded-r-none",
        ],
        [
            "border-r-0 border-l-0 rounded-none",
        ],
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
            className={cn(
                "bg-slate-50 text-slate-900 text-sm border border-slate-300 rounded focus:outline-none block w-full p-2.5",
                "text-center",
                {"border border-red-600": valid === false},
                styles[order[0]],
            )}
            placeholder={tx()`Date - year`}
            onChange={e => {
                if (isNumberic(e.target.value)) {
                    setYear(e.target.value);
                }
                if (!e.target.value) {
                    setYear(undefined);
                }
            }}
            value={year || ""}
            onBlur={validate}
        />,
        <input
            key={"month"}
            type={"text"}
            className={cn(
                "bg-slate-50 text-slate-900 text-sm border border-slate-300 rounded focus:border-sky-400 focus:outline-none block w-full p-2.5",
                "text-center",
                {"border border-red-600": valid === false},
                styles[order[1]],
            )}
            placeholder={tx()`Date - month`}
            min={1}
            max={12}
            onChange={e => {
                const {
                    value,
                    min,
                    max,
                } = e.target;
                if (isNumberic(e.target.value)) {
                    setMonth(Math.max(Number(min), Math.min(Number(max), Number(value))));
                }
                if (!e.target.value) {
                    setMonth(undefined);
                }
            }}
            value={month || ""}
            onBlur={validate}
        />,
        <input
            key={"day"}
            type={"text"}
            className={cn(
                "bg-slate-50 text-slate-900 text-sm border border-slate-300 rounded focus:border-sky-400 focus:outline-none block w-full p-2.5",
                "text-center",
                {"border border-red-600": valid === false},
                styles[order[2]],
            )}
            placeholder={tx()`Date - day`}
            min={1}
            max={31}
            onChange={e => {
                const {
                    value,
                    min,
                    max,
                } = e.target;
                if (isNumberic(e.target.value)) {
                    setDay(Math.max(Number(min), Math.min(Number(max), Number(value))));
                }
                if (!e.target.value) {
                    setDay(undefined);
                }
            }}
            value={day || ""}
            onBlur={validate}
        />,
    ] as const;

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
                htmlFor={`${name}-password-input`}
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
        <div
            className={cn(
                "flex flex-row items-center",
            )}
        >
            {input[order[0]]}
            {/*<div*/}
            {/*	className={cn(*/}
            {/*		"text-slate-900 border-t border-b border-slate-300 bg-slate-50 h-full",*/}
            {/*	)}*/}
            {/*>*/}
            {/*	<Icon*/}
            {/*		icon={DividerIcon}*/}
            {/*		size={"2xl"}*/}
            {/*	/>*/}
            {/*</div>*/}
            {input[order[1]]}
            {/*<Icon*/}
            {/*	icon={DividerIcon}*/}
            {/*	size={"6xl"}*/}
            {/*/>*/}
            {input[order[2]]}
        </div>
    </div>;
};
