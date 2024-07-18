import { Css, cssOf } from "@use-pico/common";
import { type FC, type PropsWithChildren, type ReactNode } from "react";
import { InlineStore } from "../provider/InlineStore";

export namespace Fieldset {
	export interface Props extends PropsWithChildren, Css<"root" | "content"> {
		text: {
			legend: ReactNode;
		};
	}
}

export const Fieldset: FC<Fieldset.Props> = ({ text, children, css }) => {
	const inlineStore = InlineStore.useSelector(({ inline }) => ({ inline }));

	return inlineStore.inline ?
			<div className={cssOf("w-full", css?.root)}>
				<div className={cssOf("gap-2 flex flex-row", css?.content)}>
					{children}
				</div>
			</div>
		:	<fieldset
				className={cssOf(
					"border border-slate-200 rounded p-4 w-full",
					css?.root,
				)}
			>
				<legend>{text.legend}</legend>
				<div className={cssOf("gap-2", "flex flex-col", css?.content)}>
					{children}
				</div>
			</fieldset>;
};
