import {
    type FC,
    type ReactNode
}                   from "react";
import {LocaleLink} from "./LocaleLink";

export namespace LinkTo {
    export interface Props extends Omit<LocaleLink.Props, "children"> {
        label?: ReactNode;
    }
}

/**
 * Wrapped LocaleLink with styles.
 */
export const LinkTo: FC<LinkTo.Props> = (
    {
        label,
        cx = [],
        ...props
    }
) => {
    return <LocaleLink
        cx={[
            "text-blue-400 hover:text-blue-700",
            ...cx,
        ]}
        {...props}
    >
        {label}
    </LocaleLink>;
};
