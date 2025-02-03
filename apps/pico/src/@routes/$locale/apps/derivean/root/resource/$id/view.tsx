import { createFileRoute } from "@tanstack/react-router";
import { tvc } from "@use-pico/common";

export const Route = createFileRoute(
	"/$locale/apps/derivean/root/resource/$id/view",
)({
	component() {
		const { id } = Route.useParams();

		return (
			<div className={tvc(["w-1/3 h-92 mx-auto bg-contain", `bg-${id}`])} />
		);
	},
});
