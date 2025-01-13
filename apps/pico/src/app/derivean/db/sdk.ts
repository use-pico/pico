import {
    IdentitySchema,
    withBoolSchema,
    withSourceSchema,
    type FilterSchema,
    type ShapeSchema,
} from "@use-pico/common";
import { z } from "zod";

export const withBlueprintSchema = <
	TShapeSchema extends ShapeSchema,
	TFilterSchema extends FilterSchema,
>({
	shape,
	filter,
}: {
	shape: TShapeSchema;
	filter: TFilterSchema;
}) => {
	return withSourceSchema({
		entity: IdentitySchema.merge(
			z.object({
				upgradeId:
					// varchar(36) / nullable
					z.string().nullish(),
				name:
					// varchar(64) / not nullable
					z.string().min(1),
				cycles:
					// INTEGER / not nullable
					z.number().int(),
				productionLimit:
					// INTEGER / not nullable
					z.number().int(),
				sort:
					// INTEGER / not nullable
					z.number().int(),
			}),
		),
		shape,
		filter,
		sort: ["id", "upgradeId", "name", "cycles", "productionLimit", "sort"],
	});
};

export type BlueprintEntity = ReturnType<typeof withBlueprintSchema>["~entity"];

export const withBlueprintDependencySchema = <
	TShapeSchema extends ShapeSchema,
	TFilterSchema extends FilterSchema,
>({
	shape,
	filter,
}: {
	shape: TShapeSchema;
	filter: TFilterSchema;
}) => {
	return withSourceSchema({
		entity: IdentitySchema.merge(
			z.object({
				blueprintId:
					// varchar(36) / not nullable
					z.string().min(1),
				dependencyId:
					// varchar(36) / not nullable
					z.string().min(1),
			}),
		),
		shape,
		filter,
		sort: ["id", "blueprintId", "dependencyId"],
	});
};

export type BlueprintDependencyEntity = ReturnType<
	typeof withBlueprintDependencySchema
>["~entity"];

export const withBlueprintProductionSchema = <
	TShapeSchema extends ShapeSchema,
	TFilterSchema extends FilterSchema,
>({
	shape,
	filter,
}: {
	shape: TShapeSchema;
	filter: TFilterSchema;
}) => {
	return withSourceSchema({
		entity: IdentitySchema.merge(
			z.object({
				blueprintId:
					// varchar(36) / not nullable
					z.string().min(1),
				resourceId:
					// varchar(36) / not nullable
					z.string().min(1),
				amount:
					// float4 / not nullable
					z.number(),
				cycles:
					// INTEGER / not nullable
					z.number().int(),
				limit:
					// INTEGER / not nullable
					z.number().int(),
			}),
		),
		shape,
		filter,
		sort: ["id", "blueprintId", "resourceId", "amount", "cycles", "limit"],
	});
};

export type BlueprintProductionEntity = ReturnType<
	typeof withBlueprintProductionSchema
>["~entity"];

export const withBlueprintProductionRequirementSchema = <
	TShapeSchema extends ShapeSchema,
	TFilterSchema extends FilterSchema,
>({
	shape,
	filter,
}: {
	shape: TShapeSchema;
	filter: TFilterSchema;
}) => {
	return withSourceSchema({
		entity: IdentitySchema.merge(
			z.object({
				blueprintProductionId:
					// varchar(36) / not nullable
					z.string().min(1),
				resourceId:
					// varchar(36) / not nullable
					z.string().min(1),
				amount:
					// float4 / not nullable
					z.number(),
				passive:
					// boolean / not nullable
					withBoolSchema(),
			}),
		),
		shape,
		filter,
		sort: ["id", "blueprintProductionId", "resourceId", "amount", "passive"],
	});
};

export type BlueprintProductionRequirementEntity = ReturnType<
	typeof withBlueprintProductionRequirementSchema
>["~entity"];

export const withBlueprintRequirementSchema = <
	TShapeSchema extends ShapeSchema,
	TFilterSchema extends FilterSchema,
>({
	shape,
	filter,
}: {
	shape: TShapeSchema;
	filter: TFilterSchema;
}) => {
	return withSourceSchema({
		entity: IdentitySchema.merge(
			z.object({
				blueprintId:
					// varchar(36) / not nullable
					z.string().min(1),
				resourceId:
					// varchar(36) / not nullable
					z.string().min(1),
				amount:
					// float4 / not nullable
					z.number(),
				passive:
					// boolean / not nullable
					withBoolSchema(),
			}),
		),
		shape,
		filter,
		sort: ["id", "blueprintId", "resourceId", "amount", "passive"],
	});
};

