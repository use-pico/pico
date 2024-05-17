import {
    cn,
    isOptional,
    type ValuesSchema
}                       from "@use-pico2/common";
import type {ReactNode} from "react";
import {RequiredIcon}   from "../../icon/RequiredIcon";
import {Icon}           from "../../ui/Icon";
import {errorOf}        from "../errorOf";
import {type Input}     from "../Input";

export namespace PasswordInput {
    export interface Props<TValuesSchema extends ValuesSchema> extends Input.Props<TValuesSchema> {
        text?: {
            label?: ReactNode;
            placeholder?: string;
        };
        style?: {
            label?: cn.ClassNames;
            input?: cn.ClassNames;
            error?: cn.ClassNames;
        };
    }
}

export const PasswordInput = <
    TValuesSchema extends ValuesSchema
>(
    {
        name,
        form,
        schema,
        text,
        cx,
        style,
    }: PasswordInput.Props<TValuesSchema>,
) => {
    const {
        register,
        formState: {errors}
    } = form;

    return <div
        className={cn(
            "w-full",
            cx,
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
                    style?.label,
                )}
            >
                <span>{text?.label}</span>
                <span
                    className={cn(
                        "text-red-600 text-sm pl-2",
                        style?.error,
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
            id={`${name}-password-input`}
            required={!isOptional(schema, name)}
            type={"password"}
            className={cn(
                "bg-slate-50 text-slate-900 text-sm border border-slate-300 rounded focus:border-sky-400 focus:outline-none block w-full p-2.5",
                style?.input,
            )}
            placeholder={text?.placeholder}
            {...register(name)}
        />
    </div>;
};
