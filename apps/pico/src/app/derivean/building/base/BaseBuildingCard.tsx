import { Card, More, Tx } from "@use-pico/client";
import {
    toHumanNumber,
    tvc,
    type withRepositorySchema,
} from "@use-pico/common";
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
						return (
							<More
								items={entity.requirements}
								render={({ entity }) => {
									return (
										<div className={"flex flex-row gap-2 items-center"}>
											<div
												className={tvc(
													"font-bold",
													!entity.passive && "text-amber-700",
												)}
											>
												{entity.resource.name}
											</div>
											<div className={"text-sm text-slate-400"}>
												x{toHumanNumber({ number: entity.amount })}
											</div>
										</div>
									);
								}}
							/>
						);
					},
				},
			]}
			{...props}
		/>
	);
};
