import { Card, Tx } from "@use-pico/client";
import { toHumanNumber, type IdentitySchema } from "@use-pico/common";
import type { FC } from "react";
import { Building_Production_Inline } from "~/app/derivean/root/building/Building_Production_Inline";
import { Building_Requirement_Inline } from "~/app/derivean/root/building/Building_Requirement_Inline";
import { RequirementsInline } from "~/app/derivean/root/resource/ResourceInline";
import type { Building_Base_Building_Base_Requirement_Schema } from "~/app/derivean/schema/building/Building_Base_Building_Base_Requirement_Schema";
import type { Building_Base_Production_Schema } from "~/app/derivean/schema/building/Building_Base_Production_Schema";
import type { Building_Base_Resource_Requirement_Schema } from "~/app/derivean/schema/building/Building_Base_Resource_Requirement_Schema";

export namespace Building_Base_Card {
	export interface Data extends IdentitySchema.Type {
		name: string;
		cycles: number;
		requiredResources: (Building_Base_Resource_Requirement_Schema["~entity"] & {
			name: string;
		})[];
		requiredBuildings: (Building_Base_Building_Base_Requirement_Schema["~entity"] & {
			name: string;
		})[];
		productions: (Building_Base_Production_Schema["~entity"] & {
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
					id: "required.resources",
					label: <Tx label={"Required resources (label)"} />,
					render({ entity }) {
						return (
							<RequirementsInline
								requirements={entity.requiredResources}
								textEmpty={<Tx label={"No requirements (label)"} />}
							/>
						);
					},
				},
				{
					id: "required.buildings",
					label: <Tx label={"Required buildings (label)"} />,
					render({ entity }) {
						return (
							<Building_Requirement_Inline
								requirements={entity.requiredBuildings}
								textEmpty={<Tx label={"No requirements (label)"} />}
							/>
						);
					},
				},
				{
					id: "production",
					label: <Tx label={"Resource production (label)"} />,
					render({ entity }) {
						return (
							<Building_Production_Inline productions={entity.productions} />
						);
					},
				},
			]}
			{...props}
		/>
	);
};
