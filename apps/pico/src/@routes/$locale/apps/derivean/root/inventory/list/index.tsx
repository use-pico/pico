import { createFileRoute, useRouteContext } from "@tanstack/react-router";
import { zodValidator } from "@tanstack/zod-adapter";
import {
    handleOnFulltext,
    handleOnPage,
    handleOnSize,
    Tx,
} from "@use-pico/client";
import { withSearchSchema } from "@use-pico/common";
import { InventoryQuery } from "~/app/derivean/inventory/InventoryQuery";
import { InventoryTable } from "~/app/derivean/inventory/InventoryTable";
import { InventoryFilterSchema } from "~/app/derivean/inventory/schema/InventoryFilterSchema";

const SearchSchema = withSearchSchema({ filter: InventoryFilterSchema });

export const Route = createFileRoute(
	"/$locale/apps/derivean/root/inventory/list/",
)({
	component: () => {
		const { data, count } = Route.useLoaderData();
		const { global, filter, cursor, selection } = Route.useSearch();
		const navigate = Route.useNavigate();
		const { tva } = useRouteContext({ from: "__root__" });
		const tv = tva().slots;

		return (
			<div className={tv.base()}>
				<InventoryTable
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
	async loader({ context: { queryClient }, deps: { global, filter, cursor } }) {
		return {
			data: await InventoryQuery.withListLoader({
				queryClient,
				filter: {
					...global,
					...filter,
				},
				cursor,
			}),
			count: await InventoryQuery.withCountLoader({
				queryClient,
				filter: { ...global, ...filter },
			}),
		};
	},
});
