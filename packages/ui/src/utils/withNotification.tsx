import {
    type NotificationData,
    notifications
}                  from "@mantine/notifications";
import {IconCheck} from "@tabler/icons-react";

export namespace withNotification {
    export interface Props extends NotificationData {
    }
}

export const withNotification = (
    {
        ...props
    }: withNotification.Props
) => {
    notifications.show({
        icon:  <IconCheck size={"1.1rem"}/>,
        color: "teal",
        ...props,
    });
};
