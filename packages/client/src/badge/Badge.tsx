import { type FC, type PropsWithChildren } from "react";
import { BadgeCss } from "./BadgeCss";

/**
 * Simple badge icon; just rounded background with children.
 *
 * @group ui
 */
export namespace Badge {
	export interface Props extends BadgeCss.Props<PropsWithChildren> {}
}

export const Badge: FC<Badge.Props> = ({
	variant,
	tva = BadgeCss,
	css,
	children,
}) => {
	const tv = tva({ ...variant, css }).slots;

	return <div className={tv.base()}>{children}</div>;
};
