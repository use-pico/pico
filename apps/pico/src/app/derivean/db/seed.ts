import { id } from "@use-pico/common";
import type { Kysely } from "kysely";
import type { Database } from "~/app/derivean/db/Database";

export const seed = async (kysely: Kysely<Database>) => {
	const ids = {
		building: {
			castle: id(),
			storage: id(),
			house: id(),
		},
		resource: {
			wood: id(),
			plank: id(),
			stone: id(),
			sand: id(),
			glass: id(),
			coal: id(),
			flour: id(),
			dressedStone: id(),
			gold: id(),
			silver: id(),
			coin: id(),
			storageBlueprint: id(),
			castleBlueprint: id(),
			houseBlueprint: id(),
		},
		tag: {
			material: id(),
			product: id(),
			food: id(),
			valuables: id(),
			blueprint: id(),
		},
	} as const;

	try {
		await kysely
			.insertInto("BaseBuilding")
			.values([
				{
					id: ids.building.castle,
					name: "Castle",
					cycles: 5,
				},
				{
					id: ids.building.storage,
					name: "Storage",
					cycles: 1,
				},
				{
					id: ids.building.house,
					name: "House",
					cycles: 1,
				},
			])
			.execute();
	} catch (_) {
		//
	}

	try {
		await kysely
			.insertInto("Tag")
			.values([
				{
					id: ids.tag.material,
					code: "material",
					label: "Material",
					sort: 0,
					group: "resource",
				},
				{
					id: ids.tag.valuables,
					code: "valuables",
					label: "Valuables",
					sort: 0,
					group: "resource",
				},
				{
					id: ids.tag.blueprint,
					code: "blueprint",
					label: "Blueprint",
					sort: 1,
					group: "resource",
				},
				{
					id: ids.tag.product,
					code: "product",
					label: "Product",
					sort: 1,
					group: "resource",
				},
			])
			.execute();
	} catch (_) {
		//
	}

	try {
		await kysely
			.insertInto("Resource")
			.values([
				{
					id: ids.resource.coal,
					name: "Coal",
				},
				{
					id: ids.resource.flour,
					name: "Flour",
				},
				{
					id: ids.resource.sand,
					name: "Sand",
				},
				{
					id: ids.resource.glass,
					name: "Glass",
				},
				{
					id: ids.resource.wood,
					name: "Wood",
				},
				{
					id: ids.resource.plank,
					name: "Plank",
				},
				{
					id: ids.resource.stone,
					name: "Stone",
				},
				{
					id: ids.resource.dressedStone,
					name: "Dressed Stone",
				},
				{
					id: ids.resource.silver,
					name: "Silver",
				},
				{
					id: ids.resource.gold,
					name: "Gold",
				},
				{
					id: ids.resource.coin,
					name: "Coin",
				},
				{
					id: ids.resource.storageBlueprint,
					name: "Storage - Blueprint",
				},
				{
					id: ids.resource.castleBlueprint,
					name: "Castle - Blueprint",
				},
				{
					id: ids.resource.houseBlueprint,
					name: "House - Blueprint",
				},
			])
			.execute();
	} catch (_) {
		//
	}

	try {
		await kysely
			.insertInto("Resource_Tag")
			.values([
				{
					id: id(),
					resourceId: ids.resource.stone,
					tagId: ids.tag.material,
				},
				{
					id: id(),
					resourceId: ids.resource.flour,
					tagId: ids.tag.material,
				},
				{
					id: id(),
					resourceId: ids.resource.coal,
					tagId: ids.tag.material,
				},
				{
					id: id(),
					resourceId: ids.resource.sand,
					tagId: ids.tag.material,
				},
				{
					id: id(),
					resourceId: ids.resource.glass,
					tagId: ids.tag.product,
				},
				{
					id: id(),
					resourceId: ids.resource.plank,
					tagId: ids.tag.material,
				},
				{
					id: id(),
					resourceId: ids.resource.dressedStone,
					tagId: ids.tag.material,
				},
				{
					id: id(),
					resourceId: ids.resource.wood,
					tagId: ids.tag.material,
				},
				{
					id: id(),
					resourceId: ids.resource.storageBlueprint,
					tagId: ids.tag.blueprint,
				},
				{
					id: id(),
					resourceId: ids.resource.castleBlueprint,
					tagId: ids.tag.blueprint,
				},
				{
					id: id(),
					resourceId: ids.resource.houseBlueprint,
					tagId: ids.tag.blueprint,
				},
				{
					id: id(),
					resourceId: ids.resource.coin,
					tagId: ids.tag.valuables,
				},
				{
					id: id(),
					resourceId: ids.resource.gold,
					tagId: ids.tag.valuables,
				},
				{
					id: id(),
					resourceId: ids.resource.silver,
					tagId: ids.tag.valuables,
				},
			])
			.execute();
	} catch (_) {
		//
	}

	try {
		await kysely
			.insertInto("BaseBuilding_Requirement")
			.values([
				/**
				 * Storage
				 */
				{
					id: id(),
					baseBuildingId: ids.building.storage,
					resourceId: ids.resource.stone,
					passive: false,
					amount: 3,
				},
				{
					id: id(),
					baseBuildingId: ids.building.storage,
					resourceId: ids.resource.wood,
					passive: false,
					amount: 5,
				},
				{
					id: id(),
					baseBuildingId: ids.building.storage,
					resourceId: ids.resource.storageBlueprint,
					passive: false,
					amount: 1,
				},

				/**
				 * Castle
				 */
				{
					id: id(),
					baseBuildingId: ids.building.castle,
					resourceId: ids.resource.stone,
					passive: false,
					amount: 10,
				},
				{
					id: id(),
					baseBuildingId: ids.building.castle,
					resourceId: ids.resource.dressedStone,
					passive: false,
					amount: 25,
				},
				{
					id: id(),
					baseBuildingId: ids.building.castle,
					resourceId: ids.resource.wood,
					passive: false,
					amount: 25,
				},
				{
					id: id(),
					baseBuildingId: ids.building.castle,
					resourceId: ids.resource.plank,
					passive: false,
					amount: 50,
				},
				{
					id: id(),
					baseBuildingId: ids.building.castle,
					resourceId: ids.resource.coin,
					passive: false,
					amount: 2000,
				},
				{
					id: id(),
					baseBuildingId: ids.building.castle,
					resourceId: ids.resource.gold,
					passive: false,
					amount: 25,
				},
				{
					id: id(),
					baseBuildingId: ids.building.castle,
					resourceId: ids.resource.castleBlueprint,
					passive: false,
					amount: 1,
				},

				/**
				 * House
				 */
				{
					id: id(),
					baseBuildingId: ids.building.house,
					resourceId: ids.resource.stone,
					passive: false,
					amount: 5,
				},
				{
					id: id(),
					baseBuildingId: ids.building.house,
					resourceId: ids.resource.wood,
					passive: false,
					amount: 10,
				},
				{
					id: id(),
					baseBuildingId: ids.building.house,
					resourceId: ids.resource.houseBlueprint,
					passive: false,
					amount: 1,
				},
			])
			.execute();
	} catch (_) {
		//
	}

	try {
		await kysely
			.insertInto("BaseBuilding_Limit")
			.values([
				/**
				 * Storage
				 */
				{
					id: id(),
					baseBuildingId: ids.building.storage,
					resourceId: ids.resource.stone,
					limit: 100,
				},
				{
					id: id(),
					baseBuildingId: ids.building.storage,
					resourceId: ids.resource.wood,
					limit: 150,
				},

				/**
				 * Castle
				 */
				{
					id: id(),
					baseBuildingId: ids.building.castle,
					resourceId: ids.resource.stone,
					limit: 25,
				},
				{
					id: id(),
					baseBuildingId: ids.building.castle,
					resourceId: ids.resource.wood,
					limit: 50,
				},
			])
			.execute();
	} catch (_) {
		//
	}

	try {
		await kysely
			.insertInto("BaseBuildingProduction")
			.values([
				/**
				 * Storage
				 */
				{
					id: id(),
					baseBuildingId: ids.building.house,
					resourceId: ids.resource.coin,
					amount: 3,
					cycles: 1,
				},
			])
			.execute();
	} catch (_) {
		//
	}
};
