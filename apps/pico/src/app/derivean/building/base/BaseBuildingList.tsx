import { Icon, Tx } from "@use-pico/client";
import { tvc } from "@use-pico/common";
import { BuildButton } from "~/app/derivean/building/base/BaseBuildingList/BuildButton";
import { BaseBuildingListCss } from "~/app/derivean/building/base/BaseBuildingListCss";
import type { BaseBuildingSchema } from "~/app/derivean/building/base/BaseBuildingSchema";
import { useConstructMutation } from "~/app/derivean/building/useConstructMutation";
import { BuildingIcon } from "~/app/derivean/icon/BuildingIcon";
import { CycleIcon } from "~/app/derivean/icon/CycleIcon";
import { inventoryCheck } from "~/app/derivean/inventory/inventoryCheck";
import type { InventorySchema } from "~/app/derivean/inventory/InventorySchema";
import { ResourceInline } from "~/app/derivean/resource/ResourceInline";

export namespace BaseBuildingList {
	export interface Props extends BaseBuildingListCss.Props {
		userId: string;
		inventory: InventorySchema["~output-array"];
		entities: BaseBuildingSchema["~output-array"];
	}
}

export const BaseBuildingList = ({
	userId,
	inventory,
	entities,
	variant,
	tva = BaseBuildingListCss,
	css,
}: BaseBuildingList.Props) => {
	const tv = tva({ ...variant, css }).slots;
	const mutation = useConstructMutation({ userId });

	return (
		<div className={tv.base({ loading: mutation.isPending })}>
			{entities.map((entity) => {
				const { check, missing } = inventoryCheck({
					inventory,
					requirements: entity.requirements,
				});

				return (
					<div
						className={tv.item({ canBuild: check })}
						key={entity.id}
					>
						<div className={"flex flex-row justify-between"}>
							<div className={tv.title()}>
								<Icon icon={BuildingIcon} />
								<div>{entity.name}</div>
							</div>
							<div>
								<ResourceInline
									textTitle={<Tx label={"Building requirements (title)"} />}
									resources={entity.requirements}
									diff={missing}
									limit={5}
								/>
							</div>
						</div>
						<div className={"flex flex-row justify-between"}>
							<BuildButton
								mutation={mutation}
								baseBuilding={entity}
								userId={userId}
								disabled={!check}
							/>
							<div
								className={tvc([
									"flex",
									"flex-row",
									"items-center",
									"gap-2",
									"px-2",
									"py-1",
									"bg-emerald-100",
									"rounded",
									"border",
									"border-emerald-300",
								])}
							>
								<Icon icon={CycleIcon} />
								<Tx label={"Base building cycles (label)"} />
								<div className={"font-bold"}>{entity.cycles}</div>
							</div>
						</div>
					</div>
				);
			})}
		</div>
	);
};
