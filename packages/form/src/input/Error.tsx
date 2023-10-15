import {Text} from "@use-pico/ui";
import {
    type ComponentProps,
    type FC
}             from "react";

export namespace Error {
    export interface Props extends ComponentProps<typeof Text> {
        error?: string;
    }
}

export const Error: FC<Error.Props> = (
    {
        error,
        ...props
    }
) => {
    return error ? <Text c={"red"} size={"sm"} {...props}>{error}</Text> : null;
};
