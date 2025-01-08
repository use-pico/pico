import { useMutation } from "@tanstack/react-query";
import { createFileRoute, useLoaderData } from "@tanstack/react-router";
import { toast, useInvalidator, withToastPromiseTx } from "@use-pico/client";
import { kysely } from "~/app/derivean/db/db";
import { BuildingBaseForm } from "~/app/derivean/root/building/base/BuildingBaseForm";

export const Route = createFileRoute(
	"/$locale/apps/derivean/root/building/base/$id/edit",
)({
	component: () => {
		const { entity } = useLoaderData({
			from: "/$locale/apps/derivean/root/building/base/$id",
		});
		const navigate = Route.useNavigate();
		const invalidator = useInvalidator([["Building_Base"]]);

		return (
			<div className={"w-1/2 mx-auto"}>
				<BuildingBaseForm
					defaultValues={entity}
					mutation={useMutation({
						async mutationFn(values) {
							return toast.promise(
								kysely.transaction().execute(async (tx) => {
									return tx
										.updateTable("Building_Base")
										.set(values)
										.where("id", "=", entity.id)
										.returningAll()
										.executeTakeFirstOrThrow();
								}),
								withToastPromiseTx("Update building"),
							);
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
