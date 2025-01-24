import type { WithTransaction } from "~/app/derivean/db/WithTransaction";

export namespace withMapGenerator {
	export interface Props {
		tx: WithTransaction;
	}
}

export const withMapGenerator = async (props: withMapGenerator.Props) => {
	//
};
