import { useMutation } from "@tanstack/react-query";
import { createFileRoute, useLoaderData } from "@tanstack/react-router";
import { toast, useInvalidator, withToastPromiseTx } from "@use-pico/client";
import { kysely } from "~/app/derivean/db/kysely";
import { BlueprintForm } from "~/app/derivean/root/BlueprintForm";

export const Route = createFileRoute(
	"/$locale/apps/derivean/root/blueprint/$id/edit",
)({
	component: () => {
		const { entity } = useLoaderData({
			from: "/$locale/apps/derivean/root/blueprint/$id",
		});
		const navigate = Route.useNavigate();
		const invalidator = useInvalidator([["Building_Base"]]);

		return (
			<div className={"w-1/2 mx-auto"}>
				<BlueprintForm
					defaultValues={entity}
					mutation={useMutation({
						async mutationFn(values) {
							return toast.promise(
								kysely.transaction().execute(async (tx) => {
									return tx
										.updateTable("Blueprint")
										.set(values)
										.where("id", "=", entity.id)
										.returningAll()
										.executeTakeFirstOrThrow();
								}),
								withToastPromiseTx("Update blueprint"),
							);
						},
						async onSuccess() {
							await invalidator();
							navigate({
								to: "/$locale/apps/derivean/root/blueprint/$id/view",
								params: { id: entity.id },
							});
						},
					})}
				/>
			</div>
		);
	},
});
