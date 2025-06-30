import { createFileRoute } from "@tanstack/react-router";
import { AscIcon, Badge, Icon } from "@use-pico/client";

export const Route = createFileRoute("/$locale/components/badge")({
	component() {
		return (
			<div className={"flex flex-row items-center h-fit gap-2"}>
				<Badge>
					<Icon icon={AscIcon} /> <div>Default</div>
				</Badge>
				<Badge
					variant={{
						active: true,
					}}
				>
					Default [active]
				</Badge>
				<Badge
					variant={{
						variant: "primary",
					}}
				>
					Primary
				</Badge>
				<Badge
					variant={{
						variant: "secondary",
						active: true,
					}}
				>
					Secondary
				</Badge>
				<Badge
					variant={{
						variant: "subtle",
						active: true,
					}}
				>
					Subtle
				</Badge>
				<Badge
					variant={{
						variant: "neutral",
					}}
				>
					Neutral
				</Badge>
				<Badge
					variant={{
						variant: "danger",
					}}
				>
					Danger
				</Badge>
				<Badge
					variant={{
						variant: "danger-light",
					}}
				>
					Danger light
				</Badge>
			</div>
		);
	},
});
