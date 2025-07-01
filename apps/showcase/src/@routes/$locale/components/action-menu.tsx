import { createFileRoute } from "@tanstack/react-router";
import { ActionClick, ActionMenu, Tx } from "@use-pico/client";

export const Route = createFileRoute("/$locale/components/action-menu")({
	component() {
		return (
			<div>
				<ActionMenu>
					<ActionClick>
						<Tx label={"Some Action"} />
					</ActionClick>

					<ActionClick>
						<Tx label={"Some Action 2"} />
					</ActionClick>
				</ActionMenu>
			</div>
		);
	},
});
