"use client";

import {Progress}  from "@mantine/core";
import {useUpload} from "@pico/file";
import {type FC}   from "react";

export namespace Upload {
    export interface Props {
        /**
         * Upload is an object because it does not mess up all the props in this component.
         */
        upload: useUpload.Props;
    }
}

/**
 * This component executes upload just as it's got rendered.
 */
export const Upload: FC<Upload.Props> = ({upload}) => {
    const {
        isRunning,
        isSuccess,
        isError,
        percent,
    } = useUpload(upload);
    return <Progress
        color={
            isError
                ? "red"
                : isRunning
                    ? "blue"
                    : isSuccess
                        ? "green"
                        : undefined
        }
        radius={"md"}
        size={"md"}
        value={percent()}
        animated={isRunning}
    />;
};
