import { createFileRoute, useRouteContext } from "@tanstack/react-router";
import { zodValidator } from "@tanstack/zod-adapter";
import {
    handleOnFulltext,
    handleOnPage,
    handleOnSize,
    Tx,
} from "@use-pico/client";
import { withSearchSchema } from "@use-pico/common";
import { BlueprintTable } from "~/app/derivean/blueprint/BlueprintTable";
import { BlueprintFilterSchema } from "~/app/derivean/blueprint/schema/BlueprintFilterSchema";
import { BlueprintSchema } from "~/app/derivean/blueprint/schema/BlueprintSchema";
import { withBlueprintCount } from "~/app/derivean/blueprint/withBlueprintCount";
import { withBlueprintListLoader } from "~/app/derivean/blueprint/withBlueprintListLoader";

const SearchSchema = withSearchSchema({
	data: BlueprintSchema,
	filter: BlueprintFilterSchema,
});

export const Route = createFileRoute(
	"/$locale/apps/derivean/root/blueprint/list/",
)({
	component: () => {
		const { blueprints, count } = Route.useLoaderData();
		const { global, filter, cursor, selection } = Route.useSearch();
		const navigate = Route.useNavigate();
		const { tva } = useRouteContext({ from: "__root__" });
		const tv = tva().slots;

		return (
			<div className={tv.base()}>
				<BlueprintTable
					table={{
						data: blueprints,
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
	loaderDeps: ({ search: { global, filter, cursor } }) => ({
		global,
		filter,
		cursor,
	}),
	loader: async ({
		context: { queryClient },
		deps: { global, filter, cursor },
	}) => {
		return {
			blueprints: await withBlueprintListLoader({
				queryClient,
				filter: {
					...global,
					...filter,
				},
				cursor,
			}),
			count: await withBlueprintCount({
				queryClient,
				where: { ...global, ...filter },
			}),
		};
	},
});
