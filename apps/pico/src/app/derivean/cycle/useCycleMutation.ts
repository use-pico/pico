import { useMutation } from "@tanstack/react-query";
import { withCycle } from "~/app/derivean/cycle/withCycle";
import { kysely } from "~/app/derivean/db/db";

export namespace useCycleMutation {
	export interface Props {
		userId: string;
	}
}

export const useCycleMutation = ({ userId }: useCycleMutation.Props) => {
	return useMutation({
		mutationKey: ["useCycleMutation"],
		async mutationFn() {
			return kysely.transaction().execute(async (tx) => {
				return withCycle({ tx, userId });
			});
		},
	});
};
