import dagre from "@dagrejs/dagre";
import { createFileRoute } from "@tanstack/react-router";
import { zodValidator } from "@tanstack/zod-adapter";
import { z } from "zod";
import { Editor } from "~/app/derivean/root/Editor";
import { withLayout } from "~/app/derivean/utils/withLayout";

export const Route = createFileRoute("/$locale/apps/derivean/root/editor")({
	validateSearch: zodValidator(
		z.object({
			zoomTo: z.string().optional(),
		}),
	),
	async loader({ context: { kysely } }) {
		const blueprints = (
			await kysely
				.selectFrom("Blueprint")
				.select(["id", "name", "productionLimit", "cycles", "sort"])
				.execute()
		).map((data) => ({
			id: data.id,
			position: { x: 0, y: 0 },
			data,
			type: "blueprint",
		}));

		const blueprintDependencies = (
			await kysely
				.selectFrom("Blueprint_Dependency")
				.select(["id", "blueprintId", "dependencyId"])
				.execute()
		).map(({ id, blueprintId, dependencyId }) => {
			return {
				id,
				source: dependencyId,
				target: blueprintId,
				type: "dependency",
			};
		});

		return withLayout({
			graph: new dagre.graphlib.Graph().setDefaultEdgeLabel(() => ({})),
			nodes: [...blueprints],
			edges: [...blueprintDependencies],
		});
	},
	component() {
		const data = Route.useLoaderData();
		const { zoomTo } = Route.useSearch();

		return (
			<Editor
				data={data}
				zoomTo={zoomTo}
			/>
		);
	},
});
