import {isString}   from "@use-pico/common";
import {
    type FC,
    type ReactNode
}                   from "react";
import {Icon}       from "../ui/Icon";
import {LocaleLink} from "./LocaleLink";

/**
 * Wrapped {@link LocaleLink} with styles.
 *
 * @group ui
 */
export namespace LinkTo {
    /**
     * Props for `LinkTo` component.
     */
	export interface Props extends Omit<LocaleLink.Props, "children"> {
        /**
         * Icon or icon props ({@link Icon.Props}.
         */
		icon?: string | Partial<Icon.Props> & Pick<Icon.Props, "icon">;
        /**
         * Label to display.
         */
		label?: ReactNode;
	}
}

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
