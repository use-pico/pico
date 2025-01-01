import { withDatabase } from "@use-pico/client";
import { type withRepositorySchema } from "@use-pico/common";
import type { BaseBuildingSchema } from "~/app/derivean/building/base/BaseBuildingSchema";
import type { BaseBuildingLimitSchema } from "~/app/derivean/building/base/limit/BaseBuildingLimitSchema";
import type { BaseBuildingRequirementSchema } from "~/app/derivean/building/base/requirement/BaseBuildingRequirementSchema";
import type { BuildingSchema } from "~/app/derivean/building/BuildingSchema";
import type { BuildingResourceSchema } from "~/app/derivean/building/resource/BuildingResourceSchema";
import type { ResourceSchema } from "~/app/derivean/resource/ResourceSchema";
import type { ResourceTagSchema } from "~/app/derivean/resource/tag/ResourceTagSchema";
import type { TagSchema } from "~/app/tag/TagSchema";
import type { UserSchema } from "~/app/user/UserSchema";

export interface Database {
	User: withRepositorySchema.Entity<UserSchema>;
	Tag: withRepositorySchema.Entity<TagSchema>;

	Resource: withRepositorySchema.Entity<ResourceSchema>;
	Resource_Tag: withRepositorySchema.Entity<ResourceTagSchema>;

	BaseBuilding: withRepositorySchema.Entity<BaseBuildingSchema>;
	BaseBuilding_Requirement: withRepositorySchema.Entity<BaseBuildingRequirementSchema>;
	BaseBuilding_Limit: withRepositorySchema.Entity<BaseBuildingLimitSchema>;
	Building: withRepositorySchema.Entity<BuildingSchema>;
	Building_Resource: withRepositorySchema.Entity<BuildingResourceSchema>;
}

export const db = withDatabase<Database>({
	database: "derivean",
	async bootstrap({ kysely }) {
		const $id = "varchar(36)" as const;

		const bootstrapCommon = async () => {
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
				.execute();
		};

		const bootstrapResource = async () => {
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
				.addUniqueConstraint("Resource_Tag_resourceId_tagId", [
					"resourceId",
					"tagId",
				])
				.execute();
		};

		const bootstrapBaseBuilding = async () => {
			await kysely.schema
				.createTable("BaseBuilding")
				.ifNotExists()
				.addColumn("id", $id, (col) => col.primaryKey())
				.addColumn("name", "varchar(64)", (col) => col.notNull().unique())
				/**
				 * Enable preview of the building even when the player does not have the resources to build it
				 */
				.addColumn("preview", "boolean", (col) => col.notNull())
				.execute();

			await kysely.schema
				.createTable("BaseBuilding_Requirement")
				.ifNotExists()
				.addColumn("id", $id, (col) => col.primaryKey())
				.addColumn("baseBuildingId", $id, (col) =>
					col.references("BaseBuilding.id").onDelete("cascade").notNull(),
				)
				.addColumn("resourceId", $id, (col) =>
					col.references("Resource.id").onDelete("cascade").notNull(),
				)
				.addColumn("amount", "float8", (col) => col.notNull())
				/**
				 * If true, it's enough to have the resource, by it's not consumed on build.
				 */
				.addColumn("passive", "boolean", (col) => col.notNull())
				.addUniqueConstraint(
					"BaseBuilding_Requirement_baseBuildingId_resourceId",
					["baseBuildingId", "resourceId"],
				)
				.execute();

			await kysely.schema
				.createTable("BaseBuilding_Limit")
				.ifNotExists()
				.addColumn("id", $id, (col) => col.primaryKey())
				.addColumn("baseBuildingId", $id, (col) =>
					col.references("BaseBuilding.id").onDelete("cascade").notNull(),
				)
				.addColumn("resourceId", $id, (col) =>
					col.references("Resource.id").onDelete("cascade").notNull(),
				)
				.addColumn("limit", "float8", (col) => col.notNull())
				.addUniqueConstraint("BaseBuilding_Limit_baseBuildingId_resourceId", [
					"baseBuildingId",
					"resourceId",
				])
				.execute();
		};

		const bootstrapBuilding = async () => {
			await kysely.schema
				.createTable("Building")
				.ifNotExists()
				.addColumn("id", $id, (col) => col.primaryKey())
				.addColumn("userId", $id, (col) =>
					col.references("User.id").onDelete("cascade").notNull(),
				)
				.addColumn("baseBuildingId", $id, (col) =>
					col.references("BaseBuilding.id").onDelete("cascade").notNull(),
				)
				.execute();

			await kysely.schema
				.createTable("Building_Resource")
				.ifNotExists()
				.addColumn("id", $id, (col) => col.primaryKey())
				.addColumn("buildingId", $id, (col) =>
					col.references("Building.id").onDelete("cascade").notNull(),
				)
				.addColumn("resourceId", $id, (col) =>
					col.references("Resource.id").onDelete("cascade").notNull(),
				)
				.addColumn("amount", "float8", (col) => col.notNull())
				.addUniqueConstraint("Building_Storage_buildingId_resourceId", [
					"buildingId",
					"resourceId",
				])
				.execute();
		};

		await bootstrapCommon();
		await bootstrapResource();
		await bootstrapBaseBuilding();
		await bootstrapBuilding();
	},
});
