import type { Entity } from "@use-pico/common";
import type { FC } from "react";
import { InlineContext } from "../context/InlineContext";
import { PreviewCss } from "./PreviewCss";

export namespace Preview {
	export type RenderProps<TValues extends Record<string, any>> = FC<
		Entity.Type<TValues>
	>;

	export interface Props<TValues extends Record<string, any>>
		extends PreviewCss.Props<Entity.Type<TValues>> {
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
	title: Title = () => null,
	links: Links = () => null,
	actions: Actions = () => null,
	extra: Extra = () => null,
	variant,
	tva = PreviewCss,
	css,
}: Preview.Props<TValues>) => {
	const tv = tva({
		...variant,
		css,
	}).slots;
	return (
		<InlineContext.Provider value={{ inline: true }}>
			<div className={tv.base()}>
				<div className={tv.container()}>
					<div className={tv.title()}>
						<Title entity={entity} />
					</div>
					<div className={tv.links()}>
						<Links entity={entity} />
					</div>
				</div>
				<div className={tv.container()}>
					<div className={tv.actions()}>
						<Actions entity={entity} />
					</div>
					<div className={tv.extra()}>
						<Extra entity={entity} />
					</div>
				</div>
			</div>
		</InlineContext.Provider>
	);
};
