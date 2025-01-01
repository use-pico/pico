import { Card, Tx } from "@use-pico/client";
import { type withRepositorySchema } from "@use-pico/common";
import type { FC } from "react";
import type { BaseBuildingSchema } from "~/app/derivean/building/base/BaseBuildingSchema";

export namespace BaseBuildingCard {
	export interface Props
		extends Card.PropsEx<withRepositorySchema.Output<BaseBuildingSchema>> {
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
					id: "requirement.resources",
					label: <Tx label={"Base building requirements (label)"} />,
					render({ entity }) {
						return "not-yet";
						// return (
						// 	<More
						// 		items={entity.requiredResources}
						// 		render={({ entity }) => {
						// 			return (
						// 				<div className={"flex flex-row gap-2 items-center"}>
						// 					<div className={"font-bold"}>{entity.resource.name}</div>
						// 					<div className={"text-sm text-slate-400"}>
						// 						x{toHumanNumber({ number: entity.amount })}
						// 					</div>
						// 				</div>
						// 			);
						// 		}}
						// 	/>
						// );
					},
				},
			]}
			{...props}
		/>
	);
};
