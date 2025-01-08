import { useMutation } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { Button, JustDropZone, toast, Tx } from "@use-pico/client";
import { translator } from "@use-pico/common";
import FileSaver from "file-saver";
import type { Database } from "~/app/derivean/db/Database";
import { kysely } from "~/app/derivean/db/db";
import { GameIcon } from "~/app/derivean/icon/GameIcon";

const sources: (keyof Database)[] = [
	"Resource",
	"Resource_Tag",
	"Resource_Production",
	"Resource_Requirement",
	"Building_Base",
	"Building_Base_Inventory",
	"Building_Base_Production",
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
							new Blob([JSON.stringify(data, null, 2)], {
								type: "application/json;charset=utf-8",
							}),
							"export.json",
						);
					})(),
					{
						success: translator.text("Exported (toast)"),
						error: translator.text("Export failed (toast)"),
						loading: translator.text("Exporting (toast)"),
					},
				);
			},
		});

		return (
			<div className={"flex flex-col gap-4 w-2/3 mx-auto"}>
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
				<JustDropZone
					onDrop={async (files) => {
						const [file] = files;
						if (!file) {
							return;
						}

						const data = JSON.parse(await file.text());

						await kysely.transaction().execute(async (tx) => {
							for await (const { source } of data) {
								const sourceInstance = sources[source];
								if (!sourceInstance) {
									throw new Error(`Unknown source [${source}]`);
								}
								await tx.deleteFrom(sourceInstance).execute();
							}

							for await (const { source, entities } of data) {
								const sourceInstance = sources[source];
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
						});
					}}
				/>
			</div>
		);
	},
});
