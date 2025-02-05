import { createFileRoute, useLoaderData } from "@tanstack/react-router";

export const Route = createFileRoute(
	"/$locale/apps/derivean/root/region/$id/view",
)({
	component() {
		const {
			entity: { image },
		} = useLoaderData({
			from: "/$locale/apps/derivean/root/region/$id",
		});

		return (
			<>
				{image ?
					<img src={image || undefined} />
				:	"no image"}
			</>
		);
	},
});
