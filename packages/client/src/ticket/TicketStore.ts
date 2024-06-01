import {createStore} from "../store/createStore";
import type {IStore} from "../store/IStore";

/**
 * Provides store for user's ticket.
 *
 * @see {@link TicketProvider}
 *
 * @group auth
 */
export namespace TicketStore {
    /**
     * Shape of the ticket store.
     */
    export type Store = IStore<{
        /**
         * Returns user ID, if not present throws an error.
         */
        requiredId(): string;
        /**
         * Returns true if user ID is present.
         */
        hasId(): boolean;
    }, {
        /**
         * User ID
         */
        id?: string;
        /**
         * User's tokens
         */
        tokens?: string[];
    }>;
}

export const TicketStore = createStore<TicketStore.Store>({
    name:    "UserStore",
    factory: values => (_, get) => ({
        requiredId() {
            const id = get().id;
            if (!id) {
                throw new Error("UserStore: id is required");
            }
            return id;
        },
        hasId() {
            return !!get().id;
        },
        ...values,
    }),
});
