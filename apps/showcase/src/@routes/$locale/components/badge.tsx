import { createFileRoute } from "@tanstack/react-router";
import { AscIcon, Badge, Icon } from "@use-pico/client";

export const Route = createFileRoute("/$locale/components/badge")({
	component() {
		return (
			<div className={"flex flex-row items-center h-fit gap-2"}>
				<Badge>
					<Icon icon={AscIcon} /> <div>Foo bar</div>
				</Badge>
				<Badge variant={{ active: true }}>Bar foo</Badge>
			</div>
		);
	},
});
