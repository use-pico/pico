import {IconAlertTriangle} from "@tabler/icons-react";
import {
    type FC,
    type PropsWithChildren
}                          from "react";
import {Overlay}           from "./Overlay";
import {Stack}             from "./Stack";

export namespace ErrorOverlay {
    export type Props = PropsWithChildren;
}

export const ErrorOverlay: FC<ErrorOverlay.Props> = ({children}) => {
    return <Overlay
        opacity={0}
        center
    >
        <Stack
            align={"center"}
        >
            <IconAlertTriangle
                color={"red"}
                size={64}
            />
            {children}
        </Stack>
    </Overlay>;
};
