import { createSyncStoragePersister } from "@tanstack/query-sync-storage-persister";

const noop = {
	getItem: () => null,
	setItem: () => null,
	removeItem: () => null,
} as const;

export const createPersister = (enabled = false) => {
	return createSyncStoragePersister({
		storage: enabled ? window.sessionStorage : noop,
	});
};
