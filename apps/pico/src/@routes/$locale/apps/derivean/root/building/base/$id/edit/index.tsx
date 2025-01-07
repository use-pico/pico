import { createFileRoute, useLoaderData } from "@tanstack/react-router";
import {
    toast,
    usePatchMutation,
    useSourceInvalidator,
    withToastPromiseTx
} from "@use-pico/client";
import { BuildingBaseSource } from "~/app/derivean/building/base/BuildingBaseSource";
import { BuildingBaseForm } from "~/app/derivean/root/building/base/BuildingBaseForm";

export const Route = createFileRoute(
	"/$locale/apps/derivean/root/building/base/$id/edit/",
)({
	component: () => {
		const { entity } = useLoaderData({
			from: "/$locale/apps/derivean/root/building/base/$id",
		});
		const navigate = Route.useNavigate();
		const invalidator = useSourceInvalidator({
			sources: [BuildingBaseSource],
		});

		return (
			<div className={"w-1/2 mx-auto"}>
				<BuildingBaseForm
					defaultValues={entity}
					mutation={usePatchMutation({
						source: BuildingBaseSource,
						async wrap(callback) {
							return toast.promise(
								callback(),
								withToastPromiseTx("Update building"),
							);
						},
						async toPatch() {
							return {
								filter: {
									id: entity.id,
								},
							};
						},
					})}
					onSuccess={async () => {
						await invalidator();
						navigate({
							to: "/$locale/apps/derivean/root/building/base/$id/view",
							params: { id: entity.id },
						});
					}}
				/>
			</div>
		);
	},
});
