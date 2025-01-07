import { Card, Tx } from "@use-pico/client";
import { toHumanNumber } from "@use-pico/common";
import type { FC } from "react";
import type { BuildingBaseSchema } from "~/app/derivean/building/base/BuildingBaseSchema";
import { RequirementsInline } from "~/app/derivean/root/resource/ResourceInline";

export namespace BuildingBaseCard {
	export interface Props extends Card.PropsEx<BuildingBaseSchema["~output"]> {
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
						return (
							<RequirementsInline
								requirements={entity.requirements}
								limit={5}
							/>
						);
					},
				},
			]}
			{...props}
		/>
	);
};
