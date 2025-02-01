import { useMutation } from "@tanstack/react-query";
import { Button, useInvalidator } from "@use-pico/client";
import type { FC } from "react";
import { kysely } from "~/app/derivean/db/kysely";
import { withCycle } from "~/app/derivean/service/withCycle/withCycle";

export namespace CycleButton {
	export interface Props extends Button.Props {
		userId: string;
		mapId: string;
	}
}

export const CycleButton: FC<CycleButton.Props> = ({
	userId,
	mapId,
	...props
}) => {
	const invalidator = useInvalidator([["Cycle"], ["GameMap"]]);

	const mutation = useMutation({
		mutationKey: ["useCycleMutation"],
		async mutationFn({ userId }: { userId: string }) {
			return kysely.transaction().execute(async (tx) => {
				return withCycle({ tx, userId, mapId });
			});
		},
		async onSuccess() {
			await invalidator();
		},
	});

	return (
		<Button
			iconEnabled={"icon-[hugeicons--play]"}
			onClick={() => {
				mutation.mutate({ userId });
			}}
			loading={mutation.isPending}
			{...props}
		/>
	);
};
