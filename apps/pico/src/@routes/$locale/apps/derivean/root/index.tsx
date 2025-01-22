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
	"Blueprint_Inventory",
	"Blueprint_Dependency",
	"Blueprint_Conflict",
	"Blueprint_Requirement",
	"Blueprint_Production",
	"Blueprint_Production_Requirement",
	"Blueprint_Production_Dependency",
	"Blueprint_Production_Resource",
	"Default_Inventory",
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
										throw new Error(`Unknown source [${source}]`);
									}
									await tx.deleteFrom(sourceInstance).execute();
								}

								for await (const { source, entities } of data) {
									const sourceInstance = sources.find((s) => s === source);
									if (!sourceInstance) {
										throw new Error(`Unknown source [${source}]`);
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
						Add notification center like inventory is full, production is full
						and so on.
					</li>

					<li>
						Add exclusive to (building "exclusiveToId" cannot be built when
						target exists); Ok, exclusive to will be m:n.
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
						Idea: Blueprint should have display list (like present resource in
						inventory), also production should have display list (like present
						resource in inventory).
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
					<li>
						Production line should have requirements, but also something like
						"display requirements" required to even show the production line.
						Same for buildings.
					</li>
				</ul>
			</div>
		);
	},
});
