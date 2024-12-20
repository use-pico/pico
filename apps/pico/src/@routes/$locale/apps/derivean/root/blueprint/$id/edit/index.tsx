import { createFileRoute } from "@tanstack/react-router";
import { BlueprintForm } from "~/app/derivean/blueprint/BlueprintForm";
import { useBlueprintMutation } from "~/app/derivean/blueprint/useBlueprintMutation";

export const Route = createFileRoute(
	"/$locale/apps/derivean/root/blueprint/$id/edit/",
)({
	component: () => {
		const { id } = Route.useParams();

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
					onSuccess={async () => {
						//
					}}
				/>
			</div>
		);
	},
});
