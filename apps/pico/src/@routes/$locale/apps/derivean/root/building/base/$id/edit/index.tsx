import { createFileRoute, useLoaderData } from "@tanstack/react-router";
import { toast, Tx } from "@use-pico/client";
import { BaseBuildingForm } from "~/app/derivean/building/base/BaseBuildingForm";
import { BaseBuildingRepository } from "~/app/derivean/building/base/BaseBuildingRepository";

export const Route = createFileRoute(
	"/$locale/apps/derivean/root/building/base/$id/edit/",
)({
	component: () => {
		const { entity } = useLoaderData({
			from: "/$locale/apps/derivean/root/building/base/$id",
		});
		const navigate = Route.useNavigate();

		return (
			<div className={"w-1/2 mx-auto"}>
				<BaseBuildingForm
					defaultValues={entity}
					mutation={BaseBuildingRepository.usePatchMutation({
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
