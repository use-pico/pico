import { useMutation } from "@tanstack/react-query";
import {
    Button,
    Icon,
    toast,
    useInvalidator,
    withToastPromiseTx,
} from "@use-pico/client";
import { toHumanNumber, tvc } from "@use-pico/common";
import type { FC } from "react";
import { Upgrades } from "~/app/derivean/game/Upgrades";
import { ConstructionIcon } from "~/app/derivean/icon/ConstructionIcon";
import { CycleIcon } from "~/app/derivean/icon/CycleIcon";
import { withConstructionQueue } from "~/app/derivean/service/withConstructionQueue";
import type { withBlueprintUpgradeGraph } from "~/app/derivean/utils/withBlueprintUpgradeGraph";

export namespace Header {
	export interface Props {
		name: string;
		cycles: number;
		userId: string;
		blueprintId: string;
		isBuilt: boolean;
		canBuild: boolean;
		upgrades: withBlueprintUpgradeGraph.Result;
	}
}

export const Header: FC<Header.Props> = ({
	name,
	cycles,
	userId,
	blueprintId,
	isBuilt,
	canBuild,
	upgrades,
}) => {
	const invalidator = useInvalidator([
		["Management"],
		["Building_Queue"],
		["Inventory"],
		["User_Inventory"],
	]);

	const mutation = useMutation({
		async mutationFn({ blueprintId }: { blueprintId: string }) {
			return toast.promise(
				withConstructionQueue({
					blueprintId,
					userId,
				}),
				withToastPromiseTx("Building queue"),
			);
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
				"gap-4",
				"items-center",
				"font-bold",
				"text-lg",
			])}
		>
			<div className={tvc(["flex", "gap-6", "items-center"])}>
				{isBuilt ? null : (
					<div
						className={tvc([
							"flex",
							"flex-row",
							"gap-2",
							"items-center",
							"font-bold",
							"text-sm",
							"text-slate-500",
						])}
					>
						<Button
							iconEnabled={ConstructionIcon}
							iconDisabled={ConstructionIcon}
							variant={{
								variant: !isBuilt && canBuild ? "primary" : "subtle",
							}}
							onClick={() => {
								mutation.mutate({
									blueprintId,
								});
							}}
							css={{
								base: ["px-8"],
							}}
							disabled={!canBuild}
							loading={mutation.isPending}
						/>
					</div>
				)}
				<div className={"flex flex-row gap-2"}>
					{name}
					<div
						className={tvc(["flex", "gap-2", "items-center", "text-slate-500"])}
					>
						<Icon
							variant={{ size: "xl" }}
							icon={CycleIcon}
						/>
						{toHumanNumber({ number: cycles })}
					</div>
				</div>

				<Upgrades
					graph={upgrades}
					blueprintId={blueprintId}
				/>
			</div>
		</div>
	);
};
