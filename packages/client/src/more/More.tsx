import type { Entity, IdentitySchema } from "@use-pico/common";
import { type FC, type ReactNode } from "react";
import { Action } from "../action/Action";
import { ActionMenuIcon } from "../icon/ActionMenuIcon";
import type { Icon } from "../icon/Icon";
import { Modal } from "../modal/Modal";
import { MoreCss } from "./MoreCss";

export namespace More {
	export interface Props<TValues extends IdentitySchema.Type>
		extends MoreCss.Props {
		icon?: string;
		iconProps?: Icon.PropsEx;
		textTitle?: ReactNode;
		textEmpty?: ReactNode;
		items: TValues[];
		render: FC<Entity.Type<TValues>>;
		limit?: number;
	}

	export type PropsEx<TValues extends IdentitySchema.Type> = Omit<
		Props<TValues>,
		"items" | "render"
	>;
}

export const More = <TValues extends IdentitySchema.Type>({
	icon = ActionMenuIcon,
	iconProps,
	textTitle,
	textEmpty,
	items,
	render: Render,
	limit,
	variant,
	tva = MoreCss,
	css,
}: More.Props<TValues>) => {
	const $items = limit === undefined ? items : items.slice(0, limit);
	const tv = tva({ ...variant, css }).slots;

	return (
		<div className={tv.base()}>
			{items.length ? null : textEmpty}
			{$items.map((item) => (
				<Render
					key={`items-${item.id}`}
					entity={item}
				/>
			))}
			{limit !== undefined && items.length > limit && (
				<Modal
					textTitle={textTitle}
					target={
						<Action
							iconEnabled={icon}
							iconProps={iconProps}
						/>
					}
					outside
				>
					<div className={"flex flex-col gap-2"}>
						{items.map((item) => (
							<Render
								key={`items-${item.id}`}
								entity={item}
							/>
						))}
					</div>
				</Modal>
			)}
		</div>
	);
};
