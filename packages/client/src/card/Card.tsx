import type { ClsExtract } from "@use-pico/cls";
import type { Entity } from "@use-pico/common";
import type { FC, ReactNode } from "react";
import { InlineContext } from "../context/InlineContext";
import { ValueOf } from "../value-of/ValueOf";
import { CardCls } from "./CardCls";

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
	export interface Item<TValues extends Record<string, any>>
		extends ClsExtract<ValueOf.Props> {
		id: string;
		label?: ReactNode;
		render: FC<Entity.Type<TValues>>;
	}

	/**
	 * Props for a Card component.
	 *
	 * @template TSchema Entity schema used to render the card.
	 */
	export interface Props<TValues extends Record<string, any>>
		extends CardCls.Props<Entity.Type<TValues>> {
		/**
		 * Items to render in the card using specified schema.
		 */
		items: Item<TValues>[];
		hidden?: string[];
		inline?: boolean;
		valueOfProps?: Partial<ValueOf.Props>;
	}

	/**
	 * When you want to extend the props of the Card component.
	 *
	 * @template TValues Values used to render the card.
	 */
	export type PropsEx<TValues extends Record<string, any>> = Omit<
		Props<TValues>,
		"items"
	>;
}

export const Card = <TValues extends Record<string, any>>({
	items,
	hidden = [],
	valueOfProps,
	entity,
	variant,
	tva = CardCls,
	cls,
	inline = false,
}: Card.Props<TValues>) => {
	const { el } = tva(
		{
			inline,
			...variant,
		},
		cls,
	);

	return (
		<InlineContext.Provider
			value={{
				inline,
			}}
		>
			<el.base.Div>
				{items
					.filter(({ id }) => !hidden.includes(id))
					.map(({ id, render: Render, ...props }) => {
						return (
							<ValueOf
								key={id}
								value={<Render entity={entity} />}
								{...valueOfProps}
								{...props}
							/>
						);
					})}
			</el.base.Div>
		</InlineContext.Provider>
	);
};
