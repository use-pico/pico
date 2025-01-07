import {
    createFileRoute,
    useLoaderData,
    useRouteContext,
} from "@tanstack/react-router";
import { zodValidator } from "@tanstack/zod-adapter";
import {
    navigateOnCursor,
    navigateOnFilter,
    navigateOnFulltext,
    navigateOnSelection,
    Tx,
    withListCountLoader,
    withSourceSearchSchema,
} from "@use-pico/client";
import { BuildingBaseSource } from "~/app/derivean/building/base/BuildingBaseSource";
import { ResourceRequirementSchema } from "~/app/derivean/resource/requirement/ResourceRequirementSchema";
import { ResourceRequirementSource } from "~/app/derivean/resource/requirement/ResourceRequirementSource";
import { ResourceRequirementTable } from "~/app/derivean/root/resource/requirement/ResourceRequirementTable";

export const Route = createFileRoute(
	"/$locale/apps/derivean/root/building/base/$id/requirements",
)({
	validateSearch: zodValidator(
		withSourceSearchSchema(ResourceRequirementSchema),
	),
	loaderDeps({ search: { filter, cursor, sort } }) {
		return {
			filter,
			cursor,
			sort,
		};
	},
	async loader({
		context: { queryClient, kysely },
		deps: { filter, cursor, sort },
		params: { id },
	}) {
		return kysely.transaction().execute(async (tx) => {
			const buildingBase = await BuildingBaseSource.getOrThrow$({
				tx,
				id,
			});

			return withListCountLoader({
				tx,
				queryClient,
				source: ResourceRequirementSource,
				sort,
				filter,
				cursor,
				where: {
					resourceId: buildingBase.resourceId,
				},
			});
		});
	},
	component() {
		const { data, count } = Route.useLoaderData();
		const { filter, cursor, selection } = Route.useSearch();
		const { entity } = useLoaderData({
			from: "/$locale/apps/derivean/root/building/base/$id",
		});
		const navigate = Route.useNavigate();
		const { tva } = useRouteContext({ from: "__root__" });
		const tv = tva().slots;

		return (
			<div className={tv.base()}>
				<ResourceRequirementTable
					resourceId={entity.resourceId}
					table={{
						data,
						filter: {
							value: filter,
							set: navigateOnFilter(navigate),
						},
						selection: {
							type: "multi",
							value: selection,
							set: navigateOnSelection(navigate),
						},
					}}
					fulltext={{
						value: filter?.fulltext,
						set: navigateOnFulltext(navigate),
					}}
					cursor={{
						count,
						cursor,
						textTotal: <Tx label={"Number of requirements (label)"} />,
						...navigateOnCursor(navigate),
					}}
				/>
			</div>
		);
	},
});
