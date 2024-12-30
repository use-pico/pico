import { createFileRoute, useRouteContext } from "@tanstack/react-router";
import { zodValidator } from "@tanstack/zod-adapter";
import {
    handleOnFulltext,
    handleOnPage,
    handleOnSize,
    Tx,
} from "@use-pico/client";
import { withSearchSchema } from "@use-pico/common";
import { InventorySlotSchema } from "~/app/derivean/inventory/slot/InventorySlotSchema";
import { SlotRepository } from "~/app/derivean/slot/SlotRepository";
import { SlotTable } from "~/app/derivean/slot/SlotTable";

const SearchSchema = withSearchSchema({ filter: InventorySlotSchema.filter });

export const Route = createFileRoute(
	"/$locale/apps/derivean/root/inventory/$id/slot/list/",
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
				<SlotTable
					inventoryId={id}
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
	async loader({
		context: { queryClient },
		deps: { global, filter, cursor },
		params: { id },
	}) {
		return {
			data: await SlotRepository.withListLoader({
				queryClient,
				filter: {
					...global,
					...filter,
				},
				where: {
					inventoryId: id,
				},
				cursor,
			}),
			count: await SlotRepository.withCountLoader({
				queryClient,
				filter: { ...global, ...filter },
				where: {
					inventoryId: id,
				},
			}),
		};
	},
});
