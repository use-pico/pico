import {isString}   from "@use-pico/common";
import {
	type FC,
	type ReactNode
}                   from "react";
import {Icon}       from "../ui/Icon";
import {LocaleLink} from "./LocaleLink";

export namespace LinkTo {
	export interface Props extends Omit<LocaleLink.Props, "children"> {
		icon?: string | Partial<Icon.Props> & Pick<Icon.Props, "icon">;
		label?: ReactNode;
	}
}

/**
 * Wrapped LocaleLink with styles.
 */
export const LinkTo: FC<LinkTo.Props> = (
	{
		icon,
		label,
		cx = [],
		...props
	}
) => {
	return <LocaleLink
		cx={[
			"flex items-center gap-2",
			"text-blue-400 hover:text-blue-700",
			...cx,
		]}
		{...props}
	>
		{icon && <Icon
			size={"xl"}
			{...(isString(icon) ? {icon} : icon)}
		/>}
		{label}
	</LocaleLink>;
};
