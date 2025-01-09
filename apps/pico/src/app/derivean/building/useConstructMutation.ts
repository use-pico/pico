import { useMutation } from "@tanstack/react-query";
import { toast, withToastPromiseTx } from "@use-pico/client";
import { withConstruct } from "~/app/derivean/building/withConstruct";
import { kysely } from "~/app/derivean/db/kysely";

export namespace useConstructMutation {
	export interface Props {
		userId: string;
	}
}

export const useConstructMutation = ({
	userId,
}: useConstructMutation.Props) => {
	return useMutation({
		mutationKey: ["useConstructMutation"],
		async mutationFn({ baseBuildingId }: { baseBuildingId: string }) {
			return kysely.transaction().execute(async (tx) => {
				return toast.promise(
					withConstruct({
						tx,
						baseBuildingId,
						userId,
					}),
					withToastPromiseTx("Construction queue"),
				);
			});
		},
	});
};
