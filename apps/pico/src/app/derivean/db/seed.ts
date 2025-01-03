import { id, pwd } from "@use-pico/common";
import type { Kysely } from "kysely";
import type { Database } from "~/app/derivean/db/Database";

export const seed = async (kysely: Kysely<Database>) => {
	const ids = {
		user: id(),
		castle: id(),
		storage: id(),
		resource: {
			wood: id(),
			stone: id(),
			storageBlueprint: id(),
			castleBlueprint: id(),
		},
		tag: {
			material: id(),
			blueprint: id(),
		},
	} as const;

	try {
		await kysely
			.insertInto("User")
			.values([
				{
					id: ids.user,
					login: "aaa",
					password: pwd.hash("aaa"),
					name: "Root",
				},
			])
			.execute();
	} catch (_) {
		//
	}

	try {
		await kysely
			.insertInto("BaseBuilding")
			.values([
				{
					id: ids.castle,
					name: "Castle",
					preview: true,
					cycles: 5,
					limit: 0,
				},
				{
					id: ids.storage,
					name: "Storage",
					preview: true,
					cycles: 1,
					limit: 0,
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
					id: ids.tag.blueprint,
					code: "blueprint",
					label: "Blueprint",
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
					id: ids.resource.wood,
					name: "Wood",
				},
				{
					id: ids.resource.stone,
					name: "Stone",
				},
				{
					id: ids.resource.storageBlueprint,
					name: "Storage - Blueprint",
				},
				{
					id: ids.resource.castleBlueprint,
					name: "Castle - Blueprint",
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
			])
			.execute();
	} catch (_) {
		//
	}

	try {
		await kysely
			.insertInto("BaseBuilding_Requirement")
			.values([
				{
					id: id(),
					baseBuildingId: ids.storage,
					resourceId: ids.resource.stone,
					passive: false,
					amount: 3,
				},
				{
					id: id(),
					baseBuildingId: ids.storage,
					resourceId: ids.resource.wood,
					passive: false,
					amount: 5,
				},

				{
					id: id(),
					baseBuildingId: ids.castle,
					resourceId: ids.resource.stone,
					passive: false,
					amount: 10,
				},
				{
					id: id(),
					baseBuildingId: ids.castle,
					resourceId: ids.resource.wood,
					passive: false,
					amount: 25,
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
				{
					id: id(),
					baseBuildingId: ids.storage,
					resourceId: ids.resource.stone,
					limit: 100,
				},
				{
					id: id(),
					baseBuildingId: ids.storage,
					resourceId: ids.resource.wood,
					limit: 150,
				},

				{
					id: id(),
					baseBuildingId: ids.castle,
					resourceId: ids.resource.stone,
					limit: 25,
				},
				{
					id: id(),
					baseBuildingId: ids.castle,
					resourceId: ids.resource.wood,
					limit: 50,
				},
			])
			.execute();
	} catch (_) {
		//
	}
};
