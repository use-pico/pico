import { type Entity, tvc } from "@use-pico/common";
import type { FC } from "react";
import { InlineContext } from "../context/InlineContext";
import { PreviewCls } from "./PreviewCls";

export namespace Preview {
	export type RenderProps<TValues extends Record<string, any>> = FC<
		Entity.Type<TValues>
	>;

	export interface Props<TValues extends Record<string, any>>
		extends PreviewCls.Props<Entity.Type<TValues>> {
		/**
		 * Title section (left-top)
		 */
		title?: RenderProps<TValues>;
		/**
		 * Links (right-top)
		 */
		links?: RenderProps<TValues>;
		/**
		 * Action items (left-bottom)
		 */
		actions?: RenderProps<TValues>;
		/**
		 * Extra items (right-bottom)
		 */
		extra?: RenderProps<TValues>;
	}

	export type PropsEx<TValues extends Record<string, any>> = Props<TValues>;
}

export const Preview = <TValues extends Record<string, any>>({
	entity,
	title: Title,
	links: Links,
	actions: Actions,
	extra: Extra,
	variant,
	tva = PreviewCls,
	css,
}: Preview.Props<TValues>) => {
	const { slots } = tva({
		...variant,
		css,
	});
	return (
		<InlineContext.Provider
			value={{
				inline: true,
			}}
		>
			<div className={slots.base()}>
				{Title || Links ? (
					<div className={slots.container()}>
						<div className={slots.title()}>
							{Title ? <Title entity={entity} /> : null}
						</div>
						<div className={slots.links()}>
							{Links ? <Links entity={entity} /> : null}
						</div>
					</div>
				) : null}

				{(Title || Links) && (Actions || Extra) ? (
					<div
						className={tvc([
							"w-full",
							"border-b",
							"border-(--color-separator)",
						])}
					/>
				) : null}

				{Actions || Extra ? (
					<div className={slots.container()}>
						<div className={slots.actions()}>
							{Actions ? <Actions entity={entity} /> : null}
						</div>
						<div className={slots.extra()}>
							{Extra ? <Extra entity={entity} /> : null}
						</div>
					</div>
				) : null}
			</div>
		</InlineContext.Provider>
	);
};
