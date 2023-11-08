import {Text} from "@mantine/core";
import {
    type FC,
    ReactNode
}             from "react";

export namespace Label {
    export interface Props {
        label?: ReactNode;
        withAsterisk?: boolean;
    }
}

export const Label: FC<Label.Props> = (
    {
        label,
        withAsterisk,
    }) => {
    return label ? <div>
        <Text
            size={"sm"}
            fw={"500"}
            span
        >
            {label}
        </Text>
        {withAsterisk && <Text
            ml={4}
            c={"red"}
            span
        >*</Text>}
    </div> : null;
};
