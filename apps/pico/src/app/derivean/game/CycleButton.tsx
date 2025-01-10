import { useMutation } from "@tanstack/react-query";
import { Button, toast, Tx, withToastPromiseTx } from "@use-pico/client";
import { toHumanNumber } from "@use-pico/common";
import type { FC } from "react";
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
	const mutation = useMutation({
		async mutationFn({ userId }: { userId: string }) {
			return userId;
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
			<Tx label={"New cycle (label)"} /> (${toHumanNumber({ number: cycle })})
		</Button>
	);
};
