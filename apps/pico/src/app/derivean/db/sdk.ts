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
				name:
					// varchar(64) / not nullable
					z.string().min(1),
				cycles:
					// INTEGER / not nullable
					z.number().int(),
				sort:
					// INTEGER / not nullable
					z.number().int(),
				limit:
					// INTEGER / not nullable
					z.number().int(),
			}),
		),
		shape,
		filter,
		sort: ["id", "name", "cycles", "sort", "limit"],
	});
};

export type BlueprintEntity = ReturnType<typeof withBlueprintSchema>["~entity"];

export const withBlueprintConflictSchema = <
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
				conflictId:
					// varchar(36) / not nullable
					z.string().min(1),
			}),
		),
		shape,
		filter,
		sort: ["id", "blueprintId", "conflictId"],
	});
};

export type BlueprintConflictEntity = ReturnType<
	typeof withBlueprintConflictSchema
>["~entity"];

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

export const withBlueprintInventorySchema = <
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
				inventoryId:
					// varchar(36) / not nullable
					z.string().min(1),
			}),
		),
		shape,
		filter,
		sort: ["id", "blueprintId", "inventoryId"],
	});
};

export type BlueprintInventoryEntity = ReturnType<
	typeof withBlueprintInventorySchema
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
			}),
		),
		shape,
		filter,
		sort: ["id", "blueprintId", "resourceId", "amount", "cycles"],
	});
};

export type BlueprintProductionEntity = ReturnType<
	typeof withBlueprintProductionSchema
>["~entity"];

export const withBlueprintProductionDependencySchema = <
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
				blueprintId:
					// varchar(36) / not nullable
					z.string().min(1),
			}),
		),
		shape,
		filter,
		sort: ["id", "blueprintProductionId", "blueprintId"],
	});
};

export type BlueprintProductionDependencyEntity = ReturnType<
	typeof withBlueprintProductionDependencySchema
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

export const withBlueprintProductionResourceSchema = <
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
			}),
		),
		shape,
		filter,
		sort: ["id", "blueprintProductionId", "resourceId", "amount"],
	});
};

export type BlueprintProductionResourceEntity = ReturnType<
	typeof withBlueprintProductionResourceSchema
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
				constructionId:
					// varchar(36) / nullable
					z.string().nullish(),
				productionId:
					// varchar(36) / nullable
					z.string().nullish(),
				recurringProductionId:
					// varchar(36) / nullable
					z.string().nullish(),
				x:
					// float4 / not nullable
					z.number(),
				y:
					// float4 / not nullable
					z.number(),
			}),
		),
		shape,
		filter,
		sort: [
			"id",
			"userId",
			"blueprintId",
			"constructionId",
			"productionId",
			"recurringProductionId",
			"x",
			"y",
		],
	});
};

export type BuildingEntity = ReturnType<typeof withBuildingSchema>["~entity"];

export const withBuildingInventorySchema = <
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
				buildingId:
					// varchar(36) / not nullable
					z.string().min(1),
				inventoryId:
					// varchar(36) / not nullable
					z.string().min(1),
			}),
		),
		shape,
		filter,
		sort: ["id", "buildingId", "inventoryId"],
	});
};

export type BuildingInventoryEntity = ReturnType<
	typeof withBuildingInventorySchema
>["~entity"];

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
				plan:
					// boolean / not nullable
					withBoolSchema(),
				valid:
					// boolean / not nullable
					withBoolSchema(),
				cycles:
					// INTEGER / not nullable
					z.number().int(),
				cycle:
					// INTEGER / not nullable
					z.number().int(),
			}),
		),
		shape,
		filter,
		sort: ["id", "userId", "plan", "valid", "cycles", "cycle"],
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
				type:
					// varchar(16) / not nullable
					z.string().min(1),
			}),
		),
		shape,
		filter,
		sort: ["id", "resourceId", "amount", "limit", "type"],
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
				cycles:
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
			"cycles",
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
				transport:
					// float4 / not nullable
					z.number(),
			}),
		),
		shape,
		filter,
		sort: ["id", "name", "transport"],
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

export const withRouteSchema = <
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
				fromId:
					// varchar(36) / not nullable
					z.string().min(1),
				toId:
					// varchar(36) / not nullable
					z.string().min(1),
			}),
		),
		shape,
		filter,
		sort: ["id", "userId", "fromId", "toId"],
	});
};

export type RouteEntity = ReturnType<typeof withRouteSchema>["~entity"];

export const withRouteResourceSchema = <
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
				routeId:
					// varchar(36) / not nullable
					z.string().min(1),
				resourceId:
					// varchar(36) / not nullable
					z.string().min(1),
				type:
					// varchar(16) / not nullable
					z.string().min(1),
				amount:
					// float4 / nullable
					z.number().nullish(),
			}),
		),
		shape,
		filter,
		sort: ["id", "routeId", "resourceId", "type", "amount"],
	});
};

export type RouteResourceEntity = ReturnType<
	typeof withRouteResourceSchema
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

export interface Database {
	Blueprint: BlueprintEntity;
	Blueprint_Conflict: BlueprintConflictEntity;
	Blueprint_Dependency: BlueprintDependencyEntity;
	Blueprint_Inventory: BlueprintInventoryEntity;
	Blueprint_Production: BlueprintProductionEntity;
	Blueprint_Production_Dependency: BlueprintProductionDependencyEntity;
	Blueprint_Production_Requirement: BlueprintProductionRequirementEntity;
	Blueprint_Production_Resource: BlueprintProductionResourceEntity;
	Blueprint_Requirement: BlueprintRequirementEntity;
	Building: BuildingEntity;
	Building_Inventory: BuildingInventoryEntity;
	Construction: ConstructionEntity;
	Cycle: CycleEntity;
	Default_Inventory: DefaultInventoryEntity;
	Inventory: InventoryEntity;
	Production: ProductionEntity;
	Resource: ResourceEntity;
	Resource_Tag: ResourceTagEntity;
	Route: RouteEntity;
	Route_Resource: RouteResourceEntity;
	Tag: TagEntity;
	User: UserEntity;
}
