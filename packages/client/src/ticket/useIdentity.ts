import { TicketStore } from "./TicketStore";

/**
 * Returns user's ID. If not present throws an error.
 *
 * @group hooks
 */
export const useIdentity = () => {
	return TicketStore.useSelector(({ requiredId }) => ({
		requiredId,
	})).requiredId();
};
