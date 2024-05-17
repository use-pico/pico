import {type MutableRefObject} from "react";

export namespace withTimeout {
    export interface Props {
        callback: () => any;
        timerRef: MutableRefObject<NodeJS.Timeout | undefined>;
        /**
         * How long to postpone a timeout
         */
        timeout?: number;
    }
}

export const withTimeout = (
    {
        callback,
        timerRef,
        timeout = 0,
    }: withTimeout.Props
) => {
    timerRef.current && clearTimeout(timerRef.current);
    timerRef.current = setTimeout(callback, timeout);
};
