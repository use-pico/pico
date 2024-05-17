import {type FC} from "react";
import {Button}  from "./Button";

export namespace Action {
    export interface Props extends Button.Props {
        icon: {
            enabled: string;
            disabled?: string;
            loading?: string;
        };
    }
}

export const Action: FC<Action.Props> = (
    {
        icon,
        cx,
        ...props
    }
) => {
    return <Button
        icon={icon}
        cx={[
            "bg-inherit hover:bg-slate-100",
            "text-slate-600",
            "text-2xl",
            "p-1",
            cx,
        ]}
        {...props}
    />;
};
