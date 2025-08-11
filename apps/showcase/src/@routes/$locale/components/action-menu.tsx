import { createFileRoute } from "@tanstack/react-router";
import { ActionClick, ActionMenu, Tx } from "@use-pico/client";

export const Route = createFileRoute("/$locale/components/action-menu")({
	component() {
		return (
			<div className="space-y-8">
				<div>
					<h3 className="text-lg font-semibold mb-4">
						Default ActionMenu
					</h3>
					<ActionMenu>
						<ActionClick>
							<Tx label={"Some Action"} />
						</ActionClick>

						<ActionClick
							cls={({ what }) => ({
								variant: what.variant({
									variant: "danger",
								}),
							})}
						>
							<Tx label={"Some Action 2"} />
						</ActionClick>

						<ActionClick
							cls={({ what }) => ({
								variant: what.variant({
									variant: "warning",
								}),
							})}
						>
							<Tx label={"Some Action 2"} />
						</ActionClick>

						<ActionClick
							cls={({ what }) => ({
								variant: what.variant({
									variant: "danger",
									disabled: true,
								}),
							})}
						>
							<Tx label={"Some disabled Action"} />
						</ActionClick>
					</ActionMenu>
				</div>

				<div>
					<h3 className="text-lg font-semibold mb-4">
						ActionMenu with Overlay
					</h3>
					<ActionMenu withOverlay>
						<ActionClick>
							<Tx label={"Some Action"} />
						</ActionClick>

						<ActionClick
							cls={({ what }) => ({
								variant: what.variant({
									variant: "danger",
								}),
							})}
						>
							<Tx label={"Some Action 2"} />
						</ActionClick>

						<ActionClick
							cls={({ what }) => ({
								variant: what.variant({
									variant: "warning",
								}),
							})}
						>
							<Tx label={"Some Action 2"} />
						</ActionClick>

						<ActionClick
							cls={({ what }) => ({
								variant: what.variant({
									variant: "danger",
									disabled: true,
								}),
							})}
						>
							<Tx label={"Some disabled Action"} />
						</ActionClick>
					</ActionMenu>
				</div>
			</div>
		);
	},
});
