import {IconCheck}        from "@tabler/icons-react";
import {withNotification} from "../utils/withNotification";

export namespace useSuccessNotification {
    export interface Props extends withNotification.Props {
    }
}

export const useSuccessNotification = () => {
    return (
        props: useSuccessNotification.Props
    ) => {
        withNotification({
            icon:  <IconCheck size={"1.1rem"}/>,
            color: "teal",
            ...props,
        });
    };
};
