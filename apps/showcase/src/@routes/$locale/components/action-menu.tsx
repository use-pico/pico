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

					<ActionClick
						variant={{
							variant: "danger",
						}}
					>
						<Tx label={"Some Action 2"} />
					</ActionClick>

					<ActionClick
						variant={{
							variant: "warning",
						}}
					>
						<Tx label={"Some Action 2"} />
					</ActionClick>

					<ActionClick
						variant={{
							variant: "danger",
							disabled: true,
						}}
					>
						<Tx label={"Some disabled Action"} />
					</ActionClick>
				</ActionMenu>
			</div>
		);
	},
});
