import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute(
	"/$locale/apps/derivean/root/building/base/$id/requirement/resource/list",
)({
	component: () => {
		return (
			<div>
				Hello
				"/$locale/apps/derivean/root/building/base/$id/requirement/resource/list"!
			</div>
		);
	},
});
