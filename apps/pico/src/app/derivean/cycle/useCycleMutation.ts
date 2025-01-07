import { useMutation } from "@tanstack/react-query";
import { useSourceInvalidator } from "@use-pico/client";
import { BuildingSource } from "~/app/derivean/building/BuildingSource";
import { CycleSource } from "~/app/derivean/cycle/CycleSource";
import { withCycle } from "~/app/derivean/cycle/withCycle";
import { kysely } from "~/app/derivean/db/db";

export namespace useCycleMutation {
	export interface Props {
		userId: string;
	}
}

export const useCycleMutation = ({ userId }: useCycleMutation.Props) => {
	const invalidator = useSourceInvalidator({
		sources: [CycleSource, BuildingSource],
	});

	return useMutation({
		mutationKey: ["useCycleMutation"],
		async mutationFn() {
			return kysely.transaction().execute(async (tx) => {
				return withCycle({ tx, userId });
			});
		},
		async onSuccess() {
			await invalidator();
		},
	});
};
