"use client";

import {
    useChunk,
    useLoop
}                         from "@use-pico/hook";
import {
    type IHrefProps,
    linkTo
}                         from "@use-pico/navigation";
import axios              from "axios";
import {useRef}           from "react";
import {v4}               from "uuid";
import {type FileEx}      from "../api/FileEx";
import {FileCommitSchema} from "../schema/FileCommitSchema";
import {FileSchema}       from "../schema/FileSchema";

const defaultChunkSize = 1048576 * 4;

export namespace useUpload {
    export interface Props
        extends Pick<useChunk.Props, "onStart" | "onError"> {
        chunkHref?: IHrefProps;
        commitHref?: IHrefProps;
        file: FileEx;
        path: string;
        replace?: boolean;

        onFinish?(props: useLoop.OnFinishProps & {
            file: FileSchema.Type;
        }): Promise<void>;
    }
}

export const useUpload = (
    {
        file,
        path,
        chunkHref = {href: "/api/file/chunk/{chunkId}/upload"},
        commitHref = {href: "/api/file/chunk/{chunkId}/commit"},
        onStart,
        onFinish,
        onError,
        replace = true,
    }: useUpload.Props
) => {
    const uuid = useRef(v4());
    return useChunk({
        chunk:    defaultChunkSize,
        throttle: 0,
        size:     file.size,
        async onTick({
                         start,
                         end
                     }) {
            return axios.post(
                linkTo({
                    ...chunkHref,
                    query: {chunkId: uuid.current}
                }),
                file.slice(start, end),
                {
                    headers: {
                        "Content-Type": "application/octet-stream",
                    },
                }
            );
        },
        onStart,
        onFinish: async props => {
            return axios
                .post<
                    unknown,
                    {
                        data: FileSchema.Type
                    },
                    FileCommitSchema.Type
                >(
                    linkTo({
                        ...commitHref,
                        query: {chunkId: uuid.current}
                    }),
                    {
                        name:    file.name,
                        path,
                        mime:    file.type,
                        chunkId: uuid.current,
                        replace,
                    }
                )
                .then(({data}) => onFinish?.({
                    ...props,
                    file: data
                }));
        },
        onError,
    });
};
