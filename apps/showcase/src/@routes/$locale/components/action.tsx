import { createFileRoute } from "@tanstack/react-router";
import { Action, TrashIcon } from "@use-pico/client";

export const Route = createFileRoute("/$locale/components/action")({
	component() {
		return (
			<div className={"flex flex-col space-y-4"}>
				<div className={"flex flex-row gap-2"}>
					<Action iconEnabled={TrashIcon} />
					<Action
						iconEnabled={TrashIcon}
						variant={{
							borderless: true,
						}}
					/>
					<Action
						iconEnabled={TrashIcon}
						variant={{
							borderless: true,
						}}
					/>
					<Action
						iconDisabled={TrashIcon}
						disabled
						variant={{
							borderless: true,
						}}
					/>
					<Action
						variant={{
							active: true,
						}}
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

				<div className={"flex flex-row gap-2"}>
					<Action
						iconEnabled={TrashIcon}
						variant={{
							variant: "secondary",
						}}
					/>
					<Action
						iconEnabled={TrashIcon}
						variant={{
							variant: "secondary",
							borderless: true,
						}}
					/>
					<Action
						iconEnabled={TrashIcon}
						variant={{
							variant: "secondary",
							borderless: true,
						}}
					/>
					<Action
						iconDisabled={TrashIcon}
						disabled
						variant={{
							variant: "secondary",
							borderless: true,
						}}
					/>
					<Action
						variant={{
							variant: "secondary",
							active: true,
						}}
						iconEnabled={TrashIcon}
					/>
					<Action
						loading
						iconEnabled={TrashIcon}
						variant={{
							variant: "secondary",
						}}
					/>
					<Action
						iconDisabled={TrashIcon}
						disabled
						variant={{
							variant: "secondary",
						}}
					/>
				</div>

				<div className={"flex flex-row gap-2"}>
					<Action
						iconEnabled={TrashIcon}
						variant={{
							variant: "danger",
						}}
					/>
					<Action
						iconEnabled={TrashIcon}
						variant={{
							variant: "danger",
							borderless: true,
						}}
					/>
					<Action
						iconEnabled={TrashIcon}
						variant={{
							variant: "danger",
							borderless: true,
						}}
					/>
					<Action
						iconDisabled={TrashIcon}
						disabled
						variant={{
							variant: "danger",
							borderless: true,
						}}
					/>
					<Action
						variant={{
							variant: "danger",
							active: true,
						}}
						iconEnabled={TrashIcon}
					/>
					<Action
						loading
						iconEnabled={TrashIcon}
						variant={{
							variant: "danger",
						}}
					/>
					<Action
						iconDisabled={TrashIcon}
						disabled
						variant={{
							variant: "danger",
						}}
					/>
				</div>

				<div className={"flex flex-row gap-2"}>
					<Action
						iconEnabled={TrashIcon}
						variant={{
							variant: "danger-light",
						}}
					/>
					<Action
						iconEnabled={TrashIcon}
						variant={{
							variant: "danger-light",
							borderless: true,
						}}
					/>
					<Action
						iconEnabled={TrashIcon}
						variant={{
							variant: "danger-light",
							borderless: true,
						}}
					/>
					<Action
						iconDisabled={TrashIcon}
						disabled
						variant={{
							variant: "danger-light",
							borderless: true,
						}}
					/>
					<Action
						variant={{
							variant: "danger-light",
							active: true,
						}}
						iconEnabled={TrashIcon}
					/>
					<Action
						loading
						iconEnabled={TrashIcon}
						variant={{
							variant: "danger-light",
						}}
					/>
					<Action
						iconDisabled={TrashIcon}
						disabled
						variant={{
							variant: "danger-light",
						}}
					/>
				</div>

				<div className={"flex flex-row gap-2"}>
					<Action
						iconEnabled={TrashIcon}
						variant={{
							variant: "neutral",
						}}
					/>
					<Action
						iconEnabled={TrashIcon}
						variant={{
							variant: "neutral",
							borderless: true,
						}}
					/>
					<Action
						iconEnabled={TrashIcon}
						variant={{
							variant: "neutral",
							borderless: true,
						}}
					/>
					<Action
						iconDisabled={TrashIcon}
						disabled
						variant={{
							variant: "neutral",
							borderless: true,
						}}
					/>
					<Action
						variant={{
							variant: "neutral",
							active: true,
						}}
						iconEnabled={TrashIcon}
					/>
					<Action
						loading
						iconEnabled={TrashIcon}
						variant={{
							variant: "neutral",
						}}
					/>
					<Action
						iconDisabled={TrashIcon}
						disabled
						variant={{
							variant: "neutral",
						}}
					/>
				</div>

				<div className={"flex flex-row gap-2"}>
					<Action
						iconEnabled={TrashIcon}
						variant={{
							variant: "light",
						}}
					/>
					<Action
						iconEnabled={TrashIcon}
						variant={{
							variant: "light",
							borderless: true,
						}}
					/>
					<Action
						iconEnabled={TrashIcon}
						variant={{
							variant: "light",
							borderless: true,
						}}
					/>
					<Action
						iconDisabled={TrashIcon}
						disabled
						variant={{
							variant: "light",
							borderless: true,
						}}
					/>
					<Action
						variant={{
							variant: "light",
							active: true,
						}}
						iconEnabled={TrashIcon}
					/>
					<Action
						loading
						iconEnabled={TrashIcon}
						variant={{
							variant: "light",
						}}
					/>
					<Action
						iconDisabled={TrashIcon}
						disabled
						variant={{
							variant: "light",
						}}
					/>
				</div>

				<div className={"flex flex-row gap-2"}>
					<Action
						iconEnabled={TrashIcon}
						variant={{
							variant: "subtle",
						}}
					/>
					<Action
						iconEnabled={TrashIcon}
						variant={{
							variant: "subtle",
							borderless: true,
						}}
					/>
					<Action
						iconEnabled={TrashIcon}
						variant={{
							variant: "subtle",
							borderless: true,
						}}
					/>
					<Action
						iconDisabled={TrashIcon}
						disabled
						variant={{
							variant: "subtle",
							borderless: true,
						}}
					/>
					<Action
						variant={{
							variant: "subtle",
							active: true,
						}}
						iconEnabled={TrashIcon}
					/>
					<Action
						loading
						iconEnabled={TrashIcon}
						variant={{
							variant: "subtle",
						}}
					/>
					<Action
						iconDisabled={TrashIcon}
						disabled
						variant={{
							variant: "subtle",
						}}
					/>
				</div>
			</div>
		);
	},
});
