import { useMutation } from "@tanstack/react-query";
import { createFileRoute, useLoaderData } from "@tanstack/react-router";
import { toast, useInvalidator, withToastPromiseTx } from "@use-pico/client";
import { kysely } from "~/app/derivean/db/kysely";
import { Building_Base_Form } from "~/app/derivean/root/building/Building_Base_Form";

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
				<Building_Base_Form
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
						async onSuccess() {
							await invalidator();
							navigate({
								to: "/$locale/apps/derivean/root/building/base/$id/view",
								params: { id: entity.id },
							});
						},
					})}
				/>
			</div>
		);
	},
});
