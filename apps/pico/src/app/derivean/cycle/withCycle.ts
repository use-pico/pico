import type { Transaction } from "kysely";
import { CycleSource } from "~/app/derivean/cycle/CycleSource";
import type { Database } from "~/app/derivean/db/Database";

export namespace withCycle {
	export interface Props {
		tx: Transaction<Database>;
		userId: string;
	}
}

export const withCycle = async ({ tx, userId }: withCycle.Props) => {
	await CycleSource.create$({
		tx,
		shape: {},
		entity: {
			userId,
		},
	});

	const { filter: cycles } = await CycleSource.count$({
		tx,
		where: { userId },
	});
};
