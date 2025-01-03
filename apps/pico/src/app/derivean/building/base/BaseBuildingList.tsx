import { Button, Tx } from "@use-pico/client";
import { type withRepositorySchema } from "@use-pico/common";
import { BaseBuildingListCss } from "~/app/derivean/building/base/BaseBuildingListCss";
import type { BaseBuildingSchema } from "~/app/derivean/building/base/BaseBuildingSchema";
import { RequirementsInline } from "~/app/derivean/building/RequirementsInline";
import { BuildingIcon } from "~/app/derivean/icon/BuildingIcon";

export namespace BaseBuildingList {
	export interface Props extends BaseBuildingListCss.Props {
		entities: withRepositorySchema.Output<BaseBuildingSchema>[];
	}
}

export const BaseBuildingList = ({
	entities,
	variant,
	tva = BaseBuildingListCss,
	css,
}: BaseBuildingList.Props) => {
	const tv = tva({ ...variant, css }).slots;

	return (
		<div className={tv.base()}>
			{entities.map((entity) => {
				return (
					<div
						className={tv.item()}
						key={entity.id}
					>
						<div className={"flex flex-row justify-between"}>
							<div className={tv.title()}>{entity.name}</div>
							<div>
								<RequirementsInline requirements={entity.requirements} />
							</div>
						</div>
						<Button
							iconEnabled={BuildingIcon}
							iconDisabled={BuildingIcon}
							variant={{ variant: "secondary" }}
						>
							<Tx label={"Build (label)"} />
						</Button>
					</div>
				);
			})}
		</div>
	);
};
