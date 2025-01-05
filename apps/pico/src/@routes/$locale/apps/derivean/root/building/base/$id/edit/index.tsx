import { createFileRoute, useLoaderData } from "@tanstack/react-router";
import {
    toast,
    Tx,
    usePatchMutation,
    useSourceInvalidator,
} from "@use-pico/client";
import { BaseBuildingForm } from "~/app/derivean/building/base/BaseBuildingForm";
import { BaseBuildingSource } from "~/app/derivean/building/base/BaseBuildingSource";

export const Route = createFileRoute(
	"/$locale/apps/derivean/root/building/base/$id/edit/",
)({
	component: () => {
		const { entity } = useLoaderData({
			from: "/$locale/apps/derivean/root/building/base/$id",
		});
		const navigate = Route.useNavigate();
		const invalidator = useSourceInvalidator({
			sources: [BaseBuildingSource],
		});

		return (
			<div className={"w-1/2 mx-auto"}>
				<BaseBuildingForm
					defaultValues={entity}
					mutation={usePatchMutation({
						source: BaseBuildingSource,
						async wrap(callback) {
							return toast.promise(callback(), {
								loading: <Tx label={"Saving base building (label)"} />,
								success: (
									<Tx label={"Base building successfully saved (label)"} />
								),
								error: <Tx label={"Cannot save base building (label)"} />,
							});
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
