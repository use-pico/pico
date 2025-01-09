import { withListCount } from "@use-pico/client";
import type { CursorSchema } from "@use-pico/common";
import type { Transaction } from "kysely";
import { z } from "zod";
import type { BuildingSchema } from "~/app/derivean/building/BuildingSchema";
import type { Database } from "~/app/derivean/db/sdk";

export namespace withBuildingListCount {
	export interface Props {
		tx: Transaction<Database>;
		filter?: BuildingSchema["~filter"];
		cursor?: CursorSchema.Type;
	}
}

export const withBuildingListCount = async ({
	tx,
	filter,
	cursor,
}: withBuildingListCount.Props) => {
	return withListCount({
		select: tx
			.selectFrom("Building as b")
			.innerJoin("Building_Base as bb", "bb.id", "b.buildingBaseId")
			.innerJoin("Resource as r", "r.id", "bb.resourceId")
			.select(["b.id", "bb.resourceId", "r.name", "b.buildingBaseId"]),
		output: z.object({
			id: z.string().min(1),
			resourceId: z.string().min(1),
			buildingBaseId: z.string().min(1),
			name: z.string().min(1),
		}),
		filter,
		cursor,
	});
};
