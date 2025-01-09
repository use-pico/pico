import { withDatabase } from "@use-pico/client";
import { sql } from "kysely";
import type { Database } from "~/app/derivean/db/Database";

export const { kysely, bootstrap } = withDatabase<Database>({
	database: "derivean",
	async bootstrap({ kysely }) {
		const $id = "varchar(36)" as const;

		await kysely.schema
			.createTable("User")
			.ifNotExists()
			.addColumn("id", $id, (col) => col.primaryKey())
			.addColumn("name", "varchar(64)", (col) => col.notNull())
			.addColumn("login", "varchar(128)", (col) => col.notNull().unique())
			.addColumn("password", "varchar(256)", (col) => col.notNull())
			.execute();

		await kysely.schema
			.createTable("Tag")
			.ifNotExists()
			.addColumn("id", $id, (col) => col.primaryKey())
			.addColumn("code", "varchar(64)", (col) => col.notNull())
			.addColumn("label", "varchar(128)", (col) => col.notNull())
			.addColumn("group", "varchar(64)")
			.addColumn("sort", "integer", (col) => col.notNull().defaultTo(0))
			.addUniqueConstraint("Tag_code_group", ["code", "group"])
			.execute();

		await kysely.schema
			.createTable("Cycle")
			.ifNotExists()
			.addColumn("id", $id, (col) => col.primaryKey())
			.addColumn("userId", $id, (col) => col.notNull())
			.addColumn("stamp", "datetime", (col) =>
				col.defaultTo(sql`CURRENT_TIMESTAMP`).notNull(),
			)
			.addForeignKeyConstraint(
				"[Cycle] userId",
				["userId"],
				"User",
				["id"],
				(c) => c.onDelete("cascade").onUpdate("cascade"),
			)
			.execute();
            
		// await kysely.schema
		// 	.createTable("Cycle")
		// 	.ifNotExists()
		// 	.addColumn("id", $id, (col) => col.primaryKey())
		// 	.addColumn("userId", $id, (col) => col.notNull())
		// 	.addColumn("stamp", "datetime", (col) =>
		// 		col.defaultTo(sql`CURRENT_TIMESTAMP`).notNull(),
		// 	)
		// 	.addForeignKeyConstraint(
		// 		"[Cycle] userId",
		// 		["userId"],
		// 		"User",
		// 		["id"],
		// 		(c) => c.onDelete("cascade").onUpdate("cascade"),
		// 	)
		// 	.execute();

		await kysely.schema
			.createTable("Resource")
			.ifNotExists()
			.addColumn("id", $id, (col) => col.primaryKey())

			.addColumn("name", "varchar(64)", (col) => col.notNull().unique())
			/**
			 * Amount of resource produced in specified cycles.
			 */
			.addColumn("amount", "float4", (col) => col.notNull())
			/**
			 * Amount of cycles to produce a thing
			 */
			.addColumn("cycles", "integer", (col) => col.notNull())
			/**
			 * Queue limit
			 */
			.addColumn("limit", "integer", (col) => col.notNull())

			.execute();

		await kysely.schema
			.createTable("Resource_Tag")
			.ifNotExists()
			.addColumn("id", $id, (col) => col.primaryKey())

			.addColumn("resourceId", $id, (col) => col.notNull())
			.addForeignKeyConstraint(
				"[Resource_Tag] resourceId",
				["resourceId"],
				"Resource",
				["id"],
				(c) => c.onDelete("cascade").onUpdate("cascade"),
			)

			.addColumn("tagId", $id, (col) => col.notNull())
			.addForeignKeyConstraint(
				"[Resource_Tag] tagId",
				["tagId"],
				"Tag",
				["id"],
				(c) => c.onDelete("cascade").onUpdate("cascade"),
			)

			.addUniqueConstraint("[Resource_Tag] resourceId-tagId", [
				"resourceId",
				"tagId",
			])

			.execute();

		await kysely.schema
			.createTable("Resource_Production_Requirement")
			.ifNotExists()
			.addColumn("id", $id, (col) => col.primaryKey())

			.addColumn("resourceId", $id, (col) => col.notNull())
			.addForeignKeyConstraint(
				"[Resource_Production_Requirement] resourceId",
				["resourceId"],
				"Resource",
				["id"],
				(c) => c.onDelete("cascade").onUpdate("cascade"),
			)

			.addColumn("requirementId", $id, (col) => col.notNull())
			.addForeignKeyConstraint(
				"[Resource_Production_Requirement] requirementId",
				["requirementId"],
				"Resource",
				["id"],
				(c) => c.onDelete("cascade").onUpdate("cascade"),
			)

			/**
			 * Level of the thing being produced - not a required level of the resource.
			 *
			 * Example: Building of level 1 would put where level = 2 to check if it could be upgraded.
			 */
			.addColumn("level", "integer", (col) => col.notNull().defaultTo(1))
			.addColumn("amount", "float4", (col) => col.notNull())
			/**
			 * If true, it's enough to have the resource, by it's not consumed on build.
			 */
			.addColumn("passive", "boolean", (col) => col.notNull())

			.addUniqueConstraint(
				"[Resource_Production_Requirement] resourceId-requirementId",
				["requirementId", "resourceId"],
			)
			.execute();

		/**
		 * Queue of produced things (resources, items, buildings, ...).
		 */
		await kysely.schema
			.createTable("Resource_Production_Queue")
			.ifNotExists()
			.addColumn("id", $id, (col) => col.primaryKey())

			/**
			 * Owner of this queue item.
			 */
			.addColumn("userId", $id, (col) => col.notNull())
			.addForeignKeyConstraint(
				"[Resource_Production_Queue] userId",
				["userId"],
				"User",
				["id"],
				(c) => c.onDelete("cascade").onUpdate("cascade"),
			)

			.addColumn("resourceId", $id, (col) => col.notNull())
			.addForeignKeyConstraint(
				"[Resource_Production_Queue] resourceId",
				["resourceId"],
				"Resource",
				["id"],
				(c) => c.onDelete("cascade").onUpdate("cascade"),
			)

			/**
			 * Starting cycle
			 */
			.addColumn("from", "integer", (col) => col.notNull())
			/**
			 * Finish cycle
			 */
			.addColumn("to", "integer", (col) => col.notNull())
			/**
			 * Current cycle
			 */
			.addColumn("cycle", "integer", (col) => col.notNull())

			.execute();

		await kysely.schema
			.createTable("Inventory")
			.ifNotExists()
			.addColumn("id", $id, (col) => col.primaryKey())

			.addColumn("resourceId", $id, (col) => col.notNull())
			.addForeignKeyConstraint(
				"[Inventory] resourceId",
				["resourceId"],
				"Resource",
				["id"],
				(c) => c.onDelete("cascade").onUpdate("cascade"),
			)

			.addColumn("amount", "float4", (col) => col.notNull())
			.addColumn("limit", "float4", (col) => col.notNull())

			.execute();

		/**
		 * This should define all resources that are available in the game as default
		 * inventory is copied to the user (on registration), so if something is missing,
		 * user will not be able to store it.
		 */
		await kysely.schema
			.createTable("Default_Inventory")
			.ifNotExists()
			.addColumn("id", $id, (col) => col.primaryKey())

			.addColumn("resourceId", $id, (col) => col.unique())
			.addForeignKeyConstraint(
				"[Default_Inventory] resourceId",
				["resourceId"],
				"Resource",
				["id"],
				(c) => c.onDelete("cascade").onUpdate("cascade"),
			)

			.addColumn("amount", "float4", (col) => col.notNull())
			.addColumn("limit", "float4", (col) => col.notNull())

			.execute();

		await kysely.schema
			.createTable("User_Inventory")
			.ifNotExists()
			.addColumn("id", $id, (col) => col.primaryKey())

			.addColumn("userId", $id, (col) => col.notNull())
			.addForeignKeyConstraint(
				"[User_Inventory] userId",
				["userId"],
				"User",
				["id"],
				(c) => c.onDelete("cascade").onUpdate("cascade"),
			)
			.addColumn("inventoryId", $id, (col) => col.notNull())
			.addForeignKeyConstraint(
				"[User_Inventory] inventoryId",
				["inventoryId"],
				"Inventory",
				["id"],
				(c) => c.onDelete("cascade").onUpdate("cascade"),
			)

			.addUniqueConstraint("[User_Inventory] userId-inventoryId", [
				"userId",
				"inventoryId",
			])

			.execute();

		await kysely.schema
			.createTable("Building_Base")
			.ifNotExists()
			.addColumn("id", $id, (col) => col.primaryKey())

			/**
			 * Building may be requirement of an another building (resource requirement).
			 *
			 * This must be managed by the game logic (so when a building is built, inventory
			 * transaction of this resource must be done, same for building destruction).
			 *
			 * Also this resource is used to compute list of requirements.
			 */
			.addColumn("resourceId", $id, (col) => col.notNull().unique())
			.addForeignKeyConstraint(
				"[Building_Base] resourceId",
				["resourceId"],
				"Resource",
				["id"],
				(c) => c.onDelete("cascade").onUpdate("cascade"),
			)

			/**
			 * Number of cycles required to build this building
			 */
			.addColumn("cycles", "integer", (col) => col.notNull())

			.execute();

		/**
		 * Defines inventory (and it's limits) for a building.
		 *
		 * If a resource is not defined in a building, it cannot be stored there.
		 */
		await kysely.schema
			.createTable("Building_Base_Inventory")
			.ifNotExists()
			.addColumn("id", $id, (col) => col.primaryKey())

			.addColumn("buildingBaseId", $id, (col) => col.notNull())
			.addForeignKeyConstraint(
				"[Building_Base_Inventory] buildingBaseId",
				["buildingBaseId"],
				"Building_Base",
				["id"],
				(c) => c.onDelete("cascade").onUpdate("cascade"),
			)

			.addColumn("inventoryId", $id, (col) => col.notNull())
			.addForeignKeyConstraint(
				"[Building_Base_Inventory] inventoryId",
				["inventoryId"],
				"Inventory",
				["id"],
				(c) => c.onDelete("cascade").onUpdate("cascade"),
			)

			/**
			 * For which level this inventory is defined for.
			 */
			.addColumn("level", "integer", (col) => col.notNull().defaultTo(1))

			.addUniqueConstraint(
				"[Building_Base_Inventory] buildingBaseId-inventoryId",
				["buildingBaseId", "inventoryId"],
			)

			.execute();

		/**
		 * Defines production of resources in a building.
		 */
		await kysely.schema
			.createTable("Building_Base_Production")
			.ifNotExists()
			.addColumn("id", $id, (col) => col.primaryKey())

			.addColumn("buildingBaseId", $id, (col) => col.notNull())
			.addForeignKeyConstraint(
				"[Building_Base_Production] buildingBaseId",
				["buildingBaseId"],
				"Building_Base",
				["id"],
				(c) => c.onDelete("cascade").onUpdate("cascade"),
			)

			.addColumn("resourceId", $id, (col) => col.notNull())
			.addForeignKeyConstraint(
				"[Building_Base_Production] resourceId",
				["resourceId"],
				"Resource",
				["id"],
				(c) => c.onDelete("cascade").onUpdate("cascade"),
			)

			/**
			 * At which level a building is able to produce something.
			 */
			.addColumn("level", "integer", (col) => col.notNull().defaultTo(1))

			.addUniqueConstraint(
				"[Building_Base_Production] buildingBaseId-resourceId",
				["buildingBaseId", "resourceId"],
			)

			.execute();

		await kysely.schema
			.createTable("Building")
			.ifNotExists()
			.addColumn("id", $id, (col) => col.primaryKey())

			.addColumn("userId", $id, (col) => col.notNull())
			.addForeignKeyConstraint(
				"[Building] userId",
				["userId"],
				"User",
				["id"],
				(c) => c.onDelete("cascade").onUpdate("cascade"),
			)

			.addColumn("buildingBaseId", $id, (col) => col.notNull())
			.addForeignKeyConstraint(
				"[Building] buildingBaseId",
				["buildingBaseId"],
				"Building_Base",
				["id"],
				(c) => c.onDelete("cascade").onUpdate("cascade"),
			)

			/**
			 * Current level of the building.
			 */
			.addColumn("level", "integer", (col) => col.notNull().defaultTo(1))

			.execute();
	},
});