export type BlueprintRequirementEntity = ReturnType<
	typeof withBlueprintRequirementSchema
>["~entity"];

export const withBuildingSchema = <
	TShapeSchema extends ShapeSchema,
	TFilterSchema extends FilterSchema,
>({
	shape,
	filter,
}: {
	shape: TShapeSchema;
	filter: TFilterSchema;
}) => {
	return withSourceSchema({
		entity: IdentitySchema.merge(
			z.object({
				userId:
					// varchar(36) / not nullable
					z.string().min(1),
				blueprintId:
					// varchar(36) / not nullable
					z.string().min(1),
				isUpgraded:
					// boolean / not nullable
					withBoolSchema(),
			}),
		),
		shape,
		filter,
		sort: ["id", "userId", "blueprintId", "isUpgraded"],
	});
};

export type BuildingEntity = ReturnType<typeof withBuildingSchema>["~entity"];

export const withConstructionSchema = <
	TShapeSchema extends ShapeSchema,
	TFilterSchema extends FilterSchema,
>({
	shape,
	filter,
}: {
	shape: TShapeSchema;
	filter: TFilterSchema;
}) => {
	return withSourceSchema({
		entity: IdentitySchema.merge(
			z.object({
				userId:
					// varchar(36) / not nullable
					z.string().min(1),
				blueprintId:
					// varchar(36) / not nullable
					z.string().min(1),
				from:
					// INTEGER / not nullable
					z.number().int(),
				to:
					// INTEGER / not nullable
					z.number().int(),
				cycle:
					// INTEGER / not nullable
					z.number().int(),
			}),
		),
		shape,
		filter,
		sort: ["id", "userId", "blueprintId", "from", "to", "cycle"],
	});
};

export type ConstructionEntity = ReturnType<
	typeof withConstructionSchema
>["~entity"];

export const withCycleSchema = <
	TShapeSchema extends ShapeSchema,
	TFilterSchema extends FilterSchema,
>({
	shape,
	filter,
}: {
	shape: TShapeSchema;
	filter: TFilterSchema;
}) => {
	return withSourceSchema({
		entity: IdentitySchema.merge(
			z.object({
				userId:
					// varchar(36) / not nullable
					z.string().min(1),
				stamp:
					// datetime / not nullable
					z.string(),
			}),
		),
		shape,
		filter,
		sort: ["id", "userId", "stamp"],
	});
};

export type CycleEntity = ReturnType<typeof withCycleSchema>["~entity"];

export const withDefaultInventorySchema = <
	TShapeSchema extends ShapeSchema,
	TFilterSchema extends FilterSchema,
>({
	shape,
	filter,
}: {
	shape: TShapeSchema;
	filter: TFilterSchema;
}) => {
	return withSourceSchema({
		entity: IdentitySchema.merge(
			z.object({
				resourceId:
					// varchar(36) / not nullable
					z.string().min(1),
				amount:
					// float4 / not nullable
					z.number(),
				limit:
					// float4 / not nullable
					z.number(),
			}),
		),
		shape,
		filter,
		sort: ["id", "resourceId", "amount", "limit"],
	});
};

export type DefaultInventoryEntity = ReturnType<
	typeof withDefaultInventorySchema
>["~entity"];

export const withInventorySchema = <
	TShapeSchema extends ShapeSchema,
	TFilterSchema extends FilterSchema,
>({
	shape,
	filter,
}: {
	shape: TShapeSchema;
	filter: TFilterSchema;
}) => {
	return withSourceSchema({
		entity: IdentitySchema.merge(
			z.object({
				resourceId:
					// varchar(36) / not nullable
					z.string().min(1),
				amount:
					// float4 / not nullable
					z.number(),
				limit:
					// float4 / not nullable
					z.number(),
			}),
		),
		shape,
		filter,
		sort: ["id", "resourceId", "amount", "limit"],
	});
};

export type InventoryEntity = ReturnType<typeof withInventorySchema>["~entity"];

export const withProductionSchema = <
	TShapeSchema extends ShapeSchema,
	TFilterSchema extends FilterSchema,
>({
	shape,
	filter,
}: {
	shape: TShapeSchema;
	filter: TFilterSchema;
}) => {
	return withSourceSchema({
		entity: IdentitySchema.merge(
			z.object({
				userId:
					// varchar(36) / not nullable
					z.string().min(1),
				buildingId:
					// varchar(36) / not nullable
					z.string().min(1),
				blueprintProductionId:
					// varchar(36) / not nullable
					z.string().min(1),
				from:
					// INTEGER / not nullable
					z.number().int(),
				to:
					// INTEGER / not nullable
					z.number().int(),
				cycle:
					// INTEGER / not nullable
					z.number().int(),
			}),
		),
		shape,
		filter,
		sort: [
			"id",
			"userId",
			"buildingId",
			"blueprintProductionId",
			"from",
			"to",
			"cycle",
		],
	});
};

