import { useCls } from "@use-pico/cls";
import type { Entity } from "@use-pico/common";
import type { FC, Ref } from "react";
import { InlineContext } from "../context/InlineContext";
import { PreviewCls } from "./PreviewCls";

export namespace Preview {
	export type RenderProps<TValues extends Record<string, any>> = FC<
		Entity.Type<TValues>
	>;

	export interface Props<TValues extends Record<string, any>>
		extends PreviewCls.Props<Entity.Type<TValues>> {
		ref?: Ref<HTMLDivElement>;
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
	ref,
	entity,
	title: Title,
	links: Links,
	actions: Actions,
	extra: Extra,
	cls = PreviewCls,
	tweak,
}: Preview.Props<TValues>) => {
	const slots = useCls(cls, tweak);

	return (
		<InlineContext.Provider
			value={{
				inline: true,
			}}
		>
			<div
				data-ui="Preview-root"
				ref={ref}
				className={slots.root()}
			>
				{Title || Links ? (
					<div
						data-ui="Preview-container"
						className={slots.container()}
					>
						<div
							data-ui="Preview-title"
							className={slots.title()}
						>
							{Title ? <Title entity={entity} /> : null}
						</div>
						<div
							data-ui="Preview-links"
							className={slots.links()}
						>
							{Links ? <Links entity={entity} /> : null}
						</div>
					</div>
				) : null}

				{(Title || Links) && (Actions || Extra) ? (
					<div
						data-ui="Preview-divider"
						className={slots.divider()}
					/>
				) : null}

				{Actions || Extra ? (
					<div
						data-ui="Preview-container"
						className={slots.container()}
					>
						<div
							data-ui="Preview-actions"
							className={slots.actions()}
						>
							{Actions ? <Actions entity={entity} /> : null}
						</div>
						<div
							data-ui="Preview-extra"
							className={slots.extra()}
						>
							{Extra ? <Extra entity={entity} /> : null}
						</div>
					</div>
				) : null}
			</div>
		</InlineContext.Provider>
	);
};
