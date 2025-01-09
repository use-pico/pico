import { Card, Tx } from "@use-pico/client";
import { toHumanNumber, type IdentitySchema } from "@use-pico/common";
import type { FC } from "react";
import type { ResourceRequirementSchema } from "~/app/derivean/resource/requirement/ResourceRequirementSchema";
import { RequirementsInline } from "~/app/derivean/root/resource/ResourceInline";

interface Data extends IdentitySchema.Type {
	name: string;
	cycles: number;
	requirements: (ResourceRequirementSchema["~entity"] & {
		name: string;
	})[];
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
					id: "requirement.resources",
					label: <Tx label={"Resource requirements (label)"} />,
					render({ entity }) {
						return <RequirementsInline requirements={entity.requirements} />;
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
