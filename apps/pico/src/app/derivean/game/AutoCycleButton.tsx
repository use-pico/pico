import { useMutation } from "@tanstack/react-query";
import { Button, useInvalidator } from "@use-pico/client";
import { useEffect, useState, type FC } from "react";
import { kysely } from "~/app/derivean/db/kysely";
import { withCycle } from "~/app/derivean/service/withCycle";

export namespace AutoCycleButton {
	export interface Props extends Button.Props {
		userId: string;
	}
}

export const AutoCycleButton: FC<AutoCycleButton.Props> = ({
	userId,
	...props
}) => {
	const invalidator = useInvalidator([["GameMap"]]);
	const [enabled, setEnabled] = useState(false);
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

	useEffect(() => {
		if (enabled && !mutation.isPending) {
			const interval = setInterval(() => {
				mutation.mutate({ userId });
			}, 1 * 1000);
			return () => clearInterval(interval);
		}
	}, [enabled]);

	return (
		<Button
			iconEnabled={
				enabled ? "icon-[fluent--pause-24-regular]" : "icon-[hugeicons--play]"
			}
			onClick={() => {
				setEnabled((enabled) => !enabled);
			}}
			loading={mutation.isPending}
			{...props}
		/>
	);
};
