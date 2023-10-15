"use client";

import {
    LoopsStore,
    LoopStore
} from "@use-pico/ui";
import {
    useEffect,
    useRef
} from "react";

export namespace useLoop {
    export interface Props {
        total: number;
        /**
         * Number of ms to throttle the loop; using setTimeout at the end.
         */
        throttle?: number;

        onStart?(props: OnStartProps): Promise<void>;

        onTick(props: OnTickProps): Promise<void>;

        onError?(e: unknown): void;

        onFinish?(props: OnFinishProps): Promise<void>;
    }

    export interface OnStartProps {
        total: number;
    }

    export interface OnTickProps {
        current: number;
        total: number;
        percent: number;
    }

    export interface OnFinishProps {
    }
}

/**
 * Cool hook used to execute loop in renders to do something (for example file upload in chunks), so
 * the component stays responsive but one can still do the job.
 */
export const useLoop = (
    {
        total,
        throttle = 0,
        onStart = () => Promise.resolve(),
        onTick,
        onError = () => Promise.resolve(),
        onFinish = () => Promise.resolve(),
    }: useLoop.Props
) => {
    const isMountedRef = useRef(false);
    const loop = LoopStore.use();
    const loops = LoopsStore.use$();

    useEffect(() => {
        if (isMountedRef.current || loop.isRunning) {
            return;
        }
        isMountedRef.current = true;
        loop.start(total);
        loops?.inc();
        (async () => {
            try {
                await onStart({total});
            } catch (e) {
                console.error(e);
            }
        })();
    }, []);

    useEffect(() => {
        if (!loop.isRunning) {
            return;
        }
        if (loop.current === total) {
            onFinish?.({})
                .then(() => loop.finish())
                .catch((e) => {
                    console.error(e);
                    loop.finish(true);
                    onError(e);
                })
                .finally(() => {
                    loops?.dec();
                });
            return;
        }
        setTimeout(() => {
            onTick({
                current: loop.current,
                total,
                percent: loop.percent(),
            })
                .then(() => loop.progress())
                .catch((e) => {
                    loops?.dec();
                    console.error(e);
                    loop.finish(true);
                    onError(e);
                });
        }, throttle);
    }, [
        loop.isRunning,
        loop.current
    ]);

    return loop;
};
