import { useMutation } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import {
    Button,
    JustDropZone,
    toast,
    Tx,
    withToastPromiseTx,
} from "@use-pico/client";
import FileSaver from "file-saver";
import { sql } from "kysely";
import { kysely } from "~/app/derivean/db/kysely";
import type { Database } from "~/app/derivean/db/sdk";
import { GameIcon } from "~/app/derivean/icon/GameIcon";

const sources: (keyof Database)[] = [
	"Tag",
	"Resource",
	"Resource_Tag",
	"Blueprint",
	"Inventory",
	"Region",
	"Region_Inventory",
	"Blueprint_Inventory",
	"Blueprint_Region",
	"Blueprint_Dependency",
	"Blueprint_Conflict",
	"Blueprint_Requirement",
	"Blueprint_Production",
	"Blueprint_Production_Requirement",
	"Blueprint_Production_Dependency",
	"Blueprint_Production_Resource",
] as const;

export const Route = createFileRoute("/$locale/apps/derivean/root/")({
	component() {
		const exportMutation = useMutation({
			mutationKey: ["export"],
			async mutationFn() {
				return toast.promise(
					(async () => {
						const data: any[] = [];

						await kysely.transaction().execute(async (tx) => {
							for await (const source of sources) {
								data.push({
									source,
									entities: await tx.selectFrom(source).selectAll().execute(),
								});
							}
						});

						FileSaver.saveAs(
							new Blob([JSON.stringify(data)], {
								type: "application/json;charset=utf-8",
							}),
							"export.json",
						);
					})(),
					withToastPromiseTx("Export game files"),
				);
			},
		});

		return (
			<div className={"flex flex-col gap-4 w-2/3 mx-auto"}>
				<JustDropZone
					onDrop={async (files) => {
						const [file] = files;
						if (!file) {
							return;
						}

						const data = JSON.parse(await file.text());

						await sql`PRAGMA foreign_keys = OFF`.execute(kysely);

						await toast.promise(
							kysely.transaction().execute(async (tx) => {
								for await (const { source } of data) {
									const sourceInstance = sources.find((s) => s === source);
									if (!sourceInstance) {
										continue;
									}
									await tx.deleteFrom(sourceInstance).execute();
								}

								for await (const { source, entities } of data) {
									const sourceInstance = sources.find((s) => s === source);
									if (!sourceInstance) {
										continue;
									}

									for await (const entity of Object.values(entities)) {
										await tx
											.insertInto(sourceInstance)
											.values(entity as any)
											.execute();
									}
								}
							}),
							withToastPromiseTx("Import game files"),
						);

						await sql`PRAGMA foreign_keys = ON`.execute(kysely);
					}}
				/>
				<div className={"flex items-center justify-center mt-10 gap-4"}>
					<Button
						iconEnabled={GameIcon}
						loading={exportMutation.isPending}
						onClick={() => exportMutation.mutate()}
						variant={{ variant: "subtle" }}
					>
						<Tx label={"Export game files (label)"} />
					</Button>
				</div>

				<h2>TODO</h2>
				<ul className={"flex flex-col gap-2"}>
					<li>
						<h2>Supply/Demand</h2>
						<p>Each building may set supply resources</p>
						<p>Each building may set demanded resources</p>
						<p>
							The point is to automatically distribute resources between between
							buildings, so it's enough to mark resource as a supply, so others
							in the chain may take it.
						</p>
						<p>
							Automate construction - when confirmed (plan == false), generate
							demand orders.
						</p>
					</li>
					<li>
						<p>
							Rework roads: there will be waypoint (as a resource distribution
							node). Building may be connected only to waypoints, so minimum of
							1 waypoint between two buildings is required.
						</p>
						<p>Resource distribution weight will be done on Road size.</p>
						<p>
							Subscribe (or demand) resources from the waypoint. There could be
							a list of subscribed buildings per resource, so priority could be
							simply changed.
						</p>
					</li>
					<li>Fix Cycles as it's not bound to the Map.</li>
					<li>
						<p>
							Idea of lands; define lands in root, their size boundaries (will
							be randomized), available resources (may be randomized).
						</p>

						<p>
							Here may be time for citizens, like geologist who will investigate
							a land to find, what's in there.
						</p>

						<p>
							Generate land into a map (so there will be Land as definition and
							Land as an instance).
						</p>

						<p>For start, list all lands + zoom to land.</p>
					</li>
					<li>
						Fetch production on building from production next to prod* ids on
						the building.
					</li>
					<li>
						Add notification center like inventory is full, production is full
						and so on.
					</li>
					<li>
						Upgrades: Put everything into the building, drive upgrades by
						passive "Research" points
					</li>
					<li>
						Bundle default gameplay as exported json (put into public); add
						button to root to load default/selected gameplay; idea is a few
						buttons: Settler like, Fantasy, AoE and so on.
					</li>
					<li>
						Define game ending rules: amount of resources in (individual
						resourece per required cycle), required building in a cycle. When a
						player fail, game end with the ability to reset. Each game rule may
						have an ending message to show.
					</li>
					<li>
						Define winning rules: amount of resources / building built in
						specific cycle. When rules are not met, it's like a fail.
					</li>
					<li>
						Add something like world available resources + the ability to drain
						and add resources to the world. Something like Wolrd_Inventory where
						0 means unlimited resources.
					</li>
					<li>
						World renewal resources: a list of resources with cycles and amount
						when they got renewed (world_renewal_queue).
					</li>
					<li>
						Defines seasons: list of cyclic seasons with their length; resource
						production may be bound to specific season(s).
					</li>
					<li>
						Add maintenance cost for a building: when a cycle ends, cost is
						deducted from the inventory. If there is not enough resources,
						building will be marked as offline (closed for production).
					</li>
					<li>
						Dispaly resources per season (some resources will be available only
						in specific season)
					</li>
					<li>
						Add resource probability drop: some resources may have not be
						produces (like a crop). This should be thinked out.
					</li>
				</ul>
			</div>
		);
	},
});
