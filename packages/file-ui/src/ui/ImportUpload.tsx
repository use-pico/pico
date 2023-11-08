"use client";

import {LoopsProvider} from "@use-pico/ui";
import {type FC}       from "react";
import {DropZone}      from "./DropZone";

export namespace ImportUpload {
    export interface Props extends Omit<DropZone.Props, "path"> {
    }
}

export const ImportUpload: FC<ImportUpload.Props> = (
    {
        ...props
    }) => {
    return <LoopsProvider>
        <DropZone
            accept={[
                "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
                "application/x-excel",
                "application/vnd.ms-excel",
            ]}
            path={"/import"}
            {...props}
        />
    </LoopsProvider>;
};
