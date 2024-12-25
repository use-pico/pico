import {
    createFileRoute,
    Outlet,
    useRouteContext,
} from "@tanstack/react-router";
import { InventoryIndexMenu } from "~/app/derivean/inventory/InventoryIndexMenu";
import { InventoryPreview } from "~/app/derivean/inventory/InventoryPreview";
import { InventoryQuery } from "~/app/derivean/inventory/InventoryQuery";

export const Route = createFileRoute(
	"/$locale/apps/derivean/root/inventory/$id",
)({
	component() {
		const { tva } = useRouteContext({ from: "__root__" });
		const { inventory } = Route.useLoaderData();

		const tv = tva().slots;

		return (
			<div className={tv.base()}>
				<InventoryPreview entity={inventory} />

				<InventoryIndexMenu entity={inventory} />

				<Outlet />
			</div>
		);
	},
	async loader({ context: { queryClient }, params: { id } }) {
		return {
			inventory: await InventoryQuery.withFetchLoader({
				queryClient,
				where: { id },
			}),
		};
	},
});
