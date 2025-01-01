import { Card, Tx } from "@use-pico/client";
import type { withRepositorySchema } from "@use-pico/common";
import type { FC } from "react";
import type { BuildingSchema } from "~/app/derivean/building/BuildingSchema";

export namespace BuildingCard {
	export interface Props
		extends Card.PropsEx<withRepositorySchema.Output<BuildingSchema>> {
		//
	}
}

export const BuildingCard: FC<BuildingCard.Props> = (props) => {
	return (
		<Card
			items={[
				{
					id: "name",
					label: <Tx label={"Building name (label)"} />,
					render({ entity }) {
						return entity.baseBuilding.name;
					},
				},
			]}
			{...props}
		/>
	);
};
