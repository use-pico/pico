import { withDatabase } from "@use-pico/client";
import { type withRepositorySchema } from "@use-pico/common";
import type { BaseBuildingSchema } from "~/app/derivean/building/base/BaseBuildingSchema";
import type { BuildingSchema } from "~/app/derivean/building/BuildingSchema";
import type { BuildingRequirementResourceSchema } from "~/app/derivean/building/requirement/resource/BuildingRequirementResourceSchema";
import type { ResourceSchema } from "~/app/derivean/resource/ResourceSchema";
import type { ResourceTagSchema } from "~/app/derivean/resource/tag/ResourceTagSchema";
import type { BaseStorageSchema } from "~/app/derivean/storage/base/BaseStorageSchema";
import type { StorageSchema } from "~/app/derivean/storage/StorageSchema";
import type { TagSchema } from "~/app/tag/TagSchema";
import type { UserSchema } from "~/app/user/UserSchema";

export interface Database {
	User: withRepositorySchema.Entity<UserSchema>;
	Tag: withRepositorySchema.Entity<TagSchema>;

	Resource: withRepositorySchema.Entity<ResourceSchema>;
	ResourceTag: withRepositorySchema.Entity<ResourceTagSchema>;

	BaseBuilding: withRepositorySchema.Entity<BaseBuildingSchema>;
	Building: withRepositorySchema.Entity<BuildingSchema>;
	BuildingRequirementResource: withRepositorySchema.Entity<BuildingRequirementResourceSchema>;

	Storage: withRepositorySchema.Entity<StorageSchema>;
	BaseStorage: withRepositorySchema.Entity<BaseStorageSchema>;
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
				.createTable("ResourceTag")
				.ifNotExists()
				.addColumn("id", $id, (col) => col.primaryKey())
				.addColumn("resourceId", $id, (col) =>
					col.references("Resource.id").onDelete("cascade").notNull(),
				)
				.addColumn("tagId", $id, (col) =>
					col.references("Tag.id").onDelete("cascade").notNull(),
				)
				.addUniqueConstraint("ResourceTag_Resource_Tag", [
					"resourceId",
					"tagId",
				])
				.execute();
		};

		const bootstrapStorage = async () => {
			await kysely.schema
				.createTable("BaseStorage")
				.ifNotExists()
				.addColumn("id", $id, (col) => col.primaryKey())
				.addColumn("resourceId", $id, (col) =>
					col.references("Resource.id").onDelete("cascade").notNull(),
				)
				.addColumn("limit", "float8", (col) => col.notNull())
				.execute();

			await kysely.schema
				.createTable("Storage")
				.ifNotExists()
				.addColumn("id", $id, (col) => col.primaryKey())
				.addColumn("baseStorageId", $id, (col) =>
					col.references("BaseStorage.id").onDelete("cascade").notNull(),
				)
				.addColumn("amount", "float8", (col) => col.notNull())
				.execute();
		};

		const bootstrapBaseBuilding = async () => {
			await kysely.schema
				.createTable("BaseBuilding")
				.ifNotExists()
				.addColumn("id", $id, (col) => col.primaryKey())
				.addColumn("name", "varchar(64)", (col) => col.notNull().unique())
				.addColumn("preview", "boolean", (col) => col.notNull())
				.addColumn("description", "varchar(128)")
				.execute();

			await kysely.schema
				.createTable("BaseBuilding_ResourceRequirement")
				.ifNotExists()
				.addColumn("id", $id, (col) => col.primaryKey())
				.addColumn("baseBuildingId", $id, (col) =>
					col.references("BaseBuilding.id").onDelete("cascade").notNull(),
				)
				.addColumn("resourceId", $id, (col) =>
					col.references("Resource.id").onDelete("cascade").notNull(),
				)
				.addColumn("amount", "float8", (col) => col.notNull())
				.execute();

			await kysely.schema
				.createTable("BaseBuilding_BaseStorage")
				.ifNotExists()
				.addColumn("id", $id, (col) => col.primaryKey())
				.addColumn("baseBuildingId", $id, (col) =>
					col.references("BaseBuilding.id").onDelete("cascade").notNull(),
				)
				.addColumn("baseStorageId", $id, (col) =>
					col.references("BaseStorage.id").onDelete("cascade").notNull(),
				)
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
		};

		await bootstrapCommon();
		await bootstrapResource();
		await bootstrapStorage();
		await bootstrapBaseBuilding();
		await bootstrapBuilding();
	},
});
