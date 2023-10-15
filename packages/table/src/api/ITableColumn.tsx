import {
    type FilterSchema,
    type IQueryStore,
    type OrderBySchema
}               from "@use-pico/query";
import {type z} from "@use-pico/utils";
import {
    type CSSProperties,
    type FC,
    type ReactNode
}               from "react";

export interface ITableColumn<
    TSchema extends z.ZodSchema,
    TFilterSchema extends FilterSchema,
> {
    /**
     * Explicitly override column title (by default column name is taken from Record<> in Table)
     */
    title?: string;
    /**
     * Specify width of a column
     */
    width?: number;
    /**
     * Mandatory render method; if you do not want to render a column, mark it as hidden on a table itself.
     */
    render: ITableColumn.Render<TSchema>;
    /**
     * Optionally return styles for a table header column
     */
    headerStyle?: ((defaultStyle: CSSProperties) => CSSProperties | undefined) | CSSProperties;
    /**
     * Render header column; children is the original content of the column (translated name);
     */
    headerRender?: (children: ReactNode) => ReactNode;

    /**
     * Handle clicking column in table header.
     */
    onHeaderClick?(): void;

    withFilter?: ITableColumn.WithFilter<TSchema, TFilterSchema>;
}

export namespace ITableColumn {
    export type Render<TSchema extends z.ZodSchema> = FC<RenderProps<TSchema>>;

    export interface RenderProps<TSchema extends z.ZodSchema> {
        item: z.infer<TSchema>;
        highlight: string[] | undefined;
    }

    export interface WithFilter<
        TSchema extends z.ZodSchema,
        TFilterSchema extends FilterSchema,
    > {
        isFilter(filter?: z.infer<TFilterSchema>): boolean;

        onFilter(props: OnFilterProps<TSchema, TFilterSchema>): void;

        onClear(props: OnClearProps<TSchema, TFilterSchema>): void;
    }

    export interface OnFilterProps<
        TSchema extends z.ZodSchema,
        TFilterSchema extends FilterSchema,
    > {
        item: z.infer<TSchema>;
        filter: ReturnType<IQueryStore<TFilterSchema, OrderBySchema>["use"]>["filter"];
        shallowFilter: ReturnType<IQueryStore<TFilterSchema, OrderBySchema>["use"]>["shallowFilter"];
        setFilter: ReturnType<IQueryStore<TFilterSchema, OrderBySchema>["use"]>["setFilter"];
        clearFilter: ReturnType<IQueryStore<TFilterSchema, OrderBySchema>["use"]>["clearFilter"];
    }

    export interface OnClearProps<
        TSchema extends z.ZodSchema,
        TFilterSchema extends FilterSchema,
    > {
        item: z.infer<TSchema>;
        filter: ReturnType<IQueryStore<TFilterSchema, OrderBySchema>["use"]>["filter"];
        shallowFilter: ReturnType<IQueryStore<TFilterSchema, OrderBySchema>["use"]>["shallowFilter"];
        setFilter: ReturnType<IQueryStore<TFilterSchema, OrderBySchema>["use"]>["setFilter"];
        clearFilter: ReturnType<IQueryStore<TFilterSchema, OrderBySchema>["use"]>["clearFilter"];
    }
}
