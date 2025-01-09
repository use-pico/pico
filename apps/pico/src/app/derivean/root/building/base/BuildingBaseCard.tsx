import { Card, Tx } from "@use-pico/client";
import { toHumanNumber, type IdentitySchema } from "@use-pico/common";
import type { FC } from "react";

interface Data extends IdentitySchema.Type {
	name: string;
	cycles: number;
	// requirements: (ResourceRequirementSchema["~entity"] & {
	// 	name: string;
	// })[];
}

export namespace BuildingBaseCard {
	export interface Props extends Card.PropsEx<Data> {
		//
	}
}

export const BuildingBaseCard: FC<BuildingBaseCard.Props> = (props) => {
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
				{
					id: "cycles",
					label: <Tx label={"Construction cycles (label)"} />,
					render({ entity }) {
						return toHumanNumber({ number: entity.cycles });
					},
				},
				{
					id: "requirements",
					label: <Tx label={"Resource requirements (label)"} />,
					render({ entity }) {
						return "nope";
						// return (
						// 	<RequirementsInline
						// 		requirements={entity.requirements}
						// 		textEmpty={<Tx label={"No requirements (label)"} />}
						// 	/>
						// );
					},
				},
				{
					id: "production",
					label: <Tx label={"Resource production (label)"} />,
					render({ entity }) {
						return "json select resource production info";
					},
				},
			]}
			{...props}
		/>
	);
};
