import { withDatabase } from "@use-pico/client";
import { type withRepositorySchema } from "@use-pico/common";
import type { BaseBuildingSchema } from "~/app/derivean/building/base/BaseBuildingSchema";
import type { BuildingSchema } from "~/app/derivean/building/BuildingSchema";
import type { BuildingRequirementResourceSchema } from "~/app/derivean/building/requirement/resource/BuildingRequirementResourceSchema";
import type { InventorySchema } from "~/app/derivean/inventory/InventorySchema";
import type { InventorySlotSchema } from "~/app/derivean/inventory/slot/InventorySlotSchema";
import type { ItemSchema } from "~/app/derivean/item/ItemSchema";
import type { ResourceSchema } from "~/app/derivean/resource/ResourceSchema";
import type { SlotSchema } from "~/app/derivean/slot/SlotSchema";

export interface Database {
	Resource: withRepositorySchema.Entity<ResourceSchema>;

	BaseBuilding: withRepositorySchema.Entity<BaseBuildingSchema>;
	Building: withRepositorySchema.Entity<BuildingSchema>;
	BuildingRequirementResource: withRepositorySchema.Entity<BuildingRequirementResourceSchema>;

	/**
	 * Maybe obsolete?
	 */
	Inventory: withRepositorySchema.Entity<InventorySchema>;
	InventorySlot: withRepositorySchema.Entity<InventorySlotSchema>;
	Slot: withRepositorySchema.Entity<SlotSchema>;
	Item: withRepositorySchema.Entity<ItemSchema>;
}

export const db = withDatabase<Database>({
	database: "derivean",
	async bootstrap({ kysely }) {
		kysely.schema
			.createTable("User")
			.ifNotExists()
			.addColumn("id", "varchar(36)", (col) => col.primaryKey())
			.addColumn("name", "varchar(64)", (col) => col.notNull())
			.addColumn("login", "varchar(128)", (col) => col.notNull().unique())
			.addColumn("password", "varchar(256)", (col) => col.notNull())
			.execute();

		kysely.schema
			.createTable("Resource")
			.ifNotExists()
			.addColumn("id", "varchar(36)", (col) => col.primaryKey())
			.addColumn("name", "varchar(64)", (col) => col.notNull().unique())
			.addColumn("description", "varchar(128)")
			.execute();

		kysely.schema
			.createTable("BaseBuilding")
			.ifNotExists()
			.addColumn("id", "varchar(36)", (col) => col.primaryKey())
			.addColumn("name", "varchar(64)", (col) => col.notNull().unique())
			.addColumn("description", "varchar(128)")
			.execute();

		kysely.schema
			.createTable("Building")
			.ifNotExists()
			.addColumn("id", "varchar(36)", (col) => col.primaryKey())
			.addColumn("userId", "varchar(36)", (col) =>
				col.references("User.id").onDelete("cascade").notNull(),
			)
			.addColumn("baseBuildingId", "varchar(36)", (col) =>
				col.references("BaseBuilding.id").onDelete("cascade").notNull(),
			)
			.addColumn("description", "varchar(128)")
			.execute();

		kysely.schema
			.createTable("BuildingRequirementResource")
			.ifNotExists()
			.addColumn("id", "varchar(36)", (col) => col.primaryKey())
			.addColumn("baseBuildingId", "varchar(36)", (col) =>
				col.references("BaseBuilding.id").onDelete("cascade").notNull(),
			)
			.addColumn("resourceId", "varchar(36)", (col) =>
				col.references("Resource.id").onDelete("cascade").notNull(),
			)
			.addColumn("amount", "float8", (col) => col.notNull())
			.execute();
	},
});
