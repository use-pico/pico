import { genId } from "@use-pico/common";
import type { WithTransaction } from "~/app/derivean/db/WithTransaction";

export namespace withMapGenerator {
	export interface Props {
		tx: WithTransaction;
		userId: string;
		name: string;
	}
}

export const withMapGenerator = async ({
	tx,
	userId,
	name,
}: withMapGenerator.Props) => {
	const map = await tx
		.insertInto("Map")
		.values({
			id: genId(),
			userId,
			name,
		})
		.execute();
};
