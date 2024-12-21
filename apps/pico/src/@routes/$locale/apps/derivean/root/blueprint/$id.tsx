import {
    createFileRoute,
    Outlet,
    useRouteContext,
} from "@tanstack/react-router";
import { BlueprintIndexMenu } from "~/app/derivean/blueprint/BlueprintIndexMenu";
import { BlueprintPreview } from "~/app/derivean/blueprint/BlueprintPreview";
import { withBlueprintLoader } from "~/app/derivean/blueprint/withBlueprintLoader";

export const Route = createFileRoute(
	"/$locale/apps/derivean/root/blueprint/$id",
)({
	component() {
		const { tva } = useRouteContext({ from: "__root__" });
		const { blueprint } = Route.useLoaderData();
		const tv = tva().slots;

		return (
			<div className={tv.base()}>
				<BlueprintPreview entity={blueprint} />

				<BlueprintIndexMenu entity={blueprint} />

				<Outlet />
			</div>
		);
	},
	async loader({ context: { queryClient }, params: { id } }) {
		return {
			blueprint: await withBlueprintLoader({ queryClient, where: { id } }),
		};
	},
});
