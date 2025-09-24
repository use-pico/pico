import { type Cls, useCls, withCls } from "@use-pico/cls";
import { type FC, type PropsWithChildren, useRef } from "react";
import { Fade } from "./Fade";
import { ScrollableCls } from "./ScrollableCls";

export namespace Scrollable {
	export interface Props extends ScrollableCls.Props<PropsWithChildren> {
		layout: Cls.VariantOf<ScrollableCls, "layout">;
	}
}

export const BaseScrollable: FC<Scrollable.Props> = ({
	layout,
	cls = ScrollableCls,
	tweak,
	children,
}) => {
	const { slots } = useCls(cls, tweak, {
		variant: {
			layout,
		},
	});

	const rootElementRef = useRef<HTMLDivElement>(null);
	const viewportElementRef = useRef<HTMLDivElement>(null);
	const contentContainerRef = useRef<HTMLDivElement>(null);

	return (
		<div
			ref={rootElementRef}
			data-ui="Scrollable-root"
			className={slots.root()}
		>
			<Fade scrollableRef={viewportElementRef} />

			<div
				ref={viewportElementRef}
				data-ui="Scrollable-viewport"
				className={slots.viewport()}
			>
				<div
					ref={contentContainerRef}
					data-ui="Scrollable-content"
					className={slots.content()}
				>
					{children}
				</div>
			</div>
		</div>
	);
};

export const Scrollable = withCls(BaseScrollable, ScrollableCls);
