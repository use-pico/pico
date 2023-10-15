"use client";

import {useLoop} from "./useLoop";

export namespace useChunk {
    export interface Props
        extends Pick<
            useLoop.Props,
            "onStart" | "onFinish" | "onError" | "throttle"
        > {
        /**
         * Default chunk (page, whatever) size
         */
        chunk: number;
        /**
         * Total size of the chunked item
         */
        size: number;

        onTick(props: TickProps): Promise<void>;
    }

    export interface TickProps {
        current: number;
        total: number;
        start: number;
        end: number;
        size: number;
        percent: number;
    }
}

export const useChunk = (
    {
        size,
        throttle,
        chunk,
        onStart,
        onTick,
        onFinish,
        onError,
    }: useChunk.Props) => {
    return useLoop({
        total: Math.ceil(size / chunk),
        throttle,
        onStart,
        async onTick({
                         total,
                         current,
                         percent
                     }): Promise<void> {
            return onTick({
                start: current * chunk,
                end:   Math.min(current * chunk + chunk, size),
                total,
                current,
                size,
                percent,
            });
        },
        onFinish,
        onError,
    });
};
