import { useMutation } from "@tanstack/react-query";
import {
    Button,
    Icon,
    toast,
    Tx,
    useInvalidator,
    withToastPromiseTx,
} from "@use-pico/client";
import { toHumanNumber } from "@use-pico/common";
import type { FC } from "react";
import { withCycle } from "~/app/derivean/cycle/withCycle";
import { kysely } from "~/app/derivean/db/kysely";
import { CycleIcon } from "~/app/derivean/icon/CycleIcon";

export namespace CycleButton {
	export interface Props extends Button.Props {
		userId: string;
		/**
		 * Current count of cycles.
		 */
		cycle: number;
	}
}

export const CycleButton: FC<CycleButton.Props> = ({
	userId,
	cycle,
	...props
}) => {
	const invalidator = useInvalidator([
		["Cycle"],
		["Resource_Queue"],
		["Building_Queue"],
		["Building"],
		["User_Inventory"],
		["Inventory"],
		["Building_Base_Production"],
	]);

	const mutation = useMutation({
		mutationKey: ["useCycleMutation"],
		async mutationFn({ userId }: { userId: string }) {
			return kysely.transaction().execute(async (tx) => {
				return withCycle({ userId, tx });
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
			onClick={async () => {
				return toast.promise(
					mutation.mutateAsync({ userId }),
					withToastPromiseTx("Cycle"),
				);
			}}
			loading={mutation.isPending}
			{...props}
		>
			<Tx label={"New cycle (label)"} />
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
