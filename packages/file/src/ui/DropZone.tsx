"use client";

import {
    Divider,
    Group,
    Table,
    Text
}                                 from "@mantine/core";
import {Dropzone as CoolDropzone} from "@mantine/dropzone";
import {notifications}            from "@mantine/notifications";
import {
    FileSchema,
    type IFileWithPath
}                                 from "@pico/file";
import {
    Translation,
    useTranslation
}                                 from "@pico/i18n";
import {
    LoopProvider,
    LoopsStore
}                                 from "@pico/ui";
import {
    IconCheck,
    IconUpload,
    IconX
}                                 from "@tabler/icons-react";
import {
    type ComponentProps,
    type FC,
    useEffect,
    useState
}                                 from "react";
import {Upload}                   from "./Upload";

export module DropZone {
    export interface Props extends Partial<
        Omit<ComponentProps<typeof CoolDropzone>, "onDrop">
    > {
        path: string;
        /**
         * Limit the number of uploaded files
         */
        limit?: number;
        replace?: boolean;

        onDrop?(files: IFileWithPath[], commit: () => void): void;

        onUpload?(file: FileSchema.Type): void;
    }
}

/**
 * Uploader component based on @pico/file Upload. Separation is because of this library
 * directly using Mantine, an Upload component is basically standalone.
 */
export const DropZone: FC<DropZone.Props> = (
    {
        path,
        limit = 5,
        onDrop = () => null,
        onUpload,
        replace = true,
        children,
        ...props
    }) => {
    const t = useTranslation();
    const [files, setFiles] = useState<IFileWithPath[]>([]);
    const {loops} = LoopsStore.use(({current: loops}) => ({loops}));

    useEffect(() => {
        if (files.length > 0 && !loops) {
            setTimeout(() => {
                notifications.show({
                    icon:    <IconCheck size={"1.1rem"}/>,
                    color:   "teal",
                    title:   t("dropzone.upload.success.title"),
                    message: t("dropzone.upload.success.message"),
                });
                setFiles([]);
            }, 750);
        }
    }, [loops]);

    return <>
        {!files.length && <>
            <CoolDropzone
                maxSize={8 * 1024 ** 2}
                onDrop={(files) => {
                    setFiles(files.slice(0, limit));
                    onDrop?.(files, () => {
                        // nope
                    });
                }}
                {...props}
            >
                <Group
                    justify={"center"}
                    gap={"xl"}
                    style={{
                        minHeight:     220,
                        pointerEvents: "none"
                    }}
                >
                    <CoolDropzone.Accept>
                        <IconUpload
                            size={50}
                            stroke={"1.5"}
                            color={"green.5"}
                        />
                    </CoolDropzone.Accept>
                    <CoolDropzone.Reject>
                        <IconX
                            size={50}
                            stroke={"1.5"}
                            color={"red.6"}
                        />
                    </CoolDropzone.Reject>
                    <CoolDropzone.Idle>
                        <IconUpload
                            size={50}
                            stroke={"1.5"}
                            color={"gray.6"}
                        />
                    </CoolDropzone.Idle>
                    <div>
                        <Text size={"xl"} inline>
                            <Translation label={"upload"} withLabel={"label"}/>
                        </Text>
                        <Text
                            size={"sm"}
                            c={"dimmed"}
                            inline
                            mt={7}
                        >
                            <Translation
                                label={"upload"}
                                withLabel={"hint"}
                            />
                        </Text>
                    </div>
                </Group>
            </CoolDropzone>
            {children}
        </>}
        {files.length > 0 && (
            <>
                <Divider m={"md"}/>
                <Table
                    fs={"xs"}
                    highlightOnHover
                    striped
                >
                    <Table.Thead>
                        <Table.Tr>
                            <Table.Th style={{width: "420px"}}>
                                <Translation
                                    label={"upload"}
                                    withLabel={"file"}
                                />
                            </Table.Th>
                            <Table.Th>
                                <Translation
                                    label={"upload"}
                                    withLabel={"progress"}
                                />
                            </Table.Th>
                        </Table.Tr>
                    </Table.Thead>
                    <Table.Tbody>
                        {files.map((file) => (
                            <LoopProvider
                                key={file.path}
                            >
                                <Table.Tr>
                                    <Table.Td>{file.path}</Table.Td>
                                    <Table.Td>
                                        <Upload
                                            upload={{
                                                file,
                                                path,
                                                onFinish: async ({file}) => onUpload?.(file),
                                                replace,
                                            }}
                                        />
                                    </Table.Td>
                                </Table.Tr>
                            </LoopProvider>
                        ))}
                    </Table.Tbody>
                </Table>
            </>
        )}
    </>;
};
