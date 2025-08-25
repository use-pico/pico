import { useCls } from "@use-pico/cls";
import type { EntitySchema } from "@use-pico/common";
import type { ReactNode } from "react";
import { Action } from "../action/Action";
import { ActionMenuIcon } from "../icon/ActionMenuIcon";
import type { Icon } from "../icon/Icon";
import { Modal } from "../modal/Modal";
import { MoreCls } from "./MoreCls";

export namespace More {
	export namespace Render {
		export interface Props<TValues extends EntitySchema.Type> {
			entity: TValues;
		}

		export type Render<TValues extends EntitySchema.Type> = (
			props: Props<TValues>,
		) => ReactNode;
	}

	export interface Props<TValues extends EntitySchema.Type>
		extends MoreCls.Props {
		icon?: string;
		iconProps?: Icon.PropsEx;
		textTitle?: ReactNode;
		textEmpty?: ReactNode;
		modalProps?: Partial<Modal.PropsEx>;
		disabled?: boolean;
		items: TValues[];
		renderInline: Render.Render<TValues>;
		/**
		 * Render individual item in the modal; this could be separated as
		 * there may be different style for displaying inline item and for
		 * modal item.
		 *
		 * Defaults to `renderInline`.
		 */
		renderItem?: Render.Render<TValues>;
		limit?: number;
	}

	export type PropsEx<TValues extends EntitySchema.Type> = Omit<
		Props<TValues>,
		"items" | "renderInline"
	>;
}

export const More = <TValues extends EntitySchema.Type>({
	icon = ActionMenuIcon,
	iconProps,
	textTitle,
	textEmpty,
	items,
	modalProps,
	disabled = false,
	renderInline,
	renderItem = renderInline,
	limit,
	tva = MoreCls,
	cls,
}: More.Props<TValues>) => {
	const $items = limit === undefined ? items : items.slice(0, limit);
	const classes = useCls(tva, cls);

	return (
		<div className={classes.base()}>
			{items.length ? null : textEmpty}
			{$items.map((item) =>
				renderInline({
					entity: item,
				}),
			)}
			{limit !== undefined && items.length > limit && (
				<Modal
					textTitle={textTitle}
					target={
						<Action
							iconEnabled={icon}
							iconProps={iconProps}
							disabled={disabled}
							cls={({ what }) => ({
								variant: what.variant({
									tone: "subtle",
									theme: "light",
								}),
							})}
						/>
					}
					outside
					disabled={disabled}
					{...modalProps}
				>
					{() => (
						<div className={"flex flex-col gap-2"}>
							{items.map((item) =>
								renderItem({
									entity: item,
								}),
							)}
						</div>
					)}
				</Modal>
			)}
		</div>
	);
};
