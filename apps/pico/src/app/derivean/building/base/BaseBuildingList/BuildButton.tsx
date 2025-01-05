import { Button, Tx } from "@use-pico/client";
import { tvc } from "@use-pico/common";
import type { FC } from "react";
import type { BaseBuildingSchema } from "~/app/derivean/building/base/BaseBuildingSchema";
import { useBuildingCount } from "~/app/derivean/building/base/useBuildingCount";
import type { useConstructMutation } from "~/app/derivean/building/useConstructMutation";
import { BuildingIcon } from "~/app/derivean/icon/BuildingIcon";

export namespace BuildButton {
	export interface Props extends Button.Props {
		baseBuilding: BaseBuildingSchema["~output"];
		userId: string;
		mutation: ReturnType<typeof useConstructMutation>;
	}
}

export const BuildButton: FC<BuildButton.Props> = ({
	baseBuilding,
	userId,
	mutation,
	disabled,
	...props
}) => {
	const data = useBuildingCount({
		baseBuildingId: baseBuilding.id,
		userId,
	});

	return (
		<Button
			iconEnabled={BuildingIcon}
			iconDisabled={BuildingIcon}
			variant={{ variant: "secondary" }}
			onClick={() => {
				mutation.mutate({
					baseBuildingId: baseBuilding.id,
				});
			}}
			disabled={
				disabled ||
				(baseBuilding.limit > 0 &&
					(data.data?.total || 0) >= baseBuilding.limit)
			}
			loading={mutation.isPending || data.isLoading}
			{...props}
		>
			<Tx label={"Build (label)"} />
			<div className={tvc(["flex", "flex-row", "gap-2", "text-sm"])}>
				<div>{data.data?.total || 0}</div>
				<div>/</div>
				<div>
					{baseBuilding.limit === 0 ?
						<Tx label={"Unlimited (label)"} />
					:	baseBuilding.limit}
				</div>
			</div>
		</Button>
	);
};
