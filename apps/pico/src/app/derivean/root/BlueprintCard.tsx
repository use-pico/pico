import { Card, Tx } from "@use-pico/client";
import { toHumanNumber, type IdentitySchema } from "@use-pico/common";
import type { FC } from "react";
import { BlueprintDependenciesInline } from "~/app/derivean/root/BlueprintDependenciesInline";
import { Dependencies } from "~/app/derivean/root/Dependencies";
import type { BlueprintDependencySchema } from "~/app/derivean/schema/BlueprintDependencySchema";
import type { BlueprintRequirementSchema } from "~/app/derivean/schema/BlueprintRequirementSchema";
import { RequirementsInline } from "~/app/derivean/ui/RequirementsInline";
import type { withBlueprintGraph } from "~/app/derivean/utils/withBlueprintGraph";

export namespace BlueprintCard {
	export interface Data extends IdentitySchema.Type {
		name: string;
		cycles: number;
		requirements: (BlueprintRequirementSchema["~entity"] & {
			name: string;
		})[];
		dependencies: (BlueprintDependencySchema["~entity"] & {
			name: string;
		})[];
	}

	export interface Props extends Card.PropsEx<Data> {
		dependencies: withBlueprintGraph.Result;
	}
}

export const BlueprintCard: FC<BlueprintCard.Props> = ({
	dependencies,
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
					id: "requirements",
					label: <Tx label={"Required resources (label)"} />,
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
					id: "dependencies",
					label: <Tx label={"Blueprint dependencies (label)"} />,
					render({ entity }) {
						return (
							<BlueprintDependenciesInline
								dependencies={entity.dependencies}
								textEmpty={<Tx label={"No dependencies (label)"} />}
							/>
						);
					},
				},
				{
					id: "deps",
					label: <Tx label={"Blueprint dependency graph (label)"} />,
					render({ entity }) {
						return (
							<Dependencies
								graph={dependencies}
								blueprintId={entity.id}
							/>
						);
					},
				},
			]}
			{...props}
		/>
	);
};
