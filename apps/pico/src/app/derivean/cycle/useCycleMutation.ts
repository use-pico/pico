import { useMutation } from "@tanstack/react-query";
import { CycleSource } from "~/app/derivean/cycle/CycleSource";

export namespace useCycleMutation {
	export interface Props {
		userId: string;
	}
}

export const useCycleMutation = ({ userId }: useCycleMutation.Props) => {
	return useMutation({
		mutationKey: ["useCycleMutation"],
		async mutationFn() {
			CycleSource.db.transaction().execute(async (tx) => {
				await CycleSource.create$({
					tx,
					shape: {},
					entity: {
						userId,
					},
				});
			});
		},
	});
};
