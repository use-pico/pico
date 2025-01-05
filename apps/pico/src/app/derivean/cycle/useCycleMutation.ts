import { useMutation } from "@tanstack/react-query";
import { useSourceInvalidator } from "@use-pico/client";
import { CycleSource } from "~/app/derivean/cycle/CycleSource";

export namespace useCycleMutation {
	export interface Props {
		userId: string;
	}
}

export const useCycleMutation = ({ userId }: useCycleMutation.Props) => {
	const invalidator = useSourceInvalidator({
		sources: [CycleSource],
	});

	return useMutation({
		mutationKey: ["useCycleMutation"],
		async mutationFn() {
			return CycleSource.db.transaction().execute(async (tx) => {
				await CycleSource.create$({
					tx,
					shape: {},
					entity: {
						userId,
					},
				});
			});
		},
		async onSuccess() {
			await invalidator();
		},
	});
};
