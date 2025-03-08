/** @format */

import { createFileRoute, useParams } from "@tanstack/react-router";
import { LinkTo, Tx } from "@use-pico/client";

export const Route = createFileRoute("/$locale/")({
	component() {
		const { locale } = useParams({ from: "/$locale" });

		return (
			<div>
				<LinkTo
					to={"/$locale/components"}
					params={{ locale }}
				>
					<Tx label={"Components"} />
				</LinkTo>
			</div>
		);
	},
});
