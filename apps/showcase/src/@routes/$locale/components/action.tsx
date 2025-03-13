import { createFileRoute } from "@tanstack/react-router";
import { Action, TrashIcon } from "@use-pico/client";

export const Route = createFileRoute("/$locale/components/action")({
	component() {
		return (
			<div className={"flex flex-row gap-2"}>
				<Action iconEnabled={TrashIcon} />
				<Action
					variant={{ active: true }}
					iconEnabled={TrashIcon}
				/>
				<Action
					loading
					iconEnabled={TrashIcon}
				/>
				<Action
					iconDisabled={TrashIcon}
					disabled
				/>
			</div>
		);
	},
});
