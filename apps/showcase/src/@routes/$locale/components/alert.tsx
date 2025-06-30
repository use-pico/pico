import { createFileRoute } from "@tanstack/react-router";
import { Alert } from "@use-pico/client";

export const Route = createFileRoute("/$locale/components/alert")({
	component() {
		return (
			<div className={"flex flex-col space-y-4 w-full"}>
				<Alert
					title={"Default title"}
					message={"Default message"}
				>
					Default
				</Alert>

				<Alert
					title={"Error title"}
					message={"Error message"}
					variant={{
						variant: "error",
					}}
				>
					Error
				</Alert>

				<Alert
					title={"Info title"}
					message={"Info message"}
					variant={{
						variant: "info",
					}}
				>
					Info
				</Alert>

				<Alert
					title={"Neutral title"}
					message={"Neutral message"}
					variant={{
						variant: "neutral",
					}}
				>
					Neutral
				</Alert>

				<Alert
					title={"Subtle title"}
					message={"Subtle message"}
					variant={{
						variant: "subtle",
					}}
				>
					Subtle
				</Alert>

				<Alert
					title={"Warning title"}
					message={"Warning message"}
					variant={{
						variant: "warning",
					}}
				>
					Warning
				</Alert>
			</div>
		);
	},
});
