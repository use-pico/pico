import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";
import { InventoryItemQuerySchema } from "~/app/inventory/db/InventoryItemQuerySchema";
import { InventoryItemTable } from "~/app/inventory/ui/InventoryItemTable";

export const Route = createFileRoute("/$locale/components/table")({
	validateSearch: z
		.object({
			...InventoryItemQuerySchema.shape,
			selection: z.array(z.string()).default([]),
		})
		.transform(({ cursor, sort, ...data }) => ({
			...data,
			cursor: cursor ?? {
				page: 1,
				size: 30,
			},
			sort: sort ?? [
				{
					value: "amount",
					sort: "desc",
				},
			],
		})),
	component() {
		const { where, filter, cursor, sort, selection } = Route.useSearch();
		const navigate = Route.useNavigate();

		return (
			<div className="flex flex-col gap-4 w-full">
				<InventoryItemTable
					query={{
						filter,
						where,
						cursor,
						sort,
					}}
					// actionTable={{
					// 	width: "4rem",
					// }}
					// filter={TableNavigationState.useFilter(filter, navigate)}
					// fulltext={TableNavigationState.fulltext(
					// 	filter?.fulltext,
					// 	navigate,
					// )}
					// cursor={TableNavigationState.cursorWithCount(
					// 	{
					// 		withCountQuery: someDataCountQuery,
					// 		textTotal: <Tx label={"Number of items"} />,
					// 	},
					// 	navigate,
					// )}
					// cursor={TableNavigationState.useCursorWithCount(
					// 	{
					// 		count,
					// 		cursor,
					// 		textTotal: <Tx label={"Number of items"} />,
					// 	},
					// 	navigate,
					// )}
					// selection={TableNavigationState.selection(
					// 	"multi",
					// 	selection,
					// 	navigate,
					// )}
					// actionRow={{
					// 	action() {
					// 		return (
					// 			<ActionMenu withOverlay>
					// 				<ActionClick>
					// 					<Tx label={"Action"} />
					// 				</ActionClick>
					// 			</ActionMenu>
					// 		);
					// 	},
					// }}
				/>
			</div>
		);
	},
});
