import {
    type NotificationData,
    notifications
}                       from "@mantine/notifications";
import {IconCheck}      from "@tabler/icons-react";
import {
    type IWithTranslation,
    Translation
}                       from "@use-pico/i18n";
import {type ReactNode} from "react";

export namespace withNotification {
    export interface Props extends Omit<NotificationData, "title" | "message"> {
        withTranslation?: IWithTranslation;
        title?: ReactNode;
        message?: ReactNode;
    }
}

export const withNotification = (
    {
        withTranslation,
        ...props
    }: withNotification.Props) => {
    notifications.show({
        title:   <Translation {...withTranslation} withLabel={"title"}/>,
        message: <Translation {...withTranslation} withLabel={"message"}/>,
        icon:    <IconCheck size={"1.1rem"}/>,
        color:   "teal",
        ...props,
    });
};
