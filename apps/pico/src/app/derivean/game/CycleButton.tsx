import { useMutation } from "@tanstack/react-query";
import { Button, Icon, Tx, useInvalidator } from "@use-pico/client";
import { toHumanNumber } from "@use-pico/common";
import type { FC } from "react";
import { kysely } from "~/app/derivean/db/kysely";
import { CycleIcon } from "~/app/derivean/icon/CycleIcon";
import { withCycle } from "~/app/derivean/service/withCycle";

export namespace CycleButton {
	export interface Props extends Button.Props {
		userId: string;
		mapId: string;
		/**
		 * Current count of cycles.
		 */
		cycle: number;
	}
}

export const CycleButton: FC<CycleButton.Props> = ({
	userId,
	mapId,
	cycle,
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
			iconEnabled={CycleIcon}
			iconDisabled={CycleIcon}
			onClick={() => {
				mutation.mutate({ userId });
			}}
			loading={mutation.isPending}
			{...props}
		>
			<Tx
				css={{ base: ["font-bold"] }}
				label={"New cycle (label)"}
			/>
			<div className={"flex flex-row gap-2 items-center"}>
				<div className={"font-light text-sm"}>
					{toHumanNumber({ number: cycle })}
				</div>
				<Icon icon={"icon-[solar--arrow-right-linear]"} />
				<div className={"font-bold"}>
					{toHumanNumber({ number: cycle + 1 })}
				</div>
			</div>
		</Button>
	);
};
