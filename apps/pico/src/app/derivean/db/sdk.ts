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
				level:
					// INTEGER / not nullable
					z.number().int(),
			}),
		),
		shape,
		filter,
		sort: ["id", "userId", "buildingBaseId", "level"],
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
				resourceId:
					// varchar(36) / not nullable
					z.string().min(1),
				cycles:
					// INTEGER / not nullable
					z.number().int(),
			}),
		),
		shape,
		filter,
		sort: ["id", "resourceId", "cycles"],
	});
};

export type BuildingBaseEntity = ReturnType<
	typeof withBuildingBaseSchema
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
				level:
					// INTEGER / not nullable
					z.number().int(),
			}),
		),
		shape,
		filter,
		sort: ["id", "buildingBaseId", "inventoryId", "level"],
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
			}),
		),
		shape,
		filter,
		sort: ["id", "buildingBaseId", "resourceId"],
	});
};

export type BuildingBaseProductionEntity = ReturnType<
	typeof withBuildingBaseProductionSchema
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

export const withResourceProductionSchema = <
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
				level:
					// INTEGER / not nullable
					z.number().int(),
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
		sort: ["id", "resourceId", "level", "amount", "cycles", "limit"],
	});
};

export type ResourceProductionEntity = ReturnType<
	typeof withResourceProductionSchema
>["~entity"];

export const withResourceProductionQueueSchema = <
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
		sort: ["id", "userId", "resourceId", "from", "to", "cycle"],
	});
};

export type ResourceProductionQueueEntity = ReturnType<
	typeof withResourceProductionQueueSchema
>["~entity"];

export const withResourceProductionRequirementSchema = <
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
				requirementId:
					// varchar(36) / not nullable
					z.string().min(1),
				level:
					// INTEGER / not nullable
					z.number().int(),
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
		sort: ["id", "resourceId", "requirementId", "level", "amount", "passive"],
	});
};

export type ResourceProductionRequirementEntity = ReturnType<
	typeof withResourceProductionRequirementSchema
>["~entity"];

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
	Building_Base_Inventory: BuildingBaseInventoryEntity;
	Building_Base_Production: BuildingBaseProductionEntity;
	Cycle: CycleEntity;
	Default_Inventory: DefaultInventoryEntity;
	Inventory: InventoryEntity;
	Resource: ResourceEntity;
	Resource_Production: ResourceProductionEntity;
	Resource_Production_Queue: ResourceProductionQueueEntity;
	Resource_Production_Requirement: ResourceProductionRequirementEntity;
	Resource_Tag: ResourceTagEntity;
	Tag: TagEntity;
	User: UserEntity;
	User_Inventory: UserInventoryEntity;
}
