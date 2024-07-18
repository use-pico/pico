import { Css, cssOf, WithEntity } from "@use-pico/common";
import type { FC, ReactNode } from "react";
import type { z } from "zod";

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
	export interface Item<TSchema extends z.ZodSchema> extends Css.Style {
		id: string;
		label: ReactNode;
		render: FC<WithEntity.Schema<TSchema>>;
	}

	/**
	 * Props for a Card component.
	 *
	 * @template TSchema Entity schema used to render the card.
	 */
	export interface Props<TSchema extends z.ZodSchema>
		extends WithEntity.Schema<TSchema>,
			Css<"root" | "label"> {
		/**
		 * Items to render in the card using specified schema.
		 */
		items: Item<TSchema>[];
		hidden?: string[];
	}

	/**
	 * When you want to extend the props of the Card component.
	 *
	 * @template TSchema Entity schema used to render the card.
	 */
	export type PropsEx<TSchema extends z.ZodSchema> = Omit<
		Props<TSchema>,
		"items"
	>;
}

export const Card = <TSchema extends z.ZodSchema>({
	items,
	hidden = [],
	entity,
	css,
}: Card.Props<TSchema>) => {
	return (
		<div
			className={cssOf(
				"flex flex-col gap-4",
				"border border-slate-100 p-4 rounded-lg",
				css?.root,
			)}
		>
			{items
				.filter(({ id }) => !hidden.includes(id))
				.map(({ id, label, render, css: $css }) => {
					const Render = render;
					return (
						<div
							key={id}
							className={
								"border border-slate-100 bg-slate-50 hover:bg-slate-100 px-2 py-1 rounded-md"
							}
						>
							<div
								className={cssOf(
									"text-sm font-semibold text-slate-600 border-b mb-2",
									css?.label,
								)}
							>
								{label}
							</div>
							<div className={cssOf($css)}>
								<Render entity={entity} />
							</div>
						</div>
					);
				})}
		</div>
	);
};
