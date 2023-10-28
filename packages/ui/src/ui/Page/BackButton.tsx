import {ActionIcon}            from "@mantine/core";
import {IconArrowLeft}         from "@tabler/icons-react";
import {useWithLocaleRedirect} from "@use-pico/i18n";
import {type FC}               from "react";

export namespace BackButton {
    export interface Props {
        /**
         * When provided, renders back button with redirect callback
         */
        onBack(redirect: useWithLocaleRedirect.Redirect): void;
    }
}

export const BackButton: FC<BackButton.Props> = (
    {
        onBack,
    }
) => {
    const redirect = useWithLocaleRedirect();

    return <ActionIcon
        variant={"subtle"}
        onClick={() => onBack(redirect)}
    >
        <IconArrowLeft/>
    </ActionIcon>;
};
