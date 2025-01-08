export namespace inventoryCheck {
	export interface Inventory {
		resourceId: string;
		amount: number;
	}

	export interface Requirement {
		resourceId: string;
		amount: number;
	}

	export interface Props {
		inventory: Inventory[];
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
