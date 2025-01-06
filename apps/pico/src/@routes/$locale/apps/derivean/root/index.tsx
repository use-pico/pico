import { useMutation } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { Button, JustDropZone, toast, Tx } from "@use-pico/client";
import { translator } from "@use-pico/common";
import FileSaver from "file-saver";
import { BaseBuildingSource } from "~/app/derivean/building/base/BaseBuildingSource";
import { BaseBuildingLimitSource } from "~/app/derivean/building/base/limit/BaseBuildingLimitSource";
import { BaseBuildingProductionSource } from "~/app/derivean/building/base/production/BaseBuildingProductionSource";
import { BaseBuildingProductionRequirementSource } from "~/app/derivean/building/base/production/requirement/BaseBuildingProductionRequirementSource";
import { BaseBuildingRequirementSource } from "~/app/derivean/building/base/requirement/BaseBuildingRequirementSource";
import { kysely } from "~/app/derivean/db/db";
import { GameIcon } from "~/app/derivean/icon/GameIcon";
import { ResourceSource } from "~/app/derivean/resource/ResourceSource";
import { ResourceTagSource } from "~/app/derivean/resource/tag/ResourceTagSource";
import { TagSource } from "~/app/derivean/tag/TagSource";

export const Route = createFileRoute("/$locale/apps/derivean/root/")({
	component() {
		const exportMutation = useMutation({
			mutationKey: ["export"],
			async mutationFn() {
				return toast.promise(
					(async () => {
						const sources = [
							BaseBuildingSource,
							ResourceSource,
							TagSource,
							ResourceTagSource,
							BaseBuildingRequirementSource,
							BaseBuildingLimitSource,
							BaseBuildingProductionSource,
							BaseBuildingProductionRequirementSource,
						] as const;

						const data: any[] = [];

						await kysely.transaction().execute(async (tx) => {
							for await (const source of sources) {
								const entities: any = {};
								(
									await source.list$({ tx, cursor: { page: 0, size: 5000 } })
								).forEach((entity) => {
									entities[entity.id] = source.schema.entity.parse(entity);
								});
								data.push({
									source: source.name,
									entities,
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
			<div className={"flex flex-col gap-4"}>
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

						const sources = {
							[BaseBuildingSource.name]: "BaseBuilding",
							[ResourceSource.name]: "Resource",
							[TagSource.name]: "Tag",
							[ResourceTagSource.name]: "Resource_Tag",
							[BaseBuildingRequirementSource.name]: "BaseBuilding_Requirement",
							[BaseBuildingLimitSource.name]: "BaseBuilding_Limit",
							[BaseBuildingProductionSource.name]: "BaseBuildingProduction",
							[BaseBuildingProductionRequirementSource.name]:
								"BaseBuildingProductionRequirement",
						} as const;

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
