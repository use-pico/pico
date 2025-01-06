import { id } from "@use-pico/common";
import type { Kysely } from "kysely";
import type { Database } from "~/app/derivean/db/Database";

export const seed = async (kysely: Kysely<Database>) => {
	const seed = {
		building: {
			forester: {
				id: id(),
				blueprint: {
					id: id(),
				},
				production: {
					blueprint: {
						sawmill: {
							id: id(),
						},
						house: {
							id: id(),
						},
					},
				},
			},
			sawmill: {
				id: id(),
				blueprint: {
					id: id(),
				},
				production: {
					plank: {
						id: id(),
					},
				},
			},
			quarry: {
				id: id(),
				blueprint: {
					id: id(),
				},
				production: {
					dressedStone: {
						id: id(),
					},
				},
			},
			coalMine: {
				id: id(),
				blueprint: {
					id: id(),
				},
			},
			goldMine: {
				id: id(),
				blueprint: {
					id: id(),
				},
			},
			goldSmith: {
				id: id(),
				blueprint: {
					id: id(),
				},
				production: {
					gold: {
						id: id(),
					},
					coin: {
						id: id(),
					},
				},
			},
			castle: {
				id: id(),
				blueprint: {
					id: id(),
				},
			},
			storage: {
				id: id(),
				blueprint: {
					id: id(),
				},
			},
			house: {
				id: id(),
				blueprint: {
					id: id(),
				},
			},
			university: {
				id: id(),
				blueprint: {
					id: id(),
				},
			},
		},
		resource: {
			wood: {
				id: id(),
			},
			plank: {
				id: id(),
			},
			stone: {
				id: id(),
			},
			sand: {
				id: id(),
			},
			glass: {
				id: id(),
			},
			coal: {
				id: id(),
			},
			flour: {
				id: id(),
			},
			dressedStone: {
				id: id(),
			},
			rawGold: {
				id: id(),
			},
			gold: {
				id: id(),
			},
			silver: {
				id: id(),
			},
			coin: {
				id: id(),
			},
		},
		tag: {
			material: {
				id: id(),
			},
			product: {
				id: id(),
			},
			food: {
				id: id(),
			},
			valuables: {
				id: id(),
			},
			blueprint: {
				id: id(),
			},
			building: {
				id: id(),
			},
		},
	} as const;

	try {
		await kysely
			.insertInto("BaseBuilding")
			.values([
				{
					id: seed.building.castle.id,
					name: "Castle",
					cycles: 30,
				},
				{
					id: seed.building.forester.id,
					name: "Forester",
					cycles: 3,
				},
				{
					id: seed.building.quarry.id,
					name: "Quarry",
					cycles: 3,
				},
				{
					id: seed.building.sawmill.id,
					name: "Sawmill",
					cycles: 10,
				},
				{
					id: seed.building.storage.id,
					name: "Storage",
					cycles: 5,
				},
				{
					id: seed.building.house.id,
					name: "House",
					cycles: 1,
				},
				{
					id: seed.building.university.id,
					name: "University",
					cycles: 75,
				},
				{
					id: seed.building.coalMine.id,
					name: "Coal mine",
					cycles: 15,
				},
				{
					id: seed.building.goldMine.id,
					name: "Gold mine",
					cycles: 35,
				},
				{
					id: seed.building.goldSmith.id,
					name: "Goldsmith",
					cycles: 50,
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
					id: seed.tag.material.id,
					code: "material",
					label: "Material",
					sort: 0,
					group: "resource",
				},
				{
					id: seed.tag.valuables.id,
					code: "valuables",
					label: "Valuables",
					sort: 0,
					group: "resource",
				},
				{
					id: seed.tag.blueprint.id,
					code: "blueprint",
					label: "Blueprint",
					sort: 1,
					group: "resource",
				},
				{
					id: seed.tag.product.id,
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
					id: seed.resource.coal.id,
					name: "Coal",
				},
				{
					id: seed.resource.flour.id,
					name: "Flour",
				},
				{
					id: seed.resource.sand.id,
					name: "Sand",
				},
				{
					id: seed.resource.glass.id,
					name: "Glass",
				},
				{
					id: seed.resource.wood.id,
					name: "Wood",
				},
				{
					id: seed.resource.plank.id,
					name: "Plank",
				},
				{
					id: seed.resource.stone.id,
					name: "Stone",
				},
				{
					id: seed.resource.dressedStone.id,
					name: "Dressed Stone",
				},
				{
					id: seed.resource.silver.id,
					name: "Silver",
				},
				{
					id: seed.resource.rawGold.id,
					name: "Raw gold",
				},
				{
					id: seed.resource.gold.id,
					name: "Gold",
				},
				{
					id: seed.resource.coin.id,
					name: "Coin",
				},
				{
					id: seed.building.storage.blueprint.id,
					name: "Storage - Blueprint",
				},
				{
					id: seed.building.castle.blueprint.id,
					name: "Castle - Blueprint",
				},
				{
					id: seed.building.house.blueprint.id,
					name: "House - Blueprint",
				},
				{
					id: seed.building.university.blueprint.id,
					name: "University - Blueprint",
				},
				{
					id: seed.building.quarry.blueprint.id,
					name: "Quarry - Blueprint",
				},
				{
					id: seed.building.forester.blueprint.id,
					name: "Forester - Blueprint",
				},
				{
					id: seed.building.sawmill.blueprint.id,
					name: "Sawmill - Blueprint",
				},
				{
					id: seed.building.coalMine.blueprint.id,
					name: "Coal mine - Blueprint",
				},
				{
					id: seed.building.goldMine.blueprint.id,
					name: "Gold mine - Blueprint",
				},
				{
					id: seed.building.goldSmith.blueprint.id,
					name: "Goldsmith - Blueprint",
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
					resourceId: seed.resource.stone.id,
					tagId: seed.tag.material.id,
				},
				{
					id: id(),
					resourceId: seed.resource.flour.id,
					tagId: seed.tag.material.id,
				},
				{
					id: id(),
					resourceId: seed.resource.coal.id,
					tagId: seed.tag.material.id,
				},
				{
					id: id(),
					resourceId: seed.resource.sand.id,
					tagId: seed.tag.material.id,
				},
				{
					id: id(),
					resourceId: seed.resource.glass.id,
					tagId: seed.tag.product.id,
				},
				{
					id: id(),
					resourceId: seed.resource.plank.id,
					tagId: seed.tag.material.id,
				},
				{
					id: id(),
					resourceId: seed.resource.rawGold.id,
					tagId: seed.tag.material.id,
				},
				{
					id: id(),
					resourceId: seed.resource.dressedStone.id,
					tagId: seed.tag.material.id,
				},
				{
					id: id(),
					resourceId: seed.resource.wood.id,
					tagId: seed.tag.material.id,
				},
				{
					id: id(),
					resourceId: seed.building.storage.blueprint.id,
					tagId: seed.tag.blueprint.id,
				},
				{
					id: id(),
					resourceId: seed.building.castle.blueprint.id,
					tagId: seed.tag.blueprint.id,
				},
				{
					id: id(),
					resourceId: seed.building.house.blueprint.id,
					tagId: seed.tag.blueprint.id,
				},
				{
					id: id(),
					resourceId: seed.building.university.blueprint.id,
					tagId: seed.tag.blueprint.id,
				},
				{
					id: id(),
					resourceId: seed.building.quarry.blueprint.id,
					tagId: seed.tag.blueprint.id,
				},
				{
					id: id(),
					resourceId: seed.building.coalMine.blueprint.id,
					tagId: seed.tag.blueprint.id,
				},
				{
					id: id(),
					resourceId: seed.building.goldMine.blueprint.id,
					tagId: seed.tag.blueprint.id,
				},
				{
					id: id(),
					resourceId: seed.building.goldSmith.blueprint.id,
					tagId: seed.tag.blueprint.id,
				},
				{
					id: id(),
					resourceId: seed.building.sawmill.blueprint.id,
					tagId: seed.tag.blueprint.id,
				},
				{
					id: id(),
					resourceId: seed.building.forester.blueprint.id,
					tagId: seed.tag.blueprint.id,
				},
				{
					id: id(),
					resourceId: seed.resource.coin.id,
					tagId: seed.tag.valuables.id,
				},
				{
					id: id(),
					resourceId: seed.resource.gold.id,
					tagId: seed.tag.valuables.id,
				},
				{
					id: id(),
					resourceId: seed.resource.silver.id,
					tagId: seed.tag.valuables.id,
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
					baseBuildingId: seed.building.storage.id,
					resourceId: seed.resource.stone.id,
					passive: false,
					amount: 3,
				},
				{
					id: id(),
					baseBuildingId: seed.building.storage.id,
					resourceId: seed.resource.wood.id,
					passive: false,
					amount: 5,
				},
				{
					id: id(),
					baseBuildingId: seed.building.storage.id,
					resourceId: seed.building.storage.blueprint.id,
					passive: false,
					amount: 1,
				},

				/**
				 * Castle
				 */
				{
					id: id(),
					baseBuildingId: seed.building.castle.id,
					resourceId: seed.resource.stone.id,
					passive: false,
					amount: 10,
				},
				{
					id: id(),
					baseBuildingId: seed.building.castle.id,
					resourceId: seed.resource.dressedStone.id,
					passive: false,
					amount: 25,
				},
				{
					id: id(),
					baseBuildingId: seed.building.castle.id,
					resourceId: seed.resource.wood.id,
					passive: false,
					amount: 25,
				},
				{
					id: id(),
					baseBuildingId: seed.building.castle.id,
					resourceId: seed.resource.plank.id,
					passive: false,
					amount: 50,
				},
				{
					id: id(),
					baseBuildingId: seed.building.castle.id,
					resourceId: seed.resource.coin.id,
					passive: false,
					amount: 2000,
				},
				{
					id: id(),
					baseBuildingId: seed.building.castle.id,
					resourceId: seed.resource.gold.id,
					passive: false,
					amount: 25,
				},
				{
					id: id(),
					baseBuildingId: seed.building.castle.id,
					resourceId: seed.building.castle.blueprint.id,
					passive: false,
					amount: 1,
				},

				/**
				 * House
				 */
				{
					id: id(),
					baseBuildingId: seed.building.house.id,
					resourceId: seed.resource.stone.id,
					passive: false,
					amount: 5,
				},
				{
					id: id(),
					baseBuildingId: seed.building.house.id,
					resourceId: seed.resource.wood.id,
					passive: false,
					amount: 10,
				},
				{
					id: id(),
					baseBuildingId: seed.building.house.id,
					resourceId: seed.building.house.blueprint.id,
					passive: false,
					amount: 1,
				},

				/**
				 * University
				 */
				{
					id: id(),
					baseBuildingId: seed.building.university.id,
					resourceId: seed.resource.stone.id,
					passive: false,
					amount: 100,
				},
				{
					id: id(),
					baseBuildingId: seed.building.university.id,
					resourceId: seed.resource.dressedStone.id,
					passive: false,
					amount: 75,
				},
				{
					id: id(),
					baseBuildingId: seed.building.university.id,
					resourceId: seed.resource.wood.id,
					passive: false,
					amount: 250,
				},
				{
					id: id(),
					baseBuildingId: seed.building.university.id,
					resourceId: seed.resource.plank.id,
					passive: false,
					amount: 150,
				},
				{
					id: id(),
					baseBuildingId: seed.building.university.id,
					resourceId: seed.building.university.blueprint.id,
					passive: false,
					amount: 3,
				},
				{
					id: id(),
					baseBuildingId: seed.building.university.id,
					resourceId: seed.resource.coin.id,
					passive: false,
					amount: 2000,
				},
				{
					id: id(),
					baseBuildingId: seed.building.university.id,
					resourceId: seed.resource.glass.id,
					passive: false,
					amount: 30,
				},

				/**
				 * Sawmill
				 */
				{
					id: id(),
					baseBuildingId: seed.building.sawmill.id,
					resourceId: seed.resource.wood.id,
					passive: false,
					amount: 10,
				},
				{
					id: id(),
					baseBuildingId: seed.building.sawmill.id,
					resourceId: seed.resource.stone.id,
					passive: false,
					amount: 15,
				},
				{
					id: id(),
					baseBuildingId: seed.building.sawmill.id,
					resourceId: seed.building.sawmill.blueprint.id,
					passive: false,
					amount: 1,
				},

				/**
				 * Forester
				 */
				{
					id: id(),
					baseBuildingId: seed.building.forester.id,
					resourceId: seed.resource.wood.id,
					passive: false,
					amount: 5,
				},
				{
					id: id(),
					baseBuildingId: seed.building.forester.id,
					resourceId: seed.resource.stone.id,
					passive: false,
					amount: 2,
				},
				{
					id: id(),
					baseBuildingId: seed.building.forester.id,
					resourceId: seed.building.forester.blueprint.id,
					passive: false,
					amount: 1,
				},

				/**
				 * Quarry
				 */
				{
					id: id(),
					baseBuildingId: seed.building.quarry.id,
					resourceId: seed.resource.wood.id,
					passive: false,
					amount: 10,
				},
				{
					id: id(),
					baseBuildingId: seed.building.quarry.id,
					resourceId: seed.resource.stone.id,
					passive: false,
					amount: 15,
				},
				{
					id: id(),
					baseBuildingId: seed.building.quarry.id,
					resourceId: seed.building.quarry.blueprint.id,
					passive: false,
					amount: 1,
				},

				/**
				 * Coal mine
				 */
				{
					id: id(),
					baseBuildingId: seed.building.coalMine.id,
					resourceId: seed.building.coalMine.blueprint.id,
					passive: false,
					amount: 1,
				},

				/**
				 * Gold mine
				 */
				{
					id: id(),
					baseBuildingId: seed.building.goldMine.id,
					resourceId: seed.building.goldMine.blueprint.id,
					passive: false,
					amount: 1,
				},

				/**
				 * Gold smith
				 */
				{
					id: id(),
					baseBuildingId: seed.building.goldSmith.id,
					resourceId: seed.building.goldSmith.blueprint.id,
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
					baseBuildingId: seed.building.storage.id,
					resourceId: seed.resource.stone.id,
					limit: 100,
				},
				{
					id: id(),
					baseBuildingId: seed.building.storage.id,
					resourceId: seed.resource.wood.id,
					limit: 150,
				},

				/**
				 * Castle
				 */
				{
					id: id(),
					baseBuildingId: seed.building.castle.id,
					resourceId: seed.resource.stone.id,
					limit: 25,
				},
				{
					id: id(),
					baseBuildingId: seed.building.castle.id,
					resourceId: seed.resource.wood.id,
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
				 * House
				 */
				{
					id: id(),
					baseBuildingId: seed.building.house.id,
					resourceId: seed.resource.coin.id,
					amount: 5,
					cycles: 1,
					limit: 1,
				},

				/**
				 * Sawmill
				 */
				{
					id: seed.building.sawmill.production.plank.id,
					baseBuildingId: seed.building.sawmill.id,
					resourceId: seed.resource.plank.id,
					amount: 1,
					cycles: 1,
					limit: 1,
				},

				/**
				 * Forester
				 */
				{
					id: id(),
					baseBuildingId: seed.building.forester.id,
					resourceId: seed.resource.wood.id,
					amount: 1,
					cycles: 1,
					limit: 1,
				},
				{
					id: seed.building.forester.production.blueprint.sawmill.id,
					baseBuildingId: seed.building.forester.id,
					resourceId: seed.building.sawmill.blueprint.id,
					amount: 1,
					cycles: 15,
					limit: 1,
				},
				{
					id: seed.building.forester.production.blueprint.house.id,
					baseBuildingId: seed.building.forester.id,
					resourceId: seed.building.house.blueprint.id,
					amount: 1,
					cycles: 10,
					limit: 1,
				},

				/**
				 * Gold mine
				 */
				{
					id: id(),
					baseBuildingId: seed.building.goldMine.id,
					resourceId: seed.resource.rawGold.id,
					amount: 2,
					cycles: 5,
					limit: 1,
				},

				/**
				 * Coal mine
				 */
				{
					id: id(),
					baseBuildingId: seed.building.coalMine.id,
					resourceId: seed.resource.coal.id,
					amount: 2,
					cycles: 3,
					limit: 1,
				},

				/**
				 * Gold smith
				 */
				{
					id: seed.building.goldSmith.production.gold.id,
					baseBuildingId: seed.building.goldSmith.id,
					resourceId: seed.resource.gold.id,
					amount: 1,
					cycles: 4,
					limit: 1,
				},
				{
					id: seed.building.goldSmith.production.coin.id,
					baseBuildingId: seed.building.goldSmith.id,
					resourceId: seed.resource.coin.id,
					amount: 50,
					cycles: 5,
					limit: 1,
				},

				/**
				 * Quarry
				 */
				{
					id: id(),
					baseBuildingId: seed.building.quarry.id,
					resourceId: seed.resource.stone.id,
					amount: 1,
					cycles: 2,
					limit: 1,
				},
				{
					id: seed.building.quarry.production.dressedStone.id,
					baseBuildingId: seed.building.quarry.id,
					resourceId: seed.resource.dressedStone.id,
					amount: 1,
					cycles: 3,
					limit: 1,
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
					baseBuildingId: seed.building.storage.id,
					resourceId: seed.resource.stone.id,
					limit: 100,
				},
				{
					id: id(),
					baseBuildingId: seed.building.storage.id,
					resourceId: seed.resource.wood.id,
					limit: 150,
				},

				/**
				 * Castle
				 */
				{
					id: id(),
					baseBuildingId: seed.building.castle.id,
					resourceId: seed.resource.stone.id,
					limit: 25,
				},
				{
					id: id(),
					baseBuildingId: seed.building.castle.id,
					resourceId: seed.resource.wood.id,
					limit: 50,
				},
			])
			.execute();
	} catch (_) {
		//
	}

	try {
		await kysely
			.insertInto("BaseBuildingProductionRequirement")
			.values([
				/**
				 * Quarry - Dressed Stone
				 */
				{
					id: id(),
					baseBuildingProductionId:
						seed.building.quarry.production.dressedStone.id,
					resourceId: seed.resource.stone.id,
					amount: 2,
					passive: false,
				},

				/**
				 * Forester - Sawmill blueprint
				 */
				{
					id: id(),
					baseBuildingProductionId:
						seed.building.forester.production.blueprint.sawmill.id,
					resourceId: seed.resource.wood.id,
					amount: 100,
					passive: false,
				},
				{
					id: id(),
					baseBuildingProductionId:
						seed.building.forester.production.blueprint.house.id,
					resourceId: seed.resource.wood.id,
					amount: 25,
					passive: false,
				},

				/**
				 * Sawmill - Wood
				 */
				{
					id: id(),
					baseBuildingProductionId: seed.building.sawmill.production.plank.id,
					resourceId: seed.resource.wood.id,
					amount: 2,
					passive: false,
				},

				/**
				 * Goldsmith - Gold
				 */
				{
					id: id(),
					baseBuildingProductionId: seed.building.goldSmith.production.gold.id,
					resourceId: seed.resource.rawGold.id,
					amount: 1,
					passive: false,
				},
				{
					id: id(),
					baseBuildingProductionId: seed.building.goldSmith.production.coin.id,
					resourceId: seed.resource.rawGold.id,
					amount: 1,
					passive: false,
				},
			])
			.execute();
	} catch (_) {
		//
	}
};
