import {Text}        from "@mantine/core";
import {Translation} from "@use-pico/i18n";
import {type FC}     from "react";

export namespace Label {
    export interface Props {
        withAsterisk?: boolean;
        label?: string;
    }
}

export const Label: FC<Label.Props> = (
    {
        withAsterisk,
        label
    }) => {
    return label ? <div>
        <Text
            size={"sm"}
            fw={"500"}
            span
        >
            <Translation withLabel={label}/>
        </Text>
        {withAsterisk && <Text
            ml={4}
            c={"red"}
            span
        >*</Text>}
    </div> : null;
};
