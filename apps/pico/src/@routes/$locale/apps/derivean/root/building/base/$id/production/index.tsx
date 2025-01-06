import { createFileRoute, useRouteContext } from "@tanstack/react-router";
import { zodValidator } from "@tanstack/zod-adapter";
import {
    handleOnFulltext,
    handleOnPage,
    handleOnSize,
    Tx,
    withListCountLoader,
    withSourceSearchSchema,
} from "@use-pico/client";
import { BaseBuildingProductionSchema } from "~/app/derivean/building/base/production/BaseBuildingProductionSchema";
import { BaseBuildingProductionSource } from "~/app/derivean/building/base/production/BaseBuildingProductionSource";
import { BaseBuildingProductionTable } from "~/app/derivean/building/base/production/BaseBuildingProductionTable";

export const Route = createFileRoute(
	"/$locale/apps/derivean/root/building/base/$id/production/",
)({
	validateSearch: zodValidator(
		withSourceSearchSchema(BaseBuildingProductionSchema),
	),
	loaderDeps({ search: { filter, cursor } }) {
		return {
			filter,
			cursor,
		};
	},
	async loader({
		context: { queryClient, kysely },
		deps: { filter, cursor },
		params: { id },
	}) {
		return kysely.transaction().execute(async (tx) => {
			return withListCountLoader({
				tx,
				queryClient,
				source: BaseBuildingProductionSource,
				filter,
				cursor,
				where: {
					baseBuildingId: id,
				},
			});
		});
	},
	component: () => {
		const { data, count } = Route.useLoaderData();
		const { filter, cursor, selection } = Route.useSearch();
		const { id } = Route.useParams();
		const navigate = Route.useNavigate();
		const { tva } = useRouteContext({ from: "__root__" });
		const tv = tva().slots;

		return (
			<div className={tv.base()}>
				<BaseBuildingProductionTable
					baseBuildingId={id}
					table={{
						data,
						filter: {
							value: filter,
							set(value) {
								navigate({
									search: ({ cursor, ...prev }) => ({
										...prev,
										filter: value,
										cursor: { ...cursor, page: 0 },
									}),
								});
							},
						},
						selection: {
							type: "multi",
							value: selection,
							set(selection) {
								navigate({
									search(prev) {
										return {
											...prev,
											selection,
										};
									},
								});
							},
						},
					}}
					fulltext={{
						onFulltext: handleOnFulltext(navigate),
						value: filter?.fulltext,
					}}
					cursor={{
						count,
						cursor,
						textTotal: <Tx label={"Number of items"} />,
						onPage: handleOnPage(navigate),
						onSize: handleOnSize(navigate),
					}}
				/>
			</div>
		);
	},
});
