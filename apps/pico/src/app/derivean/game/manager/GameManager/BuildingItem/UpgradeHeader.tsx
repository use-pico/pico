import { useMutation } from "@tanstack/react-query";
import {
    Badge,
    Button,
    toast,
    useInvalidator,
    withToastPromiseTx,
} from "@use-pico/client";
import { tvc } from "@use-pico/common";
import type { FC } from "react";
import { ConstructionIcon } from "~/app/derivean/icon/ConstructionIcon";
import { withConstructionQueue } from "~/app/derivean/service/withConstructionQueue";

export namespace UpgradeHeader {
	export interface Props {
		name: string;
		userId: string;
		blueprintId: string;
		canBuild: boolean;
	}
}

export const UpgradeHeader: FC<UpgradeHeader.Props> = ({
	name,
	userId,
	blueprintId,
	canBuild,
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
			className={tvc(["flex", "flex-row", "gap-4", "items-center", "text-md"])}
		>
			<div className={tvc(["flex", "gap-4", "items-center"])}>
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
						iconEnabled={"icon-[gravity-ui--arrow-right]"}
						iconDisabled={ConstructionIcon}
						variant={{
							variant: canBuild ? "primary" : "subtle",
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
				<Badge
					css={{
						base: [
							"bg-purple-100",
							"border-purple-300",
							"px-4",
							"py-1",
							"text-md",
						],
					}}
				>
					{name}
				</Badge>
			</div>
		</div>
	);
};
