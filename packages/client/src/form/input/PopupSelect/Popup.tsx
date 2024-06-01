"use client";

import {
    cn,
    type FilterSchema,
    type OrderBySchema,
    type QuerySchema,
    type ValuesSchema,
    WithIdentitySchema
}                         from "@use-pico/common";
import {useController}    from "react-hook-form";
import {LoaderIcon}       from "../../../icon/LoaderIcon";
import {CollectionResult} from "../../../query/CollectionResult";
import {useQueryEx}       from "../../../query/useQueryEx";
import {Icon}             from "../../../ui/Icon";
import {PopupSelect}      from "../PopupSelect";
import {Content}          from "./Content";

export namespace Popup {
    export type Props<
        TValuesSchema extends ValuesSchema,
        TItemSchema extends WithIdentitySchema,
        TQuerySchema extends QuerySchema<FilterSchema, OrderBySchema>,
        TMode extends "single" | "multi",
    > = Pick<PopupSelect.Props<TValuesSchema, TItemSchema, TQuerySchema, TMode>, "name" | "onSelect" | "disabled" | "render" | "schema" | "selectionStore" | "withSourceQuery" | "mode" | "defaultQuery" | "text" | "icon" | "modal" | "table" | "tableProps" | "theme">
}

export const Popup = <
    TValuesSchema extends ValuesSchema,
    TItemSchema extends WithIdentitySchema,
    TQuerySchema extends QuerySchema<FilterSchema, OrderBySchema>,
    TMode extends "single" | "multi",
>(
    {
        name,
        disabled,
        render,
        selectionStore,
        withSourceQuery,
        schema,
        mode,
        defaultQuery,
        text,
        icon,
        modal,
        table,
        tableProps,
        theme,
        onSelect,
    }: Popup.Props<TValuesSchema, TItemSchema, TQuerySchema, TMode>,
) => {
    const {field: {value}} = useController({
        name,
    });
    const result = useQueryEx({
        withQuery: withSourceQuery,
        request:   {
            filter: mode === "single" ? {
                id: value,
            } : {
                idIn: value,
            },
        },
        options:   {
            enabled: !disabled,
        },
    });

    return disabled ? <div
        className={cn(
            "flex items-center gap-2",
            "text-slate-400",
            "bg-orange-50 text-sm border border-slate-300 rounded w-full p-2.5",
            "cursor-not-allowed",
        )}
    >
        {icon && <Icon
            icon={icon}
        />}
        {text.select || text.label}
    </div> : <CollectionResult<TItemSchema>
        result={result}
        loader={() => {
            return <div
                className={cn(
                    "flex items-center gap-2",
                    "text-slate-400",
                    "bg-slate-50 text-sm border border-slate-300 rounded w-full p-2.5",
                    "cursor-not-allowed",
                )}
            >
                <Icon
                    icon={LoaderIcon}
                />
                {text.select || text.label}
            </div>;
        }}
        success={({collection}) => {
            return <selectionStore.Provider
                values={{
                    items:     new Map(collection.map(item => [item.id, item])),
                    selection: new Map(collection.map(item => [item.id, item])),
                }}
            >
                <Content
                    defaultQuery={defaultQuery}
                    name={name}
                    schema={schema}
                    selectionStore={selectionStore}
                    mode={mode}
                    table={table}
                    tableProps={tableProps}
                    render={render}
                    text={text}
                    icon={icon}
                    collection={collection}
                    modal={modal}
                    theme={theme}
                    onSelect={onSelect}
                />
            </selectionStore.Provider>;
        }}
    />;
};