export type ProductionEntity = ReturnType<
	typeof withProductionSchema
>["~entity"];

export const withResourceSchema = <
	TShapeSchema extends ShapeSchema,
	TFilterSchema extends FilterSchema,
>({
	shape,
	filter,
}: {
	shape: TShapeSchema;
	filter: TFilterSchema;
}) => {
	return withSourceSchema({
		entity: IdentitySchema.merge(
			z.object({
				name:
					// varchar(64) / not nullable
					z.string().min(1),
			}),
		),
		shape,
		filter,
		sort: ["id", "name"],
	});
};

export type ResourceEntity = ReturnType<typeof withResourceSchema>["~entity"];

export const withResourceTagSchema = <
	TShapeSchema extends ShapeSchema,
	TFilterSchema extends FilterSchema,
>({
	shape,
	filter,
}: {
	shape: TShapeSchema;
	filter: TFilterSchema;
}) => {
	return withSourceSchema({
		entity: IdentitySchema.merge(
			z.object({
				resourceId:
					// varchar(36) / not nullable
					z.string().min(1),
				tagId:
					// varchar(36) / not nullable
					z.string().min(1),
			}),
		),
		shape,
		filter,
		sort: ["id", "resourceId", "tagId"],
	});
};

export type ResourceTagEntity = ReturnType<
	typeof withResourceTagSchema
>["~entity"];

export const withTagSchema = <
	TShapeSchema extends ShapeSchema,
	TFilterSchema extends FilterSchema,
>({
	shape,
	filter,
}: {
	shape: TShapeSchema;
	filter: TFilterSchema;
}) => {
	return withSourceSchema({
		entity: IdentitySchema.merge(
			z.object({
				code:
					// varchar(64) / not nullable
					z.string().min(1),
				label:
					// varchar(128) / not nullable
					z.string().min(1),
				group:
					// varchar(64) / nullable
					z.string().nullish(),
				sort:
					// INTEGER / not nullable
					z.number().int(),
			}),
		),
		shape,
		filter,
		sort: ["id", "code", "label", "group", "sort"],
	});
};

export type TagEntity = ReturnType<typeof withTagSchema>["~entity"];

export const withUserSchema = <
	TShapeSchema extends ShapeSchema,
	TFilterSchema extends FilterSchema,
>({
	shape,
	filter,
}: {
	shape: TShapeSchema;
	filter: TFilterSchema;
}) => {
	return withSourceSchema({
		entity: IdentitySchema.merge(
			z.object({
				name:
					// varchar(64) / not nullable
					z.string().min(1),
				login:
					// varchar(128) / not nullable
					z.string().min(1),
				password:
					// varchar(256) / not nullable
					z.string().min(1),
			}),
		),
		shape,
		filter,
		sort: ["id", "name", "login", "password"],
	});
};

export type UserEntity = ReturnType<typeof withUserSchema>["~entity"];

export const withUserInventorySchema = <
	TShapeSchema extends ShapeSchema,
	TFilterSchema extends FilterSchema,
>({
	shape,
	filter,
}: {
	shape: TShapeSchema;
	filter: TFilterSchema;
}) => {
	return withSourceSchema({
		entity: IdentitySchema.merge(
			z.object({
				userId:
					// varchar(36) / not nullable
					z.string().min(1),
				inventoryId:
					// varchar(36) / not nullable
					z.string().min(1),
			}),
		),
		shape,
		filter,
		sort: ["id", "userId", "inventoryId"],
	});
};

export type UserInventoryEntity = ReturnType<
	typeof withUserInventorySchema
>["~entity"];

export interface Database {
	Blueprint: BlueprintEntity;
	Blueprint_Dependency: BlueprintDependencyEntity;
	Blueprint_Production: BlueprintProductionEntity;
	Blueprint_Production_Requirement: BlueprintProductionRequirementEntity;
	Blueprint_Requirement: BlueprintRequirementEntity;
	Building: BuildingEntity;
	Construction: ConstructionEntity;
	Cycle: CycleEntity;
	Default_Inventory: DefaultInventoryEntity;
	Inventory: InventoryEntity;
	Production: ProductionEntity;
	Resource: ResourceEntity;
	Resource_Tag: ResourceTagEntity;
	Tag: TagEntity;
	User: UserEntity;
	User_Inventory: UserInventoryEntity;
}
