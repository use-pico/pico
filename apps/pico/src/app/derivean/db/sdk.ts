import {
    IdentitySchema,
    withBoolSchema,
    withSourceSchema,
    type FilterSchema,
    type ShapeSchema,
} from "@use-pico/common";
import { z } from "zod";

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
				buildingBaseId:
					// varchar(36) / not nullable
					z.string().min(1),
			}),
		),
		shape,
		filter,
		sort: ["id", "userId", "buildingBaseId"],
	});
};

export type BuildingEntity = ReturnType<typeof withBuildingSchema>["~entity"];

export const withBuildingBaseSchema = <
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
				productionLimit:
					// INTEGER / not nullable
					z.number().int(),
			}),
		),
		shape,
		filter,
		sort: ["id", "name", "cycles", "productionLimit"],
	});
};

export type BuildingBaseEntity = ReturnType<
	typeof withBuildingBaseSchema
>["~entity"];

export const withBuildingBaseBuildingBaseRequirementSchema = <
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
				buildingBaseId:
					// varchar(36) / not nullable
					z.string().min(1),
				requirementId:
					// varchar(36) / not nullable
					z.string().min(1),
				amount:
					// float4 / not nullable
					z.number(),
			}),
		),
		shape,
		filter,
		sort: ["id", "buildingBaseId", "requirementId", "amount"],
	});
};

export type BuildingBaseBuildingBaseRequirementEntity = ReturnType<
	typeof withBuildingBaseBuildingBaseRequirementSchema
>["~entity"];

export const withBuildingBaseInventorySchema = <
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
				buildingBaseId:
					// varchar(36) / not nullable
					z.string().min(1),
				inventoryId:
					// varchar(36) / not nullable
					z.string().min(1),
			}),
		),
		shape,
		filter,
		sort: ["id", "buildingBaseId", "inventoryId"],
	});
};

export type BuildingBaseInventoryEntity = ReturnType<
	typeof withBuildingBaseInventorySchema
>["~entity"];

export const withBuildingBaseProductionSchema = <
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
				buildingBaseId:
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
		sort: ["id", "buildingBaseId", "resourceId", "amount", "cycles", "limit"],
	});
};

export type BuildingBaseProductionEntity = ReturnType<
	typeof withBuildingBaseProductionSchema
>["~entity"];

export const withBuildingBaseProductionRequirementSchema = <
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
				buildingBaseProductionId:
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
		sort: ["id", "buildingBaseProductionId", "resourceId", "amount", "passive"],
	});
};

export type BuildingBaseProductionRequirementEntity = ReturnType<
	typeof withBuildingBaseProductionRequirementSchema
>["~entity"];

export const withBuildingBaseResourceRequirementSchema = <
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
				buildingBaseId:
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
		sort: ["id", "buildingBaseId", "resourceId", "amount", "passive"],
	});
};

export type BuildingBaseResourceRequirementEntity = ReturnType<
	typeof withBuildingBaseResourceRequirementSchema
>["~entity"];

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

export const withBuildingQueueSchema = <
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
				buildingBaseId:
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
		sort: ["id", "userId", "buildingBaseId", "from", "to", "cycle"],
	});
};

export type BuildingQueueEntity = ReturnType<
	typeof withBuildingQueueSchema
>["~entity"];

export const withBuildingResourceQueueSchema = <
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
				resourceId:
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
		sort: ["id", "userId", "buildingId", "resourceId", "from", "to", "cycle"],
	});
};

export type BuildingResourceQueueEntity = ReturnType<
	typeof withBuildingResourceQueueSchema
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
	Building: BuildingEntity;
	Building_Base: BuildingBaseEntity;
	Building_Base_Building_Base_Requirement: BuildingBaseBuildingBaseRequirementEntity;
	Building_Base_Inventory: BuildingBaseInventoryEntity;
	Building_Base_Production: BuildingBaseProductionEntity;
	Building_Base_Production_Requirement: BuildingBaseProductionRequirementEntity;
	Building_Base_Resource_Requirement: BuildingBaseResourceRequirementEntity;
	Building_Inventory: BuildingInventoryEntity;
	Building_Queue: BuildingQueueEntity;
	Building_Resource_Queue: BuildingResourceQueueEntity;
	Cycle: CycleEntity;
	Default_Inventory: DefaultInventoryEntity;
	Inventory: InventoryEntity;
	Resource: ResourceEntity;
	Resource_Tag: ResourceTagEntity;
	Tag: TagEntity;
	User: UserEntity;
	User_Inventory: UserInventoryEntity;
}
