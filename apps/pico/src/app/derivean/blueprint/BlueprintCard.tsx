import { Card, Tx } from "@use-pico/client";
import type { FC } from "react";
import { KindInline } from "~/app/derivean/blueprint/KindInline";
import type { BlueprintSchema } from "~/app/derivean/blueprint/schema/BlueprintSchema";

export namespace BlueprintCard {
	export interface Props extends Card.PropsEx<BlueprintSchema.Type> {
		//
	}
}

export const BlueprintCard: FC<BlueprintCard.Props> = (props) => {
	return (
		<Card
			items={[
				{
					id: "name",
					label: <Tx label={"Blueprint name (label)"} />,
					render({ entity }) {
						return entity.name;
					},
				},
				{
					id: "kind",
					label: <Tx label={"Blueprint kind (label)"} />,
					render({ entity }) {
						return <KindInline kind={entity.kind} />;
					},
				},
			]}
			{...props}
		/>
	);
};
