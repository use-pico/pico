import {
    cn,
    WithEntity
}               from "@use-pico/common";
import type {
    FC,
    ReactNode
}               from "react";
import type {z} from "zod";

/**
 * Renders details of a given entity.
 *
 * @group ui
 *
 * @example
 *
 * ```tsx
 * import {Card} from "@use-pico/client";
 *
 * const MyCard = () => {
 *    return <Card
 *      items={[
 *          {
 *              id: "name",
 *              label: "Name",
 *              render: ({entity}) => entity.name,
 *          }
 *      ]}
 *      entity={entity}
 *    />
 * }
 * ```
 */
export namespace Card {
    export interface Item<
        TSchema extends z.ZodSchema
    > {
        id: string;
        label: ReactNode;
        render: FC<WithEntity.Schema<TSchema>>;
    }

    /**
     * Props for a Card component.
     *
     * @template TSchema Entity schema used to render the card.
     */
    export interface Props<
        TSchema extends z.ZodSchema
    > extends WithEntity.Schema<TSchema>, cn.WithTheme<"root" | "label"> {
        /**
         * Items to render in the card using specified schema.
         */
        items: Item<TSchema>[];
    }

    /**
     * When you want to extend the props of the Card component.
     *
     * @template TSchema Entity schema used to render the card.
     */
    export type PropsEx<
        TSchema extends z.ZodSchema
    > = Omit<Props<TSchema>, "items">;
}

export const Card = <
    TSchema extends z.ZodSchema
>(
    {
        items,
        entity,
        theme,
    }: Card.Props<TSchema>
) => {
    return <div
        className={cn(
            "flex flex-col gap-4",
            "shadow-md p-4 rounded-lg bg-white",
            theme?.root
        )}
    >
        {items.map((
            {
                id,
                label,
                render
            }) => {
            const Render = render;
            return <div
                key={id}
            >
                <div
                    className={cn(
                        "text-md text-slate-600 border-b mb-2",
                        theme?.label,
                    )}
                >
                    {label}
                </div>
                <Render entity={entity}/>
            </div>;
        })}
    </div>;
};
