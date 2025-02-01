import { useMutation } from "@tanstack/react-query";
import { createFileRoute, useLoaderData } from "@tanstack/react-router";
import { useInvalidator } from "@use-pico/client";
import { genId, withBase64 } from "@use-pico/common";
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
		const invalidator = useInvalidator([["Blueprint"]]);

		return (
			<div className={"w-1/2 mx-auto"}>
				<BlueprintForm
					defaultValues={entity}
					mutation={useMutation({
						async mutationFn({ image, regionIds, ...values }) {
							return kysely.transaction().execute(async (tx) => {
								await tx
									.updateTable("Blueprint")
									.set({
										...values,
										image: image ? await withBase64(image) : null,
									})
									.where("id", "=", entity.id)
									.returningAll()
									.executeTakeFirstOrThrow();

								await tx
									.deleteFrom("Blueprint_Region")
									.where("blueprintId", "=", entity.id)
									.execute();

								if (regionIds?.length) {
									await tx
										.insertInto("Blueprint_Region")
										.values(
											regionIds.map((regionId) => ({
												id: genId(),
												blueprintId: entity.id,
												regionId,
											})),
										)
										.execute();
								}
							});
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
