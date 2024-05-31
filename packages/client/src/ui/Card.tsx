import {
	cn,
	WithEntity
}               from "@use-pico/common";
import type {
	FC,
	ReactNode
}               from "react";
import type {z} from "zod";

export namespace Card {
	export interface Props<
		TSchema extends z.ZodSchema
	> extends WithEntity.Schema<TSchema>, cn.WithTheme<"root" | "label"> {
		items: Item<TSchema>[];
	}

	export interface Item<
		TSchema extends z.ZodSchema
	> {
		id: string;
		label: ReactNode;
		render: FC<WithEntity.Schema<TSchema>>;
	}

	export type PropsEx<
		TSchema extends z.ZodSchema
	> = Omit<Props<TSchema>, "items">;
}

/**
 * Renders details of a given entity.
 */
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
