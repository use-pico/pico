import {
    cn,
    isOptional,
    type ValuesSchema
}                     from "@use-pico2/common";
import type {
    FC,
    ReactNode
}                     from "react";
import {RequiredIcon} from "../../icon/RequiredIcon";
import {SelectIcon}   from "../../icon/SelectIcon";
import {WithTable}    from "../../table/WithTable";
import {Button}       from "../../ui/Button";
import {Icon}         from "../../ui/Icon";
import {Modal}        from "../../ui/Modal";
import {errorOf}      from "../errorOf";
import type {Input}   from "../Input";

export namespace PopupSelect {
    export interface Props<TValuesSchema extends ValuesSchema> extends Input.Props<TValuesSchema> {
        icon?: string;
        text: {
            title: ReactNode;
            label: ReactNode;
            select?: ReactNode;
        };
        style?: {
            label?: cn.ClassNames;
            error?: cn.ClassNames;
        };
        modal?: Modal.PropsEx;
        table: FC<Omit<WithTable.PropsEx<any, any, any>, "render">>;
    }
}

export const PopupSelect = <
    TValuesSchema extends ValuesSchema
>(
    {
        icon,
        text,
        style,
        modal,
        name,
        schema,
        form,
        table,
    }: PopupSelect.Props<TValuesSchema>,
) => {
    const {
        register,
        formState: {errors}
    } = form;

    const Table = table;

    return <div
        className={cn(
            "w-full",
        )}
    >
        <div
            className={cn(
                "flex justify-between items-center",
            )}
        >
            <label
                className={cn(
                    "block text-sm font-medium text-slate-900",
                    style?.label,
                )}
            >
                <span>{text.label}</span>
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
        </div>
        <Modal
            title={text.title}
            icon={icon}
            style={{
                target: [
                    "w-full",
                ],
            }}
            target={<div
                className={cn(
                    "flex items-center gap-2",
                    "text-slate-400 hover:text-slate-700 cursor-pointer",
                    "bg-slate-50 text-sm border border-slate-300 rounded w-full p-2.5",
                )}
            >
                <Icon
                    icon={icon || SelectIcon}
                />
                {text.select || text.label}
            </div>}
            {...modal}
        >
            <Table
                focus
                defaultQuery={{
                    cursor: {
                        size: 10,
                        page: 0,
                    },
                }}
            />
            <div
                className={cn(
                    "flex justify-center gap-6 border-t border-t-slate-200 py-4",
                )}
            >
                <Button
                    cx={[
                        "bg-slate-400 hover:bg-slate-600",
                    ]}
                >
                    cancel
                </Button>
                <Button
                    icon={{
                        enabled:  icon,
                        disabled: icon,
                    }}
                >
                    Commit
                </Button>
            </div>
        </Modal>
    </div>;
};
