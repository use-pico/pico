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
import type { ResourcePanel } from "~/app/derivean/game/GameMap2/Route/Resource/ResourcePanel";
import { ResourceIcon } from "~/app/derivean/icon/ResourceIcon";

export namespace Item {
	export interface Props {
		resource: ResourcePanel.Resource;
	}
}

export const Item: FC<Item.Props> = ({ resource }) => {
	const invalidator = useInvalidator([["GameMap"]]);
	const removeResourceMutation = useMutation({
		async mutationFn({ routeResourceId }: { routeResourceId: string }) {
			return kysely.transaction().execute(async (tx) => {
				return tx
					.deleteFrom("Route_Resource")
					.where("id", "=", routeResourceId)
					.execute();
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
				"justify-between",
				"p-4",
				"border",
				"rounded",
				"border-slate-200",
				"hover:border-slate-300",
				"hover:bg-slate-100",
			])}
		>
			<div className={"flex flex-row gap-2 items-center"}>
				<Icon
					icon={ResourceIcon}
					css={{ base: ["text-slate-500"] }}
				/>
				<div className={"font-bold"}>{resource.name}</div>
				<Badge>x{toHumanNumber({ number: resource.amount })}</Badge>
			</div>
			<div>
				<Button
					variant={{ variant: "secondary" }}
					iconEnabled={TrashIcon}
					loading={removeResourceMutation.isPending}
					onClick={() => {
						removeResourceMutation.mutate({
							routeResourceId: resource.id,
						});
					}}
				/>
			</div>
		</div>
	);
};
