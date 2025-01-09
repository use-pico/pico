import type { Transaction } from "kysely";
import type { Database } from "~/app/derivean/db/sdk";
import { withDefaultInventory } from "~/app/derivean/inventory/withDefaultInventory";

export namespace withDefaultKingdom {
	export interface Props {
		tx: Transaction<Database>;
		userId: string;
	}
}

export const withDefaultKingdom = async ({
	tx,
	userId,
}: withDefaultKingdom.Props) => {
	await withDefaultInventory({
		tx,
		userId,
	});
};
