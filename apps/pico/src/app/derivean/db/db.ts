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
			.addColumn("userId", $id, (col) =>
				col.references("User.id").onDelete("cascade").notNull(),
			)
			.addColumn("stamp", "datetime", (col) =>
				col.defaultTo(sql`CURRENT_TIMESTAMP`).notNull(),
			)
			.execute();

		await kysely.schema
			.createTable("Resource")
			.ifNotExists()
			.addColumn("id", $id, (col) => col.primaryKey())
			.addColumn("name", "varchar(64)", (col) => col.notNull().unique())
			.execute();

		await kysely.schema
			.createTable("Resource_Tag")
			.ifNotExists()
			.addColumn("id", $id, (col) => col.primaryKey())
			.addColumn("resourceId", $id, (col) =>
				col.references("Resource.id").onDelete("cascade").notNull(),
			)
			.addColumn("tagId", $id, (col) =>
				col.references("Tag.id").onDelete("cascade").notNull(),
			)
			.addUniqueConstraint("[Resource_Tag] resourceId-tagId", [
				"resourceId",
				"tagId",
			])
			.execute();

		await kysely.schema
			.createTable("Resource_Requirement")
			.ifNotExists()
			.addColumn("id", $id, (col) => col.primaryKey())
			.addColumn("resourceId", $id, (col) =>
				col.references("Resource.id").onDelete("cascade").notNull(),
			)
			.addColumn("requirementId", $id, (col) =>
				col.references("Resource.id").onDelete("cascade").notNull(),
			)
			.addColumn("amount", "float4", (col) => col.notNull())
			/**
			 * If true, it's enough to have the resource, by it's not consumed on build.
			 */
			.addColumn("passive", "boolean", (col) => col.notNull())
			.execute();

		await kysely.schema
			.createTable("Resource_Production")
			.ifNotExists()
			.addColumn("id", $id, (col) => col.primaryKey())
			.addColumn("resourceId", $id, (col) =>
				col.references("Resource.id").onDelete("cascade").notNull(),
			)
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
			.createTable("Resource_Production_Requirement")
			.ifNotExists()
			.addColumn("id", $id, (col) => col.primaryKey())
			.addColumn("resourceProductionId", $id, (col) =>
				col.references("ResourceProduction.id").onDelete("cascade").notNull(),
			)
			.addColumn("resourceRequirementId", $id, (col) =>
				col.references("Resource_Requirement.id").onDelete("cascade").notNull(),
			)
			.addUniqueConstraint(
				"[Resource_Production_Requirement] resourceProductionId-resourceRequirementId",
				["resourceProductionId", "resourceRequirementId"],
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
			.addColumn("userId", $id, (col) =>
				col.references("User.id").onDelete("cascade").notNull(),
			)
			.addColumn("resourceProductionId", $id, (col) =>
				col.references("Resource_Production.id").onDelete("cascade").notNull(),
			)
			/**
			 * Starting cycle
			 */
			.addColumn("from", "integer", (col) => col.notNull())
			/**
			 * Current cycle
			 */
			.addColumn("cycle", "integer", (col) => col.notNull())
			/**
			 * Finish cycle
			 */
			.addColumn("to", "integer", (col) => col.notNull())
			.execute();

		await kysely.schema
			.createTable("Inventory")
			.ifNotExists()
			.addColumn("id", $id, (col) => col.primaryKey())
			.addColumn("resourceId", $id, (col) =>
				col.references("Resource.id").onDelete("cascade").notNull(),
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
			.addColumn("resourceId", $id, (col) =>
				col.references("Resource.id").onDelete("cascade").notNull().unique(),
			)
			.addColumn("amount", "float4", (col) => col.notNull())
			.addColumn("limit", "float4", (col) => col.notNull())
			.execute();

		await kysely.schema
			.createTable("User_Inventory")
			.ifNotExists()
			.addColumn("id", $id, (col) => col.primaryKey())
			.addColumn("userId", $id, (col) =>
				col.references("User.id").onDelete("cascade").notNull().unique(),
			)
			.addColumn("inventoryId", $id, (col) =>
				col.references("Inventory.id").onDelete("cascade").notNull().unique(),
			)
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
			.addColumn("resourceId", $id, (col) =>
				col.references("Resource.id").onDelete("cascade").notNull().unique(),
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
			.addColumn("buildingBaseId", $id, (col) =>
				col.references("BuildingBase.id").onDelete("cascade").notNull(),
			)
			.addColumn("inventoryId", $id, (col) =>
				col.references("Inventory.id").onDelete("cascade").notNull(),
			)
			.addUniqueConstraint(
				"[Building_Base_Inventory] buildingBaseId-inventoryId",
				["buildingBaseId", "inventoryId"],
			)
			.execute();

		await kysely.schema
			.createTable("Building")
			.ifNotExists()
			.addColumn("id", $id, (col) => col.primaryKey())
			.addColumn("userId", $id, (col) =>
				col.references("User.id").onDelete("cascade").notNull(),
			)
			.addColumn("buildingBaseId", $id, (col) =>
				col.references("BuildingBase.id").onDelete("cascade").notNull(),
			)
			.execute();
	},
});
