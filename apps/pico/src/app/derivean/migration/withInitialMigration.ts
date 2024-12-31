import Dexie from "dexie";

export const withInitialMigration = async () => {
	const dexie = new Dexie("derivean");

	dexie.version(1).stores({
		User: "id, login&",
		Resource: "id, name",

		BaseBuilding: "id, name&",
		Building: "id, baseBuildingId, userId",
		BuildingRequirementResource: "id, buildingId, resourceId",

		Inventory: "id, name&",
		Slot: "id, [kind+name]&",
		InventorySlot: "id, inventoryId, slotId",
		Item: "id, name",
	});

	/**
	 * Force table & index creation.
	 */
	await dexie.open();
	dexie.close();
};
