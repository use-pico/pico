import { useCls } from "@use-pico/cls";
import type { EntitySchema } from "@use-pico/common";
import type { ReactNode, Ref } from "react";
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
		ref?: Ref<HTMLDivElement>;
		icon?: string;
		iconProps?: Icon.PropsEx;
		actionProps?: Action.Props;
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
	ref,
	icon = ActionMenuIcon,
	iconProps,
	actionProps,
	textTitle,
	textEmpty,
	items,
	modalProps,
	disabled = false,
	renderInline,
	renderItem = renderInline,
	limit,
	cls = MoreCls,
	tweak,
}: More.Props<TValues>) => {
	const $items = limit === undefined ? items : items.slice(0, limit);
	const slots = useCls(cls, tweak);

	return (
		<div
			data-ui="More-root"
			ref={ref}
			className={slots.root()}
		>
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
							size={"xs"}
							tweak={({ what }) => ({
								variant: what.variant({
									tone: "subtle",
									theme: "light",
								}),
							})}
							{...actionProps}
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
