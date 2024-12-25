import { createFileRoute, useParams } from "@tanstack/react-router";
import { BlueprintForm } from "~/app/derivean/blueprint/BlueprintForm";
import { BlueprintQuery } from "~/app/derivean/blueprint/BlueprintQuery";

export const Route = createFileRoute(
	"/$locale/apps/derivean/root/blueprint/create/",
)({
	component: () => {
		const { locale } = useParams({ from: "/$locale" });
		const navigate = Route.useNavigate();

		return (
			<div className={"w-1/2 mx-auto"}>
				<BlueprintForm
					mutation={BlueprintQuery.useCreateMutation({
						async toCreate(shape) {
							return shape;
						},
					})}
					onSuccess={async (blueprint) => {
						return navigate({
							to: "/$locale/apps/derivean/root/blueprint/$id/view",
							params: { locale, id: blueprint.id },
						});
					}}
				/>
			</div>
		);
	},
});
