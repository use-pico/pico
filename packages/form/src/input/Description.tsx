import {Translation} from "@use-pico/i18n";
import {Text}        from "@use-pico/ui";
import {
    type FC,
    type ReactNode
}                    from "react";

export namespace Description {
    export interface Props {
        description?: ReactNode;
    }
}

export const Description: FC<Description.Props> = ({description}) => {
    return description ? <Text
        c={"dimmed"}
        size={"sm"}
    >
        <Translation withLabel={description}/>
    </Text> : null;
};
