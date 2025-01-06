import { Button, toast, Tx, useCountQuery } from "@use-pico/client";
import { toHumanNumber, translator } from "@use-pico/common";
import type { FC } from "react";
import { CycleSource } from "~/app/derivean/cycle/CycleSource";
import { useCycleMutation } from "~/app/derivean/cycle/useCycleMutation";
import { CycleIcon } from "~/app/derivean/icon/CycleIcon";

export namespace CycleButton {
	export interface Props extends Button.Props {
		userId: string;
	}
}

export const CycleButton: FC<CycleButton.Props> = ({ userId, ...props }) => {
	const mutation = useCycleMutation({ userId });
	const data = useCountQuery({ source: CycleSource, where: { userId } });

	return (
		<Button
			iconEnabled={CycleIcon}
			iconDisabled={CycleIcon}
			onClick={async () => {
				return toast.promise(mutation.mutateAsync(), {
					loading: translator.text("Running cycle (toast)"),
					success: translator.text("Cycle success (toast)"),
					error: translator.text("Cycle failed (toast)"),
				});
			}}
			disabled={mutation.isPending}
			loading={data.isLoading}
			{...props}
		>
			<Tx label={"New cycle (label)"} />
			{data.isSuccess ?
				` (${toHumanNumber({ number: data.data.filter })})`
			:	""}
		</Button>
	);
};