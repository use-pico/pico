import type { InventorySchema } from "~/app/derivean/inventory/InventorySchema";
import type { ResourceSchema } from "~/app/derivean/resource/ResourceSchema";

export namespace inventoryCheck {
	export interface Requirement {
		id: string;
		resourceId: string;
		resource: ResourceSchema["~output"];
		amount: number;
		passive: boolean;
	}

	export interface Props {
		inventory: InventorySchema["~output-array"];
		requirements: Requirement[];
	}

	export interface Result {
		/**
		 * True - inventory fulfils all requirements
		 */
		check: boolean;
		/**
		 * List of missing requirements if any.
		 */
		missing: Requirement[];
	}
}

export const inventoryCheck = ({
	inventory,
	requirements,
}: inventoryCheck.Props) => {
	const missing: inventoryCheck.Requirement[] = [];

	for (const requirement of requirements) {
		const found = inventory.find(
			(item) => item.resourceId === requirement.resourceId,
		);

		if (!found) {
			missing.push(requirement);
		} else if (found.amount < requirement.amount) {
			missing.push({
				...requirement,
				amount: requirement.amount - found.amount,
			});
		}
	}

	if (missing.length) {
		return {
			check: false,
			missing,
		};
	}

	return {
		check: true,
		missing,
	};
};
