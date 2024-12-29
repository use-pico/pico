import { createFileRoute, useRouteContext } from "@tanstack/react-router";
import { zodValidator } from "@tanstack/zod-adapter";
import {
    handleOnFulltext,
    handleOnPage,
    handleOnSize,
    Tx,
} from "@use-pico/client";
import { withSearchSchema } from "@use-pico/common";
import { ItemRepository } from "~/app/derivean/item/ItemRepository";
import { ItemSchema } from "~/app/derivean/item/ItemSchema";
import { ItemTable } from "~/app/derivean/item/ItemTable";

const SearchSchema = withSearchSchema({
	filter: ItemSchema.filter,
});

export const Route = createFileRoute("/$locale/apps/derivean/root/item/list/")({
	component: () => {
		const { data, count } = Route.useLoaderData();
		const { global, filter, cursor, selection } = Route.useSearch();
		const navigate = Route.useNavigate();
		const { tva } = useRouteContext({ from: "__root__" });
		const tv = tva().slots;

		return (
			<div className={tv.base()}>
				<ItemTable
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
			data: await ItemRepository.withListLoader({
				queryClient,
				filter: {
					...global,
					...filter,
				},
				cursor,
			}),
			count: await ItemRepository.withCountLoader({
				queryClient,
				filter: { ...global, ...filter },
			}),
		};
	},
});
