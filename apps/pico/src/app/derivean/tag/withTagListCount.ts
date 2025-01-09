import { withListCount } from "@use-pico/client";
import type { CursorSchema } from "@use-pico/common";
import type { Transaction } from "kysely";
import type { Database } from "~/app/derivean/db/sdk";
import { TagSchema } from "~/app/derivean/tag/TagSchema";

export namespace withTagListCount {
	export interface Props {
		tx: Transaction<Database>;
		filter?: TagSchema["~filter"];
		cursor?: CursorSchema.Type;
	}
}

export const withTagListCount = async ({
	tx,
	filter,
	cursor,
}: withTagListCount.Props) => {
	return withListCount({
		select: tx
			.selectFrom("Tag as t")
			.select(["t.id", "t.code", "t.label", "t.group", "t.sort"]),
		query({ select, where }) {
			let $select = select;

			if (where?.id) {
				$select = $select.where("t.id", "=", where.id);
			}

			if (where?.idIn) {
				$select = $select.where("t.id", "in", where.idIn);
			}

			if (where?.code) {
				$select = $select.where("t.code", "=", where.code);
			}

			if (where?.group) {
				$select = $select.where("t.group", "=", where.group);
			}

			if (where?.fulltext) {
				const fulltext = `%${where.fulltext}%`.toLowerCase();

				$select = $select.where((eb) => {
					return eb.or([
						eb("t.id", "like", `%${fulltext}%`),
						eb("t.code", "like", `%${fulltext}%`),
						eb("t.group", "like", `%${fulltext}%`),
						eb("t.label", "like", `%${fulltext}%`),
					]);
				});
			}

			return $select;
		},
		output: TagSchema.entity,
		filter,
		cursor,
	});
};
