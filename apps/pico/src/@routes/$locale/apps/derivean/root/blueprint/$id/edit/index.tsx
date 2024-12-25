import { createFileRoute, useLoaderData } from "@tanstack/react-router";
import { BlueprintForm } from "~/app/derivean/blueprint/BlueprintForm";
import { BlueprintQuery } from "~/app/derivean/blueprint/BlueprintQuery";

export const Route = createFileRoute(
	"/$locale/apps/derivean/root/blueprint/$id/edit/",
)({
	component: () => {
		const { locale, id } = Route.useParams();
		const { blueprint } = useLoaderData({
			from: "/$locale/apps/derivean/root/blueprint/$id",
		});
		const navigate = Route.useNavigate();

		return (
			<div className={"w-1/2 mx-auto"}>
				<BlueprintForm
					mutation={BlueprintQuery.usePatchMutation({
						async toPatch(shape) {
							return {
								shape,
								filter: {
									id,
								},
							};
						},
					})}
					defaultValues={blueprint}
					onSuccess={async () => {
						navigate({
							to: "/$locale/apps/derivean/root/blueprint/$id/view",
							params: { locale, id },
						});
					}}
				/>
			</div>
		);
	},
});
