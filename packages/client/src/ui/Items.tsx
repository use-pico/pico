import {
	Css,
	cssOf,
	WithEntity,
	type WithIdentitySchema
}                       from "@use-pico/common";
import {
	type FC,
	type ReactNode
}                       from "react";
import {type z}         from "zod";
import {ActionMenuIcon} from "../icon/ActionMenuIcon";
import {Action}         from "./Action";
import {Modal}          from "./Modal";

export namespace Items {
	export interface Props<
		TItemSchema extends WithIdentitySchema,
	> extends Css<"root"> {
		text?: {
			title?: ReactNode;
			empty?: ReactNode;
		};
		items: z.infer<TItemSchema>[];
		render: FC<WithEntity.Schema<TItemSchema>>;
		limit?: number;
	}
}

export const Items = <
	TItemSchema extends WithIdentitySchema,
>(
	{
		text,
		items,
		render: Render,
		limit,
		css,
	}: Items.Props<TItemSchema>
) => {
	const $items = limit ? items.slice(0, limit) : items;

	return <div
		className={cssOf(
			"flex flex-row items-center gap-2 text-sm font-semibold",
			css?.root,
		)}
	>
		{items.length ? null : text?.empty}
		{$items.map(item => <div
			key={`items-${item.id}`}
			className={cssOf(
				"border border-blue-200 bg-blue-50 rounded-md px-2 py-1",
			)}
		>
			<Render
				entity={item}
			/>
		</div>)}
		{limit && items.length > limit && <Modal
			title={text?.title}
			target={<Action
				icon={{
					enabled:  ActionMenuIcon,
					disabled: ActionMenuIcon,
				}}
			/>}
			outside
		>
			<div
				className={cssOf(
					"flex flex-col gap-2",
				)}
			>
				{items.map(item => <div
					key={`items-${item.id}`}
					className={cssOf(
						"border border-blue-200 bg-blue-50 rounded-md p-2",
					)}
				>
					<Render
						entity={item}
					/>
				</div>)}
			</div>
		</Modal>}
	</div>;
};
