import { useMutation } from "@tanstack/react-query";
import {
    Button,
    Icon,
    toast,
    useInvalidator,
    withToastPromiseTx,
} from "@use-pico/client";
import { tvc } from "@use-pico/common";
import type { FC } from "react";
import { BuildingIcon } from "~/app/derivean/icon/BuildingIcon";
import { ConstructionIcon } from "~/app/derivean/icon/ConstructionIcon";
import { withConstructionQueue } from "~/app/derivean/service/withConstructionQueue";

export namespace Header {
	export interface Props {
		name: string;
		userId: string;
		blueprintId: string;
		isBuilt: boolean;
		canBuild: boolean;
	}
}

export const Header: FC<Header.Props> = ({
	name,
	userId,
	blueprintId,
	isBuilt,
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
			className={tvc([
				"flex",
				"flex-row",
				"gap-4",
				"items-center",
				"font-bold",
				"text-lg",
			])}
		>
			<div className={tvc(["flex", "gap-2", "items-center"])}>
				{isBuilt ?
					<Icon icon={BuildingIcon} />
				:	<div
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
				}
				<div className={"flex flex-row gap-2"}>{name}</div>
			</div>
		</div>
	);
};
