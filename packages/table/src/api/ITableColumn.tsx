import {
    type FilterSchema,
    type IQueryStore,
    type OrderBySchema,
    type QuerySchema
}                        from "@use-pico/query";
import {type PicoSchema} from "@use-pico/schema";
import {
    type CSSProperties,
    type FC,
    type ReactNode
}                        from "react";

export interface ITableColumn<
    TQuerySchema extends QuerySchema<FilterSchema, OrderBySchema>,
    TSchema extends PicoSchema,
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

    withFilter?: ITableColumn.WithFilter<TSchema, TQuerySchema>;
}

export namespace ITableColumn {
    export type Render<TSchema extends PicoSchema> = FC<RenderProps<TSchema>>;

    export interface RenderProps<TSchema extends PicoSchema> {
        item: PicoSchema.Output<TSchema>;
        highlight: string[] | undefined;
    }

    export interface WithFilter<
        TSchema extends PicoSchema,
        TQuerySchema extends QuerySchema<FilterSchema, OrderBySchema>
    > {
        isFilter(filter?: PicoSchema.Output<TQuerySchema["shape"]["filter"]>): boolean;

        onFilter(props: OnFilterProps<TSchema, TQuerySchema>): void;

        onClear(props: OnClearProps<TSchema, TQuerySchema>): void;
    }

    export interface OnFilterProps<
        TSchema extends PicoSchema,
        TQuerySchema extends QuerySchema<FilterSchema, OrderBySchema>
    > {
        item: PicoSchema.Output<TSchema>;
        filter: IQueryStore<TQuerySchema>["values"]["filter"];
        shallowFilter: IQueryStore<TQuerySchema>["props"]["shallowFilter"];
        setFilter: IQueryStore<TQuerySchema>["props"]["setFilter"];
        clearFilter: IQueryStore<TQuerySchema>["props"]["clearFilter"];
    }

    export interface OnClearProps<
        TSchema extends PicoSchema,
        TQuerySchema extends QuerySchema<FilterSchema, OrderBySchema>,
    > {
        item: PicoSchema.Output<TSchema>;
        filter: IQueryStore<TQuerySchema>["values"]["filter"];
        shallowFilter: IQueryStore<TQuerySchema>["props"]["shallowFilter"];
        setFilter: IQueryStore<TQuerySchema>["props"]["setFilter"];
        clearFilter: IQueryStore<TQuerySchema>["props"]["clearFilter"];
    }
}
