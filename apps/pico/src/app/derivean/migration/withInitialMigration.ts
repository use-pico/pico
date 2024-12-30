import Dexie from "dexie";

export const withInitialMigration = async () => {
	const dexie = new Dexie("derivean");

	dexie.version(1).stores({
		Inventory: "id, name&",
		Slot: "id, [kind+name]&",
		InventorySlot: "id, inventoryId, slotId",
		Item: "id, name",
		User: "id, login&",
	});

	/**
	 * Force table & index creation.
	 */
	await dexie.open();
	dexie.close();
};
