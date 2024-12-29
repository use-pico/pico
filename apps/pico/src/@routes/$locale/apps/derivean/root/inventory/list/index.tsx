import { createFileRoute, useRouteContext } from "@tanstack/react-router";
import { zodValidator } from "@tanstack/zod-adapter";
import {
    handleOnFulltext,
    handleOnPage,
    handleOnSize,
    Tx,
} from "@use-pico/client";
import { withSearchSchema } from "@use-pico/common";
import { InventoryRepository } from "~/app/derivean/inventory/InventoryRepository";
import { InventorySchema } from "~/app/derivean/inventory/InventorySchema";
import { InventoryTable } from "~/app/derivean/inventory/InventoryTable";

const SearchSchema = withSearchSchema({ filter: InventorySchema.filter });

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
			data: await InventoryRepository.withListLoader({
				queryClient,
				filter: {
					...global,
					...filter,
				},
				cursor,
			}),
			count: await InventoryRepository.withCountLoader({
				queryClient,
				filter: { ...global, ...filter },
			}),
		};
	},
});
