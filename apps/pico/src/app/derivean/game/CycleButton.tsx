import { Button, toast, Tx } from "@use-pico/client";
import { translator } from "@use-pico/common";
import type { FC } from "react";
import { useCycleMutation } from "~/app/derivean/cycle/useCycleMutation";
import { CycleIcon } from "~/app/derivean/icon/CycleIcon";

export namespace CycleButton {
	export interface Props extends Button.Props {
		//
	}
}

export const CycleButton: FC<CycleButton.Props> = (props) => {
	const mutation = useCycleMutation({});

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
			{...props}
		>
			<Tx label={"New cycle (label)"} />
		</Button>
	);
};
