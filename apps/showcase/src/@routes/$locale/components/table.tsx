import { createFileRoute } from "@tanstack/react-router";
import { NavigationState, useSelection } from "@use-pico/client";
import { InventoryItemQuerySchema } from "~/app/inventory/db/InventoryItemQuerySchema";
import { InventoryItemTable } from "~/app/inventory/ui/InventoryItemTable";

export const Route = createFileRoute("/$locale/components/table")({
	validateSearch: InventoryItemQuerySchema.transform(
		({ cursor, sort, ...data }) => ({
			...data,
			cursor: cursor ?? {
				page: 0,
				size: 30,
			},
			sort: sort ?? [
				{
					value: "amount",
					sort: "desc",
				},
			],
		}),
	),
	component() {
		const { where, filter, cursor, sort } = Route.useSearch();
		const navigate = Route.useNavigate();
		const selection = useSelection({});

		return (
			<div className="flex flex-col gap-4 min-w-0">
				<InventoryItemTable
					query={{
						filter,
						where,
						cursor,
						sort,
					}}
					fulltext={NavigationState.fulltext(
						filter?.fulltext,
						navigate,
					)}
					cursor={NavigationState.cursor(cursor, navigate)}
					selection={selection}
					selectionMode={"multi"}
					filter={NavigationState.filter(filter, navigate)}
					sort={NavigationState.sort(sort, navigate)}
				/>
			</div>
		);
	},
});
