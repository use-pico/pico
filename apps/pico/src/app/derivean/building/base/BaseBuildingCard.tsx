import { Card, Tx } from "@use-pico/client";
import type { FC } from "react";
import type { BaseBuildingSchema } from "~/app/derivean/building/base/BaseBuildingSchema";
import { RequirementsInline } from "~/app/derivean/building/RequirementsInline";

export namespace BaseBuildingCard {
	export interface Props extends Card.PropsEx<BaseBuildingSchema["~output"]> {
		//
	}
}

export const BaseBuildingCard: FC<BaseBuildingCard.Props> = (props) => {
	return (
		<Card
			items={[
				{
					id: "name",
					label: <Tx label={"Base building name (label)"} />,
					render({ entity }) {
						return entity.name;
					},
				},
				{
					id: "cycles",
					label: <Tx label={"Base building cycles (label)"} />,
					render({ entity }) {
						return entity.cycles;
					},
				},
				{
					id: "limit",
					label: <Tx label={"Base building limit (label)"} />,
					render({ entity }) {
						return entity.limit === 0 ?
                            <Tx label={"Unlimited (label)"} />
							:	entity.limit;
					},
				},
				{
					id: "requirement.resources",
					label: <Tx label={"Base building requirements (label)"} />,
					render({ entity }) {
						return <RequirementsInline requirements={entity.requirements} />;
					},
				},
			]}
			{...props}
		/>
	);
};
