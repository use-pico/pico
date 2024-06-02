"use client";

import {
    cn,
    isOptional,
    type ValuesSchema
}                       from "@use-pico/common";
import type {ReactNode} from "react";
import {useController}  from "react-hook-form";
import {RequiredIcon}   from "../../icon/RequiredIcon";
import {Icon}           from "../../ui/Icon";
import {errorOf}        from "../errorOf";
import {type Input}     from "../Input";

export namespace BoolInput {
    export interface Props<TValuesSchema extends ValuesSchema> extends Input.Props<TValuesSchema> {
        /**
         * Various texts used in this input
         */
        text: {
            /**
             * Label of this input
             */
            label: ReactNode;
        };

        onBool?(value: boolean): void;
    }
}

export const BoolInput = <
    TValuesSchema extends ValuesSchema
>(
    {
        name,
        schema,
        text,
        onBool,
        theme,
    }: BoolInput.Props<TValuesSchema>,
) => {
    const {
        field:     {
                       onChange,
                       ...field
                   },
        formState: {errors}
    } = useController({
        name,
    });

    return <div
        className={cn(
            "w-full",
            theme?.root,
        )}
    >
        <label
            htmlFor={`${name}-bool-input`}
            className={cn(
                "flex items-center justify-between text-sm font-medium text-slate-900",
                theme?.label,
            )}
        >
            <div
                className={cn(
                    "flex items-center gap-2",
                )}
            >
                <span>{text?.label}</span>
                {!isOptional(schema, name) && <Icon
                    icon={RequiredIcon}
                    size={"xs"}
                    cx={[
                        "text-red-600 opacity-50",
                    ]}
                />}
            </div>
            <span
                className={cn(
                    "text-red-600 text-sm pl-2",
                    theme?.error,
                )}
            >
					{errorOf(errors, name)}
				</span>
            <input
                id={`${name}-bool-input`}
                type={"checkbox"}
                checked={field.value}
                className={"sr-only peer"}
                onChange={(e) => {
                    onChange(e);
                    onBool?.(e.target.checked);
                }}
                {...field}
            />
            <div
                className={cn(
                    "relative w-11 h-6",
                    "bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600",
                )}
            ></div>
        </label>
    </div>;
};
