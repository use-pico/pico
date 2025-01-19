import { withDatabase } from "@use-pico/client";
import { sql } from "kysely";
import type { Database } from "~/app/derivean/db/sdk";

export const { kysely, bootstrap } = withDatabase<Database>({
	database: "derivean",
	async bootstrap({ kysely }) {
		const $id = "varchar(36)" as const;

		try {
			/**
			 * Just try of anything is available before all the table creations are run.
			 */
			await kysely
				.selectFrom("User")
				.select((eb) => eb.fn.countAll().as("count"))
				.executeTakeFirstOrThrow();
		} catch (_) {
			await kysely.schema
				.createTable("User")
				.ifNotExists()
				.addColumn("id", $id, (col) => col.primaryKey())

				.addColumn("name", "varchar(64)", (col) => col.notNull())
				.addColumn("login", "varchar(128)", (col) => col.notNull())
				.addColumn("password", "varchar(256)", (col) => col.notNull())

				.addUniqueConstraint("[User] login", ["login"])

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
				.addForeignKeyConstraint(
					"[Cycle] userId",
					["userId"],
					"User",
					["id"],
					(c) => c.onDelete("cascade").onUpdate("cascade"),
				)

				.addColumn("stamp", "datetime", (col) =>
					col.defaultTo(sql`CURRENT_TIMESTAMP`).notNull(),
				)

				.execute();

			await kysely.schema
				.createTable("Resource")
				.ifNotExists()
				.addColumn("id", $id, (col) => col.primaryKey())

				.addColumn("name", "varchar(64)", (col) => col.notNull())

				.addUniqueConstraint("[Resource] name", ["name"])

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

				.addColumn("resourceId", $id, (col) => col.notNull())
				.addForeignKeyConstraint(
					"[Default_Inventory] resourceId",
					["resourceId"],
					"Resource",
					["id"],
					(c) => c.onDelete("cascade").onUpdate("cascade"),
				)

				.addColumn("amount", "float4", (col) => col.notNull())
				.addColumn("limit", "float4", (col) => col.notNull())

				.addUniqueConstraint("[Default_Inventory] resourceId", ["resourceId"])

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

			/**
			 * Blueprint is a definition for the building; all the buildings are pointing to it's blueprint.
			 *
			 * Idea is when blueprint is changed, all buildings are changed as well.
			 */
			await kysely.schema
				.createTable("Blueprint")
				.ifNotExists()
				.addColumn("id", $id, (col) => col.primaryKey())

				.addColumn("name", "varchar(64)", (col) => col.notNull())

				/**
				 * Number of cycles required to build this building
				 */
				.addColumn("cycles", "integer", (col) => col.notNull())

				/**
				 * Sort blueprints by this number (so the player can see buildings in right order).
				 */
				.addColumn("sort", "integer", (col) => col.notNull())

				.addUniqueConstraint("[Blueprint] name", ["name"])

				.execute();

			/**
			 * Defines resources available for production in the building (blueprint).
			 */
			await kysely.schema
				.createTable("Blueprint_Production")
				.ifNotExists()
				.addColumn("id", $id, (col) => col.primaryKey())

				/**
				 * Which blueprint is this production for (building).
				 */
				.addColumn("blueprintId", $id, (col) => col.notNull())
				.addForeignKeyConstraint(
					"[Blueprint_Production] blueprintId",
					["blueprintId"],
					"Blueprint",
					["id"],
					(c) => c.onDelete("cascade").onUpdate("cascade"),
				)

				/**
				 * Which resource is produced.
				 */
				.addColumn("resourceId", $id, (col) => col.notNull())
				.addForeignKeyConstraint(
					"[Blueprint_Production] resourceId",
					["resourceId"],
					"Resource",
					["id"],
					(c) => c.onDelete("cascade").onUpdate("cascade"),
				)

				/**
				 * Amount of resource produced in specified cycles.
				 */
				.addColumn("amount", "float4", (col) => col.notNull())
				/**
				 * Amount of cycles to produce a thing
				 */
				.addColumn("cycles", "integer", (col) => col.notNull())

				.execute();

			/**
			 * Defines resources required to build the building (blueprint).
			 */
			await kysely.schema
				.createTable("Blueprint_Requirement")
				.ifNotExists()
				.addColumn("id", $id, (col) => col.primaryKey())

				.addColumn("blueprintId", $id, (col) => col.notNull())
				.addForeignKeyConstraint(
					"[Blueprint_Requirement] blueprintId",
					["blueprintId"],
					"Blueprint",
					["id"],
					(c) => c.onDelete("cascade").onUpdate("cascade"),
				)

				.addColumn("resourceId", $id, (col) => col.notNull())
				.addForeignKeyConstraint(
					"[Blueprint_Requirement] resourceId",
					["resourceId"],
					"Resource",
					["id"],
					(c) => c.onDelete("cascade").onUpdate("cascade"),
				)

				.addColumn("amount", "float4", (col) => col.notNull())
				/**
				 * If true, it's enough to have the resource, by it's not consumed on build.
				 */
				.addColumn("passive", "boolean", (col) => col.notNull())

				.addUniqueConstraint(
					"[Blueprint_Requirement] blueprintId-requirementId",
					["blueprintId", "resourceId"],
				)

				.execute();

			/**
			 * Blueprint may require another blueprints to be built before.
			 */
			await kysely.schema
				.createTable("Blueprint_Dependency")
				.ifNotExists()
				.addColumn("id", $id, (col) => col.primaryKey())

				.addColumn("blueprintId", $id, (col) => col.notNull())
				.addForeignKeyConstraint(
					"[Blueprint_Dependency] blueprintId",
					["blueprintId"],
					"Blueprint",
					["id"],
					(c) => c.onDelete("cascade").onUpdate("cascade"),
				)

				.addColumn("dependencyId", $id, (col) => col.notNull())
				.addForeignKeyConstraint(
					"[Blueprint_Dependency] dependencyId",
					["dependencyId"],
					"Blueprint",
					["id"],
					(c) => c.onDelete("cascade").onUpdate("cascade"),
				)

				.addUniqueConstraint(
					"[Blueprint_Dependency] blueprintId-dependencyId",
					["blueprintId", "dependencyId"],
				)

				.execute();

			/**
			 * List of conflicting blueprints: when any of them are built, "blueprintId" won't appear at all.
			 */
			await kysely.schema
				.createTable("Blueprint_Conflict")
				.ifNotExists()
				.addColumn("id", $id, (col) => col.primaryKey())

				.addColumn("blueprintId", $id, (col) => col.notNull())
				.addForeignKeyConstraint(
					"[Blueprint_Conflict] blueprintId",
					["blueprintId"],
					"Blueprint",
					["id"],
					(c) => c.onDelete("cascade").onUpdate("cascade"),
				)

				.addColumn("conflictId", $id, (col) => col.notNull())
				.addForeignKeyConstraint(
					"[Blueprint_Conflict] conflictId",
					["conflictId"],
					"Blueprint",
					["id"],
					(c) => c.onDelete("cascade").onUpdate("cascade"),
				)

				.addUniqueConstraint("[Blueprint_Conflict] blueprintId-conflictId", [
					"blueprintId",
					"conflictId",
				])

				.execute();

			/**
			 * Defines resources required to produce a resource defined in production line.
			 */
			await kysely.schema
				.createTable("Blueprint_Production_Requirement")
				.ifNotExists()
				.addColumn("id", $id, (col) => col.primaryKey())

				.addColumn("blueprintProductionId", $id, (col) => col.notNull())
				.addForeignKeyConstraint(
					"[Blueprint_Production_Requirement] blueprintProductionId",
					["blueprintProductionId"],
					"Blueprint_Production",
					["id"],
					(c) => c.onDelete("cascade").onUpdate("cascade"),
				)

				.addColumn("resourceId", $id, (col) => col.notNull())
				.addForeignKeyConstraint(
					"[Blueprint_Production_Requirement] resourceId",
					["resourceId"],
					"Resource",
					["id"],
					(c) => c.onDelete("cascade").onUpdate("cascade"),
				)

				.addColumn("amount", "float4", (col) => col.notNull())
				/**
				 * If true, it's enough to have the resource, by it's not consumed on build.
				 */
				.addColumn("passive", "boolean", (col) => col.notNull())

				.addUniqueConstraint(
					"[Blueprint_Production_Requirement] blueprintProductionId-resourceId",
					["blueprintProductionId", "resourceId"],
				)

				.execute();

			/**
			 * Defines which blueprints are required to even enable (display) the production
			 * line.
			 */
			await kysely.schema
				.createTable("Blueprint_Production_Dependency")
				.ifNotExists()
				.addColumn("id", $id, (col) => col.primaryKey())

				.addColumn("blueprintProductionId", $id, (col) => col.notNull())
				.addForeignKeyConstraint(
					"[Blueprint_Production_Dependency] blueprintProductionId",
					["blueprintProductionId"],
					"Blueprint_Production",
					["id"],
					(c) => c.onDelete("cascade").onUpdate("cascade"),
				)

				.addColumn("blueprintId", $id, (col) => col.notNull())
				.addForeignKeyConstraint(
					"[Blueprint_Production_Dependency] blueprintId",
					["blueprintId"],
					"Blueprint",
					["id"],
					(c) => c.onDelete("cascade").onUpdate("cascade"),
				)

				.addUniqueConstraint(
					"[Blueprint_Production_Dependency] blueprintProductionId-blueprintId",
					["blueprintProductionId", "blueprintId"],
				)

				.execute();

			/**
			 * Defines which resources must be present to even display the production line.
			 *
			 * Idea is something like "do you have more than 30 research points in forestery, so you can
			 * run improved woodcutting?"
			 *
			 * Those resources are "passive", thus are not deducted from the inventory.
			 */
			await kysely.schema
				.createTable("Blueprint_Production_Resource")
				.ifNotExists()
				.addColumn("id", $id, (col) => col.primaryKey())

				.addColumn("blueprintProductionId", $id, (col) => col.notNull())
				.addForeignKeyConstraint(
					"[Blueprint_Production_Dependency] blueprintProductionId",
					["blueprintProductionId"],
					"Blueprint_Production",
					["id"],
					(c) => c.onDelete("cascade").onUpdate("cascade"),
				)

				.addColumn("resourceId", $id, (col) => col.notNull())
				.addForeignKeyConstraint(
					"[Blueprint_Production_Dependency] resourceId",
					["resourceId"],
					"Resource",
					["id"],
					(c) => c.onDelete("cascade").onUpdate("cascade"),
				)

				/**
				 * Amount of resource required to display the production line.
				 */
				.addColumn("amount", "float4", (col) => col.notNull())

				.addUniqueConstraint(
					"[Blueprint_Production_Dependency] blueprintProductionId-resourceId",
					["blueprintProductionId", "resourceId"],
				)

				.execute();

			/**
			 * This is resource production queue.
			 */
			await kysely.schema
				.createTable("Production")
				.ifNotExists()
				.addColumn("id", $id, (col) => col.primaryKey())

				/**
				 * Owner of this queue item.
				 */
				.addColumn("userId", $id, (col) => col.notNull())
				.addForeignKeyConstraint(
					"[Production] userId",
					["userId"],
					"User",
					["id"],
					(c) => c.onDelete("cascade").onUpdate("cascade"),
				)

				.addColumn("buildingId", $id, (col) => col.notNull())
				.addForeignKeyConstraint(
					"[Production] buildingId",
					["buildingId"],
					"Building",
					["id"],
					(c) => c.onDelete("cascade").onUpdate("cascade"),
				)

				.addColumn("blueprintProductionId", $id, (col) => col.notNull())
				.addForeignKeyConstraint(
					"[Production] blueprintProductionId",
					["blueprintProductionId"],
					"Blueprint_Production",
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
				.createTable("Production_Queue")
				.ifNotExists()
				.addColumn("id", $id, (col) => col.primaryKey())

				.addColumn("blueprintProductionId", $id, (col) => col.notNull())
				.addForeignKeyConstraint(
					"[Blueprint_Production_Requirement] blueprintProductionId",
					["blueprintProductionId"],
					"Blueprint_Production",
					["id"],
					(c) => c.onDelete("cascade").onUpdate("cascade"),
				)

				/**
				 * Owner of this queue item.
				 */
				.addColumn("userId", $id, (col) => col.notNull())
				.addForeignKeyConstraint(
					"[Blueprint_Production_Requirement] userId",
					["userId"],
					"User",
					["id"],
					(c) => c.onDelete("cascade").onUpdate("cascade"),
				)

				.addColumn("buildingId", $id, (col) => col.notNull())
				.addForeignKeyConstraint(
					"[Blueprint_Production_Requirement] buildingId",
					["buildingId"],
					"Building",
					["id"],
					(c) => c.onDelete("cascade").onUpdate("cascade"),
				)

				/**
				 * How many times this queue has been executed.
				 */
				.addColumn("count", "integer", (col) => col.notNull().defaultTo(0))
				/**
				 * Queue limit; if zero, queue is unlimited; after a limit is reached,
				 * this queue will be deleted.
				 */
				.addColumn("limit", "integer", (col) => col.notNull().defaultTo(0))
				/**
				 * Priority of the queue, higher number means higher priority.
				 */
				.addColumn("priority", "integer", (col) => col.notNull().defaultTo(0))
				.addColumn("paused", "boolean", (col) => col.notNull().defaultTo(false))

				.addUniqueConstraint(
					"[Production_Queue] userId-blueprintProductionId",
					["blueprintProductionId", "userId"],
				)

				.execute();

			/**
			 * Defines queue of buildings to be built.
			 */
			await kysely.schema
				.createTable("Construction")
				.ifNotExists()
				.addColumn("id", $id, (col) => col.primaryKey())

				/**
				 * Owner of this queue item.
				 */
				.addColumn("userId", $id, (col) => col.notNull())
				.addForeignKeyConstraint(
					"[Construction] userId",
					["userId"],
					"User",
					["id"],
					(c) => c.onDelete("cascade").onUpdate("cascade"),
				)

				.addColumn("blueprintId", $id, (col) => col.notNull())
				.addForeignKeyConstraint(
					"[Construction] blueprintId",
					["blueprintId"],
					"Blueprint",
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

				/**
				 * User may have only one type of building.
				 *
				 * This is not directly necessary, but it may help to catch some bugs when
				 * user tries to build something that is already in the queue.
				 */
				.addUniqueConstraint("[Construction] userId-blueprintId", [
					"userId",
					"blueprintId",
				])

				.execute();

			/**
			 * This is a building instance belonging to a player.
			 */
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

				.addColumn("blueprintId", $id, (col) => col.notNull())
				.addForeignKeyConstraint(
					"[Building] blueprintId",
					["blueprintId"],
					"Blueprint",
					["id"],
					(c) => c.onDelete("cascade").onUpdate("cascade"),
				)

				/**
				 * User may have only one type of building; this also checks when user upgrades to
				 * a building which accidentally creates one already existing.
				 */
				.addUniqueConstraint("[Building] userId-blueprintId", [
					"userId",
					"blueprintId",
				])

				.execute();
		}
	},
});
