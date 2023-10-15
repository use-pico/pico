import {IconAlertTriangle} from "@tabler/icons-react";
import {
    type IWithTranslation,
    Translation
}                          from "@use-pico/i18n";
import {type FC}           from "react";
import {Overlay}           from "./Overlay";
import {Stack}             from "./Stack";

export interface IErrorOverlayProps {
    withTranslation: IWithTranslation;
}

export const ErrorOverlay: FC<IErrorOverlayProps> = (
    {
        withTranslation
    }) => {
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
            <Translation {...withTranslation}/>
        </Stack>
    </Overlay>;
};
