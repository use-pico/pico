import {AlertIcon}        from "../icon/AlertIcon";
import {withNotification} from "../utils/withNotification";

export namespace useErrorNotification {
    export interface Props extends withNotification.Props {
    }
}

export const useErrorNotification = () => {
    return (
        props: useErrorNotification.Props
    ) => {
        withNotification({
            icon:  <AlertIcon color={"black"} size={"1.1rem"}/>,
            color: "red",
            ...props,
        });
    };
};
