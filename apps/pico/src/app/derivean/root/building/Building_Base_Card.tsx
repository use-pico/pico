import { Card, Tx } from "@use-pico/client";
import { toHumanNumber, type IdentitySchema } from "@use-pico/common";
import type { FC } from "react";
import { RequirementsInline } from "~/app/derivean/resource/ResourceInline";
import { Building_Requirement_Inline } from "~/app/derivean/root/building/Building_Requirement_Inline";
import { Dependencies } from "~/app/derivean/root/building/Dependencies";
import type { Building_Base_Building_Base_Requirement_Schema } from "~/app/derivean/schema/building/Building_Base_Building_Base_Requirement_Schema";
import type { Building_Base_Resource_Requirement_Schema } from "~/app/derivean/schema/building/Building_Base_Resource_Requirement_Schema";
import type { withBuildingGraph } from "~/app/derivean/utils/withBuildingGraph";

export namespace Building_Base_Card {
	export interface Data extends IdentitySchema.Type {
		name: string;
		cycles: number;
		productionLimit: number;
		requiredResources: (Building_Base_Resource_Requirement_Schema["~entity"] & {
			name: string;
		})[];
		requiredBuildings: (Building_Base_Building_Base_Requirement_Schema["~entity"] & {
			name: string;
		})[];
	}

	export interface Props extends Card.PropsEx<Data> {
		graph: withBuildingGraph.Result;
	}
}

export const Building_Base_Card: FC<Building_Base_Card.Props> = ({
	graph,
	...props
}) => {
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
					id: "productionLimit",
					label: <Tx label={"Production limit (label)"} />,
					render({ entity }) {
						return toHumanNumber({ number: entity.productionLimit });
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
					id: "deps",
					label: <Tx label={"Building dependencies (label)"} />,
					render({ entity }) {
						return (
							<Dependencies
								graph={graph}
								buildingBaseId={entity.id}
							/>
						);
					},
				},
			]}
			{...props}
		/>
	);
};
