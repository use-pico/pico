import {type QueryClient} from "@tanstack/react-query";

export namespace IInvalidator {
    /**
     * Actual invalidator implementation (low level).
     */
    export type Invalidator = (props: InvalidatorProps) => Promise<void>;
    /**
     * Invalidator hook type.
     */
    export type Use = () => UseInvalidator;
    /**
     * Invalidator type in user-land.
     */
    export type UseInvalidator = () => Promise<void>;

    export interface InvalidatorProps {
        queryClient: QueryClient;
    }
}
