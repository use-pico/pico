import {type MutableRefObject} from "react";

const WITH_TIMEOUT_TIMEOUT = 0;

/**
 * Sets a timeout for a callback using ref.
 *
 * @group toolbox
 */
export namespace withTimeout {
    /**
     * Props for withTimeout function.
     */
    export interface Props {
        /**
         * Callback to execute after a timeout.
         */
        callback(): any;

        /**
         * Reference to a timer.
         */
        timerRef: MutableRefObject<NodeJS.Timeout | undefined>;
        /**
         * How long to postpone a timeout.
         */
        timeout?: number;
    }
}

export const withTimeout = (
    {
        callback,
        timerRef,
        timeout = WITH_TIMEOUT_TIMEOUT,
    }: withTimeout.Props
) => {
    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(callback, timeout);
};
