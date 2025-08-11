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
						cls={({ what }) => ({
							variant: what.variant({
								borderless: true,
							}),
						})}
					/>
					<Action
						iconEnabled={TrashIcon}
						cls={({ what }) => ({
							variant: what.variant({
								borderless: true,
							}),
						})}
					/>
					<Action
						iconDisabled={TrashIcon}
						disabled
						cls={({ what }) => ({
							variant: what.variant({
								borderless: true,
							}),
						})}
					/>
					<Action
						cls={({ what }) => ({
							variant: what.variant({
								active: true,
							}),
						})}
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
						cls={({ what }) => ({
							variant: what.variant({
								variant: "secondary",
							}),
						})}
					/>
					<Action
						iconEnabled={TrashIcon}
						cls={({ what }) => ({
							variant: what.variant({
								variant: "secondary",
								borderless: true,
							}),
						})}
					/>
					<Action
						iconEnabled={TrashIcon}
						cls={({ what }) => ({
							variant: what.variant({
								variant: "secondary",
								borderless: true,
							}),
						})}
					/>
					<Action
						iconDisabled={TrashIcon}
						disabled
						cls={({ what }) => ({
							variant: what.variant({
								variant: "secondary",
								borderless: true,
							}),
						})}
					/>
					<Action
						cls={({ what }) => ({
							variant: what.variant({
								variant: "secondary",
								active: true,
							}),
						})}
						iconEnabled={TrashIcon}
					/>
					<Action
						loading
						iconEnabled={TrashIcon}
						cls={({ what }) => ({
							variant: what.variant({
								variant: "secondary",
							}),
						})}
					/>
					<Action
						iconDisabled={TrashIcon}
						disabled
						cls={({ what }) => ({
							variant: what.variant({
								variant: "secondary",
							}),
						})}
					/>
				</div>

				<div className={"flex flex-row gap-2"}>
					<Action
						iconEnabled={TrashIcon}
						cls={({ what }) => ({
							variant: what.variant({
								variant: "danger",
							}),
						})}
					/>
					<Action
						iconEnabled={TrashIcon}
						cls={({ what }) => ({
							variant: what.variant({
								variant: "danger",
								borderless: true,
							}),
						})}
					/>
					<Action
						iconEnabled={TrashIcon}
						cls={({ what }) => ({
							variant: what.variant({
								variant: "danger",
								borderless: true,
							}),
						})}
					/>
					<Action
						iconDisabled={TrashIcon}
						disabled
						cls={({ what }) => ({
							variant: what.variant({
								variant: "danger",
								borderless: true,
							}),
						})}
					/>
					<Action
						cls={({ what }) => ({
							variant: what.variant({
								variant: "danger",
								active: true,
							}),
						})}
						iconEnabled={TrashIcon}
					/>
					<Action
						loading
						iconEnabled={TrashIcon}
						cls={({ what }) => ({
							variant: what.variant({
								variant: "danger",
							}),
						})}
					/>
					<Action
						iconDisabled={TrashIcon}
						disabled
						cls={({ what }) => ({
							variant: what.variant({
								variant: "danger",
							}),
						})}
					/>
				</div>

				<div className={"flex flex-row gap-2"}>
					<Action
						iconEnabled={TrashIcon}
						cls={({ what }) => ({
							variant: what.variant({
								variant: "danger-light",
							}),
						})}
					/>
					<Action
						iconEnabled={TrashIcon}
						cls={({ what }) => ({
							variant: what.variant({
								variant: "danger-light",
								borderless: true,
							}),
						})}
					/>
					<Action
						iconEnabled={TrashIcon}
						cls={({ what }) => ({
							variant: what.variant({
								variant: "danger-light",
								borderless: true,
							}),
						})}
					/>
					<Action
						iconDisabled={TrashIcon}
						disabled
						cls={({ what }) => ({
							variant: what.variant({
								variant: "danger-light",
								borderless: true,
							}),
						})}
					/>
					<Action
						cls={({ what }) => ({
							variant: what.variant({
								variant: "danger-light",
								active: true,
							}),
						})}
						iconEnabled={TrashIcon}
					/>
					<Action
						loading
						iconEnabled={TrashIcon}
						cls={({ what }) => ({
							variant: what.variant({
								variant: "danger-light",
							}),
						})}
					/>
					<Action
						iconDisabled={TrashIcon}
						disabled
						cls={({ what }) => ({
							variant: what.variant({
								variant: "danger-light",
							}),
						})}
					/>
				</div>

				<div className={"flex flex-row gap-2"}>
					<Action
						iconEnabled={TrashIcon}
						cls={({ what }) => ({
							variant: what.variant({
								variant: "neutral",
							}),
						})}
					/>
					<Action
						iconEnabled={TrashIcon}
						cls={({ what }) => ({
							variant: what.variant({
								variant: "neutral",
								borderless: true,
							}),
						})}
					/>
					<Action
						iconEnabled={TrashIcon}
						cls={({ what }) => ({
							variant: what.variant({
								variant: "neutral",
								borderless: true,
							}),
						})}
					/>
					<Action
						iconDisabled={TrashIcon}
						disabled
						cls={({ what }) => ({
							variant: what.variant({
								variant: "neutral",
								borderless: true,
							}),
						})}
					/>
					<Action
						cls={({ what }) => ({
							variant: what.variant({
								variant: "neutral",
								active: true,
							}),
						})}
						iconEnabled={TrashIcon}
					/>
					<Action
						loading
						iconEnabled={TrashIcon}
						cls={({ what }) => ({
							variant: what.variant({
								variant: "neutral",
							}),
						})}
					/>
					<Action
						iconDisabled={TrashIcon}
						disabled
						cls={({ what }) => ({
							variant: what.variant({
								variant: "neutral",
							}),
						})}
					/>
				</div>

				<div className={"flex flex-row gap-2"}>
					<Action
						iconEnabled={TrashIcon}
						cls={({ what }) => ({
							variant: what.variant({
								variant: "light",
							}),
						})}
					/>
					<Action
						iconEnabled={TrashIcon}
						cls={({ what }) => ({
							variant: what.variant({
								variant: "light",
								borderless: true,
							}),
						})}
					/>
					<Action
						iconEnabled={TrashIcon}
						cls={({ what }) => ({
							variant: what.variant({
								variant: "light",
								borderless: true,
							}),
						})}
					/>
					<Action
						iconDisabled={TrashIcon}
						disabled
						cls={({ what }) => ({
							variant: what.variant({
								variant: "light",
								borderless: true,
							}),
						})}
					/>
					<Action
						cls={({ what }) => ({
							variant: what.variant({
								variant: "light",
								active: true,
							}),
						})}
						iconEnabled={TrashIcon}
					/>
					<Action
						loading
						iconEnabled={TrashIcon}
						cls={({ what }) => ({
							variant: what.variant({
								variant: "light",
							}),
						})}
					/>
					<Action
						iconDisabled={TrashIcon}
						disabled
						cls={({ what }) => ({
							variant: what.variant({
								variant: "light",
							}),
						})}
					/>
				</div>

				<div className={"flex flex-row gap-2"}>
					<Action
						iconEnabled={TrashIcon}
						cls={({ what }) => ({
							variant: what.variant({
								variant: "subtle",
							}),
						})}
					/>
					<Action
						iconEnabled={TrashIcon}
						cls={({ what }) => ({
							variant: what.variant({
								variant: "subtle",
								borderless: true,
							}),
						})}
					/>
					<Action
						iconEnabled={TrashIcon}
						cls={({ what }) => ({
							variant: what.variant({
								variant: "subtle",
								borderless: true,
							}),
						})}
					/>
					<Action
						iconDisabled={TrashIcon}
						disabled
						cls={({ what }) => ({
							variant: what.variant({
								variant: "subtle",
								borderless: true,
							}),
						})}
					/>
					<Action
						cls={({ what }) => ({
							variant: what.variant({
								variant: "subtle",
								active: true,
							}),
						})}
						iconEnabled={TrashIcon}
					/>
					<Action
						loading
						iconEnabled={TrashIcon}
						cls={({ what }) => ({
							variant: what.variant({
								variant: "subtle",
							}),
						})}
					/>
					<Action
						iconDisabled={TrashIcon}
						disabled
						cls={({ what }) => ({
							variant: what.variant({
								variant: "subtle",
							}),
						})}
					/>
				</div>
			</div>
		);
	},
});
