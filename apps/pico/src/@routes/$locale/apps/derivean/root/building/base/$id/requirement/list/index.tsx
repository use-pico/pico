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
import { BaseBuildingRequirementSchema } from "~/app/derivean/building/base/requirement/BaseBuildingRequirementSchema";
import { BaseBuildingRequirementSource } from "~/app/derivean/building/base/requirement/BaseBuildingRequirementSource";
import { BaseBuildingRequirementTable } from "~/app/derivean/building/base/requirement/BaseBuildingRequirementTable";

export const Route = createFileRoute(
	"/$locale/apps/derivean/root/building/base/$id/requirement/list/",
)({
	validateSearch: zodValidator(
		withSourceSearchSchema(BaseBuildingRequirementSchema),
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
				source: BaseBuildingRequirementSource,
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
				<BaseBuildingRequirementTable
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
