import { Card, Tx } from "@use-pico/client";
import type { IdentitySchema } from "@use-pico/common";
import type { FC } from "react";

export namespace Building_Card {
	export interface Data extends IdentitySchema.Type {
		name: string;
	}

	export interface Props extends Card.PropsEx<Data> {
		//
	}
}

export const Building_Card: FC<Building_Card.Props> = (props) => {
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
