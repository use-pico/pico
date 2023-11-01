"use client";

import {type FileSchema} from "@use-pico/file";
import {
    type IHrefProps,
    linkTo
}                        from "@use-pico/navigation";
import {
    Button,
    DownloadIcon,
    Progress,
    Stack
}                        from "@use-pico/ui";
import JsFileDownloader  from "js-file-downloader";
import {
    type FC,
    useRef,
    useState
}                        from "react";

export namespace DownloadButton {
    export interface Props extends Button.Props {
        file: FileSchema.Type;

        withName?(file: FileSchema.Type): string,

        urlOf(file: FileSchema.Type): IHrefProps;
    }
}

export const DownloadButton: FC<DownloadButton.Props> = (
    {
        file,
        urlOf,
        withName = file => file.name,
        children,
        ...props
    }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [progress, setProgress] = useState(-1);
    const {current: downloadRef} = useRef(new JsFileDownloader({
        url:          linkTo(urlOf(file)),
        nameCallback: () => withName(file),
        autoStart:    false,
        process:      event => {
            if (!event.lengthComputable) {
                return;
            }
            setProgress(Math.floor(event.loaded / event.total * 100));
        },
    }));
    return <Button
        variant={"subtle"}
        leftSection={<DownloadIcon/>}
        loading={isLoading}
        onClick={() => {
            setIsLoading(true);
            downloadRef
                .start()
                .finally(() => {
                    setIsLoading(false);
                });
        }}
        {...props}
    >
        <Stack>
            {children}
            {isLoading && progress >= 0 && <Progress
                value={progress}
            />}
        </Stack>
    </Button>;
};
