import {type MutableRefObject} from "react";

export interface IUseTimeoutProps {
    callback: () => any;
    timerRef: MutableRefObject<NodeJS.Timeout | undefined>;
    /**
     * How long to postpone a timeout
     */
    timeout?: number;
}

export const withTimeout = (
    {
        callback,
        timerRef,
        timeout = 0,
    }: IUseTimeoutProps) => {
    timerRef.current && clearTimeout(timerRef.current);
    timerRef.current = setTimeout(callback, timeout);
};
