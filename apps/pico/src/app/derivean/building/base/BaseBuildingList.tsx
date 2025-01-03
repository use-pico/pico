import { Button, Tx } from "@use-pico/client";
import { type withRepositorySchema } from "@use-pico/common";
import { BaseBuildingListCss } from "~/app/derivean/building/base/BaseBuildingListCss";
import type { BaseBuildingSchema } from "~/app/derivean/building/base/BaseBuildingSchema";
import { RequirementsInline } from "~/app/derivean/building/RequirementsInline";
import { BuildingIcon } from "~/app/derivean/icon/BuildingIcon";
import { resourceCheckOf } from "~/app/derivean/resource/resourceCheckOf";
import { resourceSumOf } from "~/app/derivean/resource/resourceSumOf";

export namespace BaseBuildingList {
	export interface Props extends BaseBuildingListCss.Props {
		resources: resourceSumOf.Result;
		entities: withRepositorySchema.Output<BaseBuildingSchema>[];
	}
}

export const BaseBuildingList = ({
	resources,
	entities,
	variant,
	tva = BaseBuildingListCss,
	css,
}: BaseBuildingList.Props) => {
	const tv = tva({ ...variant, css }).slots;

	return (
		<div className={tv.base()}>
			{entities.map((entity) => {
				const canBuild = resourceCheckOf({
					resources,
					requirements: entity.requirements,
				});

				return (
					<div
						className={tv.item({ canBuild })}
						key={entity.id}
					>
						<div className={"flex flex-row justify-between"}>
							<div className={tv.title()}>{entity.name}</div>
							<div>
								<RequirementsInline requirements={entity.requirements} />
							</div>
						</div>
						<div className={"flex flex-row justify-between"}>
							<Button
								iconEnabled={BuildingIcon}
								iconDisabled={BuildingIcon}
								variant={{ variant: "secondary" }}
								disabled={!canBuild}
							>
								<Tx label={"Build (label)"} />
							</Button>
							<div></div>
						</div>
					</div>
				);
			})}
		</div>
	);
};
