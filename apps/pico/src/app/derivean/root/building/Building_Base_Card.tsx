import { Card, Tx } from "@use-pico/client";
import { toHumanNumber, type IdentitySchema } from "@use-pico/common";
import type { FC } from "react";
import { RequirementsInline } from "~/app/derivean/root/resource/ResourceInline";
import type { Building_Base_Resource_Requirement_Schema } from "~/app/derivean/schema/building/Building_Base_Resource_Requirement_Schema";

export namespace Building_Base_Card {
	export interface Data extends IdentitySchema.Type {
		name: string;
		cycles: number;
		requirements: (Building_Base_Resource_Requirement_Schema["~entity"] & {
			name: string;
		})[];
	}

	export interface Props extends Card.PropsEx<Data> {
		//
	}
}

export const Building_Base_Card: FC<Building_Base_Card.Props> = (props) => {
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
						return (
							<RequirementsInline
								requirements={entity.requirements}
								textEmpty={<Tx label={"No requirements (label)"} />}
							/>
						);
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
