import { useQuery } from "@tanstack/react-query";
import { Card, Icon, LoaderIcon, Tx } from "@use-pico/client";
import { toHumanNumber } from "@use-pico/common";
import type { FC } from "react";
import type { BuildingBaseSchema } from "~/app/derivean/building/base/BuildingBaseSchema";
import { BuildingBaseProductionSource } from "~/app/derivean/building/base/production/BuildingBaseProductionSource";
import { kysely } from "~/app/derivean/db/db";
import { ResourceProductionSource } from "~/app/derivean/resource/production/ResourceProductionSource";
import { ProductionInline } from "~/app/derivean/resource/ProductionInline";
import { ResourceRequirementSource } from "~/app/derivean/resource/requirement/ResourceRequirementSource";
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
						/**
						 * TODO This is ugly, this query does not get validated.
						 */
						const query = useQuery({
							queryKey: ["resource", entity.id, entity.resourceId],
							async queryFn() {
								return kysely.transaction().execute((tx) => {
									return ResourceRequirementSource.list$({
										tx,
										where: {
											resourceId: entity.resourceId,
										},
									});
								});
							},
						});

						return query.isSuccess ?
								<RequirementsInline
									requirements={query.data}
									limit={5}
								/>
							:	<Icon icon={LoaderIcon} />;
					},
				},
				{
					id: "production",
					label: <Tx label={"Resource production (label)"} />,
					render({ entity }) {
						const query = useQuery({
							queryKey: ["production", entity.id, entity.resourceId],
							async queryFn() {
								return kysely.transaction().execute((tx) => {
									/**
									 * TODO this is incredibly ugly, but current it's a way how to get linked data
									 */
									return ResourceProductionSource.list$({
										tx,
										link: BuildingBaseProductionSource.select$({
											tx,
											use: ["id", "where"],
											where: {
												buildingBaseId: entity.id,
											},
										})
											.clearSelect()
											.select("bbp.resourceProductionId"),
									});
								});
							},
						});

						return query.isSuccess ?
								<ProductionInline
									production={query.data}
									limit={5}
								/>
							:	<Icon icon={LoaderIcon} />;
					},
				},
			]}
			{...props}
		/>
	);
};
