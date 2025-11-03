import { createFileRoute, useParams } from "@tanstack/react-router";
import { LinkTo } from "@use-pico/client/ui/link-to";
import { Tx } from "@use-pico/client/ui/tx";

export const Route = createFileRoute("/$locale/")({
	component() {
		const { locale } = useParams({
			from: "/$locale",
		});

		return (
			<div>
				<LinkTo
					to={"/$locale/components"}
					params={{
						locale,
					}}
				>
					<Tx label={"Components"} />
				</LinkTo>
			</div>
		);
	},
});
