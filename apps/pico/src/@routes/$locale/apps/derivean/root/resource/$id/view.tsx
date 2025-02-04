import { createFileRoute, useLoaderData } from "@tanstack/react-router";

export const Route = createFileRoute(
	"/$locale/apps/derivean/root/resource/$id/view",
)({
	component() {
		const {
			entity: { image },
		} = useLoaderData({
			from: "/$locale/apps/derivean/root/resource/$id",
		});

		return (
			<>
				<img src={image || undefined} />
			</>
		);
	},
});
