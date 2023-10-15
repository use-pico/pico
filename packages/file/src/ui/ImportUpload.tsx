"use client";

import {
    type IWithTranslation,
    WithTranslationProvider
}                      from "@pico/i18n";
import {LoopsProvider} from "@pico/ui";
import {type FC}       from "react";
import {DropZone}      from "./DropZone";

export namespace ImportUpload {
    export interface Props extends Omit<DropZone.Props, "path"> {
        withTranslation?: IWithTranslation;
    }
}

export const ImportUpload: FC<ImportUpload.Props> = (
    {
        withTranslation,
        ...props
    }) => {
    return <WithTranslationProvider
        withTranslation={withTranslation}
    >
        <LoopsProvider>
            <DropZone
                accept={[
                    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
                    "application/x-excel",
                    "application/vnd.ms-excel",
                ]}
                path={"/import"}
                {...props}
            />
        </LoopsProvider>
    </WithTranslationProvider>;
};
