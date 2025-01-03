export namespace resourceSumOf {
	export interface Type {
		resourceId: string;
		amount: number;
	}

	export interface Props {
		resources: Type[];
	}

	export type Result = Record<string, number>;
}

export const resourceSumOf = ({ resources }: resourceSumOf.Props) => {
	return resources.reduce<Record<string, number>>((acc, resource) => {
		if (!acc[resource.resourceId]) {
			acc[resource.resourceId] = 0;
		}
		acc[resource.resourceId]! += resource.amount;
		return acc;
	}, {});
};
