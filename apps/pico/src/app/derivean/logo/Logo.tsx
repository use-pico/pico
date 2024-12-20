import type { FC } from "react";
import { LogoCss } from "~/app/derivean/logo/LogoCss";

export namespace Logo {
	export interface Props extends LogoCss.Props {
		//
	}
}

export const Logo: FC<Logo.Props> = ({ variant, tva = LogoCss, css }) => {
	const tv = tva({ ...variant, css }).slots;

	return <div className={tv.base()}>DeRivean</div>;
};
