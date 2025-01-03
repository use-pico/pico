import type { resourceSumOf } from "~/app/derivean/resource/resourceSumOf";

export namespace resourceCheckOf {
	export interface Requirement {
		resourceId: string;
		amount: number;
	}

	export interface Props {
		requirements: Requirement[];
		resources: resourceSumOf.Result;
	}
}

export const resourceCheckOf = ({
	requirements,
	resources,
}: resourceCheckOf.Props) => {
	for (const requirement of requirements) {
		if ((resources[requirement.resourceId] || -1) < requirement.amount) {
			return false;
		}
	}

	return true;
};
