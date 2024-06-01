import {
    cn,
    type FilterSchema,
    type OrderBySchema,
    type QuerySchema,
    type ValuesSchema,
    WithIdentitySchema
}                      from "@use-pico/common";
import {useController} from "react-hook-form";
import {z}             from "zod";
import {t}             from "../../../i18n/t";
import {SelectIcon}    from "../../../icon/SelectIcon";
import {Icon}          from "../../../ui/Icon";
import {Modal}         from "../../../ui/Modal";
import {Popup}         from "./Popup";
import {Selection}     from "./Selection";

export namespace Content {
    export interface Props<
        TValuesSchema extends ValuesSchema,
        TItemSchema extends WithIdentitySchema,
        TQuerySchema extends QuerySchema<FilterSchema, OrderBySchema>,
        TMode extends "single" | "multi",
    > extends Pick<Popup.Props<TValuesSchema, TItemSchema, TQuerySchema, TMode>, "schema" | "onSelect" | "defaultQuery" | "selectionStore" | "mode" | "table" | "tableProps" | "render" | "name" | "text" | "icon" | "modal" | "theme"> {
        collection: z.infer<TItemSchema>[];
    }
}

export const Content = <
    TValuesSchema extends ValuesSchema,
    TItemSchema extends WithIdentitySchema,
    TQuerySchema extends QuerySchema<FilterSchema, OrderBySchema>,
    TMode extends "single" | "multi",
>(
    {
        name,
        schema,
        selectionStore,
        mode,
        table,
        tableProps,
        render: Render,
        text,
        icon,
        collection,
        modal,
        defaultQuery,
        theme,
        onSelect,
    }: Content.Props<TValuesSchema, TItemSchema, TQuerySchema, TMode>,
) => {
    const {field: {value}} = useController({
        name,
    });

    return <Modal
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
                {"text-slate-600 hover:text-slate-900": Boolean(value)},
            )}
        >
            <Icon
                icon={icon || SelectIcon}
            />
            {Boolean(collection.length) && <div
                className={cn(
                    "flex flex-wrap items-center gap-2",
                )}
            >
                {collection.map(item => <div
                    key={item.id}
                    className={cn({
                        "bg-sky-100 border border-sky-200 shadow-md rounded-sm px-2 py-1": collection.length > 1,
                    })}
                >
                    <Render
                        entity={item}
                    />
                </div>)}
            </div>}
            {!collection.length && <>
                {text.select || text.label}
            </>}
        </div>}
        {...modal}
    >
        {Boolean(collection.length) && <div
            className={cn(
                "p-2 border-b border-slate-200",
            )}
        >
            <h2
                className={cn(
                    "text-slate-400 text-sm font-semibold",
                )}
            >
                {text?.selected || (collection.length > 1 ? t()`Currently selected items` : t()`Currently selected item`)}
            </h2>
            <div
                className={cn(
                    "flex flex-wrap items-center gap-2 text-sm",
                )}
            >
                {collection.map(item => <div
                    key={item.id}
                    className={cn(
                        "bg-sky-100 border border-sky-200 shadow-md rounded-sm px-2 py-1",
                    )}
                >
                    <Render
                        entity={item}
                    />
                </div>)}
            </div>
        </div>}
        <Selection
            name={name}
            table={table}
            tableProps={tableProps}
            schema={schema}
            selectionStore={selectionStore}
            mode={mode}
            defaultQuery={defaultQuery}
            icon={icon}
            theme={theme}
            onSelect={onSelect}
        />
    </Modal>;
};
