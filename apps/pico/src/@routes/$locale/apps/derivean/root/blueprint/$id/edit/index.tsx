import { createFileRoute, useLoaderData } from "@tanstack/react-router";
import { BlueprintForm } from "~/app/derivean/blueprint/BlueprintForm";
import { useBlueprintMutation } from "~/app/derivean/blueprint/useBlueprintMutation";

export const Route = createFileRoute(
	"/$locale/apps/derivean/root/blueprint/$id/edit/",
)({
	component: () => {
		const { id } = Route.useParams();
		const { blueprint } = useLoaderData({
			from: "/$locale/apps/derivean/root/blueprint/$id",
		});

		return (
			<div className={"w-1/2 mx-auto"}>
				<BlueprintForm
					mutation={useBlueprintMutation({
						toRequest(shape) {
							return {
								patch: {
									with: shape,
									filter: {
										id,
									},
								},
							};
						},
					})}
					defaultValues={blueprint}
					onSuccess={async () => {
						//
					}}
				/>
			</div>
		);
	},
});
