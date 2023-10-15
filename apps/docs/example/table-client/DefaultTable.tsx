import {
    type ITableColumn,
    Table
} from "@leight/table-client";

/**
 * Defined your column type
 */
export type IDefaultTableColumn = ITableColumn<{
    /**
     * Each column must provide an ID
     */
    id: string;
    foo: string;
    number: number;
}>;

/**
 * Define columns you're working with; table will enforce you to specify all
 * columns by it's typings.
 *
 * That's because you can change or override columns if you wish.
 */
export type IDefaultTableColumnKeys =
    "id"
    | "foo"
    | "number"

export const DefaultTable = () => {
    return <Table<IDefaultTableColumn, IDefaultTableColumnKeys>
        columns={{
            /**
             * See type in the IDE to reveal it's mysteries
             */
            id: {
                render: ({item: {id}}) => id,
            },
            /**
             * When you want to render the same value as it's input object,
             * just provide the property name (typed).
             *
             * This structure is enforced, because if you change your mind later
             * on and put some other properties (like width), it's much simpler to
             * do so.
             */
            number: {
                width:  10,
                render: ({item: {number}}) => number,
            },
            foo:    {
                width: 120,
                /**
                 * Yaay! You can provide custom render method. Input is your `TItem`.
                 */
                render: ({item: {foo}}) => {
                    return <>extended {foo}</>;
                },
            },
        }}
        /**
         * Items you wish to render; this is the simplest example
         */
        items={[
            {id:        "1",
                foo:    "foo1",
                number: 1
            },
            {id:        "2",
                foo:    "foo2",
                number: 2
            },
            {id:        "42",
                foo:    "foo42",
                number: 42
            },
        ]}
    />;
};
