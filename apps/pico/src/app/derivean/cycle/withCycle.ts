import { DateTime, genId } from "@use-pico/common";
import type { Transaction } from "kysely";
import type { Database } from "~/app/derivean/db/Database";

export namespace withCycle {
	export interface Props {
		tx: Transaction<Database>;
		userId: string;
	}
}

export const withCycle = async ({ tx, userId }: withCycle.Props) => {
	await tx
		.insertInto("Cycle")
		.values({
			id: genId(),
			stamp: DateTime.now().toUTC().toSQLTime(),
			userId,
		})
		.execute();

	const cycles = (
		await tx
			.selectFrom("Cycle as c")
			.select((eb) => eb.fn.count<number>("c.id").as("count"))
			.where("c.userId", "=", userId)
			.executeTakeFirstOrThrow()
	).count;
};
