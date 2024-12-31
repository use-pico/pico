import { createFileRoute, useRouteContext } from "@tanstack/react-router";
import { zodValidator } from "@tanstack/zod-adapter";
import {
    handleOnFulltext,
    handleOnPage,
    handleOnSize,
    Tx,
} from "@use-pico/client";
import { withSearchSchema } from "@use-pico/common";
import { BuildingRequirementResourceRepository } from "~/app/derivean/building/requirement/resource/BuildingRequirementResourceRepository";
import { BuildingRequirementResourceSchema } from "~/app/derivean/building/requirement/resource/BuildingRequirementResourceSchema";
import { BuildingRequirementResourceTable } from "~/app/derivean/building/requirement/resource/BuildingRequirementResourceTable";

const SearchSchema = withSearchSchema({
	filter: BuildingRequirementResourceSchema.filter,
});

const loader = BuildingRequirementResourceRepository.withRouteListLoader();

export const Route = createFileRoute(
	"/$locale/apps/derivean/root/building/base/$id/requirement/resource/list",
)({
	component: () => {
		const { data, count } = Route.useLoaderData();
		const { global, filter, cursor, selection } = Route.useSearch();
		const { id } = Route.useParams();
		const navigate = Route.useNavigate();
		const { tva } = useRouteContext({ from: "__root__" });
		const tv = tva().slots;

		return (
			<div className={tv.base()}>
				<BuildingRequirementResourceTable
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
						value: global?.fulltext,
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
	validateSearch: zodValidator(SearchSchema),
	loaderDeps({ search: { global, filter, cursor } }) {
		return {
			global,
			filter,
			cursor,
		};
	},
	async loader({ context, deps: { filter, ...deps }, params: { id } }) {
		return loader({
			context,
			deps: {
				...deps,
				filter: {
					...filter,
					baseBuildingId: id,
				},
			},
		});
	},
});
