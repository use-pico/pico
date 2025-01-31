import { useMutation } from "@tanstack/react-query";
import {
    Badge,
    Button,
    Icon,
    TrashIcon,
    useInvalidator,
} from "@use-pico/client";
import { toHumanNumber, tvc } from "@use-pico/common";
import type { FC } from "react";
import { kysely } from "~/app/derivean/db/kysely";
import type { DemandPanel } from "~/app/derivean/game/GameMap2/Building/Demand/DemandPanel";
import { DemandIcon } from "~/app/derivean/icon/DemandIcon";

export namespace Item {
	export interface Props {
		demand: DemandPanel.Demand;
	}
}

export const Item: FC<Item.Props> = ({ demand }) => {
	const invalidator = useInvalidator([["GameMap"]]);
	const deleteDemandMutation = useMutation({
		async mutationFn({ demandId }: { demandId: string }) {
			return kysely.transaction().execute(async (tx) => {
				return tx.deleteFrom("Demand").where("id", "=", demandId).execute();
			});
		},
		async onSuccess() {
			await invalidator();
		},
	});

	return (
		<div
			className={tvc([
				"flex",
				"flex-row",
				"gap-2",
				"items-center",
				"justify-between",
				"border",
				"p-4",
				"rounded-sm",
				"border-slate-200",
				"hover:border-slate-300",
				"hover:bg-slate-100",
				demand.transport ?
					[
						"text-green-600",
						"bg-green-50",
						"border-green-400",
						"hover:bg-green-50",
						"hover:border-green-400",
					]
				:	undefined,
			])}
		>
			<div className={"flex flex-row gap-2 items-center"}>
				{demand.transport > 0 ?
					<Icon icon={DemandIcon} />
				:	null}
				<div className={"font-bold"}>{demand.name}</div>
			</div>

			<div className={"flex flex-row gap-2 items-center"}>
				<Badge
					css={{
						base:
							demand.transport ?
								[
									"bg-green-50",
									"border-green-400",
									"hover:bg-green-50",
									"hover:border-green-400",
								]
							:	undefined,
					}}
				>
					x{toHumanNumber({ number: demand.amount })}
				</Badge>

				<Button
					iconEnabled={TrashIcon}
					loading={deleteDemandMutation.isPending}
					onClick={() => {
						deleteDemandMutation.mutate({ demandId: demand.id });
					}}
					variant={{ variant: "danger" }}
				/>
			</div>
		</div>
	);
};
