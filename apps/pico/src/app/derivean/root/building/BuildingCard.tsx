import { Card, Tx } from "@use-pico/client";
import type { IdentitySchema } from "@use-pico/common";
import type { FC } from "react";

interface Data extends IdentitySchema.Type {
	name: string;
}

export namespace BuildingCard {
	export interface Props extends Card.PropsEx<Data> {
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
						return entity.name;
					},
				},
			]}
			{...props}
		/>
	);
};
