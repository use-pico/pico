import type { Entity, IdentitySchema } from "@use-pico/common";
import { type FC, type ReactNode } from "react";
import { Action } from "../action/Action";
import { ActionMenuIcon } from "../icon/ActionMenuIcon";
import { Modal } from "../modal/Modal";
import { MoreCss } from "./MoreCss";

export namespace More {
	export interface Props<TValues extends IdentitySchema.Type>
		extends MoreCss.Props {
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
	textTitle,
	textEmpty,
	items,
	render: Render,
	limit,
	variant,
	tva = MoreCss,
	css,
}: More.Props<TValues>) => {
	const $items = limit ? items.slice(0, limit) : items;
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
			{limit && items.length > limit && (
				<Modal
					title={textTitle}
					target={<Action iconEnabled={ActionMenuIcon} />}
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
