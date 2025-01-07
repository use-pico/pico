import type { BuildingBaseSchema } from "~/app/derivean/building/base/BuildingBaseSchema";
import type { BuildingSchema } from "~/app/derivean/building/BuildingSchema";
import type { CycleSchema } from "~/app/derivean/cycle/CycleSchema";
import type { DefaultInventorySchema } from "~/app/derivean/inventory/default/DefaultInventorySchema";
import type { InventorySchema } from "~/app/derivean/inventory/InventorySchema";
import type { ResourceSchema } from "~/app/derivean/resource/ResourceSchema";
import type { ResourceTagSchema } from "~/app/derivean/resource/tag/ResourceTagSchema";
import type { TagSchema } from "~/app/derivean/tag/TagSchema";
import type { UserInventorySchema } from "~/app/derivean/user/inventory/UserInventorySchema";
import type { UserSchema } from "~/app/derivean/user/UserSchema";

export interface Database {
	User: UserSchema["~entity"];
	Tag: TagSchema["~entity"];

	Cycle: CycleSchema["~entity"];

	Resource: ResourceSchema["~entity"];
	Resource_Tag: ResourceTagSchema["~entity"];

	Inventory: InventorySchema["~entity"];
	Default_Inventory: DefaultInventorySchema["~entity"];
	User_Inventory: UserInventorySchema["~entity"];

	Building_Base: BuildingBaseSchema["~entity"];
	Building: BuildingSchema["~entity"];
	// // Building_Base_: BaseBuildingRequirementSchema["~entity"];
	// ["BaseBuilding-Limit"]: BaseBuildingLimitSchema["~entity"];
	// ["BaseBuilding-Production"]: BaseBuildingProductionSchema["~entity"];
	// BaseBuildingProductionRequirement: BaseBuildingProductionRequirementSchema["~entity"];

	// Building: BuildingSchema["~entity"];
	// Building_Resource: BuildingResourceSchema["~entity"];
	// BuildingQueue: BuildingQueueSchema["~entity"];
	// BuildingProductionQueue: BuildingProductionQueueSchema["~entity"];
}
