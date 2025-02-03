import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import {
    Button,
    FormCss,
    FormError,
    FormInput,
    Icon,
    Modal,
    onSubmit,
    Progress,
    toast,
    TrashIcon,
    Tx,
    useInvalidator,
} from "@use-pico/client";
import {
    genId,
    toHumanNumber,
    translator,
    tvc,
    withFloatSchema,
} from "@use-pico/common";
import type { FC } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { kysely } from "~/app/derivean/db/kysely";
import type { InventoryPanel } from "~/app/derivean/game/GameMap2/Inventory/InventoryPanel";
import { DemandIcon } from "~/app/derivean/icon/DemandIcon";
import { PackageIcon } from "~/app/derivean/icon/PackageIcon";
import { SupplyIcon } from "~/app/derivean/icon/SupplyIcon";

const DemandSchema = z.object({
	buildingId: z.string().min(1),
	resourceId: z.string().min(1),
	mapId: z.string().min(1),
	userId: z.string().min(1),
	amount: withFloatSchema(),
});
type DemandSchema = typeof DemandSchema;

export namespace Item {
	export interface Props {
		mapId: string;
		userId: string;
		inventory: InventoryPanel.Inventory;
	}
}

export const Item: FC<Item.Props> = ({ mapId, userId, inventory }) => {
	const invalidator = useInvalidator([["GameMap"]]);
	const toggleSupplyMutation = useMutation({
		async mutationFn({
			buildingId,
			resourceId,
			supplyId,
			mapId,
			userId,
		}: {
			buildingId: string;
			resourceId: string;
			mapId: string;
			userId: string;
			supplyId?: string | null;
		}) {
			return kysely.transaction().execute(async (tx) => {
				if (supplyId) {
					return tx.deleteFrom("Supply").where("id", "=", supplyId).execute();
				}
				return tx
					.insertInto("Supply")
					.values({
						id: genId(),
						buildingId,
						resourceId,
						mapId,
						userId,
					})
					.execute();
			});
		},
		async onSuccess() {
			await invalidator();
		},
	});
	const toggleDemandMutation = useMutation({
		async mutationFn({
			buildingId,
			resourceId,
			demandId,
			mapId,
			userId,
			amount,
		}: {
			buildingId: string;
			resourceId: string;
			demandId?: string | null;
			mapId: string;
			userId: string;
			amount: number;
		}) {
			return kysely.transaction().execute(async (tx) => {
				if (demandId) {
					return tx.deleteFrom("Demand").where("id", "=", demandId).execute();
				}

				const { sum } = await tx
					.selectFrom("Transport as t")
					.select((eb) => eb.fn.sum<number>("t.amount").as("sum"))
					.where("t.resourceId", "=", resourceId)
					.where("t.targetId", "=", buildingId)
					.executeTakeFirstOrThrow();

				const request = amount + (sum || 0);

				if (inventory.limit > 0 && request <= 0) {
					toast.error(
						translator.text(
							"Not enough space (inventory is full/all resources are already on the way) (toast)",
						),
					);
					return;
				}

				return tx
					.insertInto("Demand")
					.values({
						id: genId(),
						buildingId,
						resourceId,
						mapId,
						userId,
						amount: inventory.limit > 0 ? request : 1,
						priority: 0,
						type: "storage",
					})
					.execute();
			});
		},
		async onSuccess() {
			await invalidator();
		},
	});

	const form = useForm<z.infer<DemandSchema>>({
		resolver: zodResolver(DemandSchema),
		defaultValues: {
			mapId,
			userId,
			buildingId: inventory.buildingId,
			resourceId: inventory.resourceId,
			amount: inventory.limit > 0 ? inventory.limit - inventory.amount : 1,
		},
	});
	const formTva = FormCss({
		isLoading: form.formState.isLoading,
		isSubmitting: form.formState.isSubmitting,
	}).slots;

	return (
		<div
			className={tvc([
				"flex",
				"flex-col",
				"gap-2",
				"rounded-md",
				"border",
				"border-slate-300",
				"p-2",
				"cursor-default",
				"hover:bg-slate-100",
				inventory.limit > 0 && inventory.amount >= inventory.limit ?
					[
						"border-amber-400",
						"bg-amber-50",
						"hover:bg-amber-50",
						"hover:border-amber-600",
					]
				:	undefined,
				inventory.supplyId || inventory.demandId ?
					[
						"bg-purple-50",
						"border-purple-400",
						"hover:bg-purple-50",
						"hover:border-purple-400",
					]
				:	undefined,
			])}
		>
			<div className={"flex flex-row items-center justify-between"}>
				<div
					className={tvc([
						"flex",
						"flex-row",
						"gap-2",
						"items-center",
						inventory.supplyId || inventory.demandId ?
							["text-purple-600"]
						:	undefined,
					])}
				>
					<div className={"font-bold"}>{inventory.name}</div>
					{inventory.supplyId ?
						<Icon icon={SupplyIcon} />
					:	null}
					{inventory.demandId ?
						<Icon icon={DemandIcon} />
					:	null}
				</div>
				{toHumanNumber({ number: inventory.amount })} /{" "}
				{toHumanNumber({ number: inventory.limit })}
			</div>
			<div className={"flex flex-row gap-2 items-center justify-between"}>
				<Button
					iconEnabled={inventory.supplyId ? TrashIcon : SupplyIcon}
					loading={toggleSupplyMutation.isPending}
					onClick={() => {
						toggleSupplyMutation.mutate({
							mapId,
							userId,
							buildingId: inventory.buildingId,
							resourceId: inventory.resourceId,
							supplyId: inventory.supplyId,
						});
					}}
					variant={{ variant: "subtle" }}
				>
					{inventory.supplyId ?
						<Tx label={"Cancel supply (label)"} />
					:	<Tx label={"Supply resource (label)"} />}
				</Button>
				<div
					className={tvc([
						"border-2",
						"border-purple-400",
						"rounded-md",
						"w-[64px]",
						"h-[64px]",
						"bg-contain",
						`bg-${inventory.resourceId}`,
					])}
				/>
				{inventory.demandId ?
					<Button
						iconEnabled={TrashIcon}
						loading={toggleDemandMutation.isPending}
						onClick={() => {
							toggleDemandMutation.mutate({
								mapId,
								userId,
								buildingId: inventory.buildingId,
								resourceId: inventory.resourceId,
								amount: 0,
								/**
								 * Providing demandId will do the removal.
								 */
								demandId: inventory.demandId,
							});
						}}
						variant={{ variant: "subtle" }}
					>
						<Tx label={"Cancel demand (label)"} />
					</Button>
				:	<Modal
						textTitle={<Tx label={"Demand resource (title)"} />}
						target={
							<Button
								iconEnabled={DemandIcon}
								variant={{ variant: "subtle" }}
							>
								<Tx label={"Demand resource (label)"} />
							</Button>
						}
						css={{
							modal: ["w-1/3"],
						}}
					>
						<form
							className={formTva.base()}
							onSubmit={onSubmit<DemandSchema>({
								form,
								mutation: toggleDemandMutation,
							})}
						>
							<FormError
								variant={{ highlight: true }}
								error={form.formState.errors.root}
							/>

							<FormInput
								formState={form.formState}
								name={"amount"}
								label={<Tx label={"Demanded amount (label)"} />}
							>
								<input
									type={"number"}
									min={1}
									max={inventory.limit - inventory.amount}
									className={formTva.input()}
									{...form.register("amount")}
								/>
							</FormInput>

							<Button
								iconEnabled={DemandIcon}
								iconDisabled={PackageIcon}
								type={"submit"}
							>
								<Tx label={"Submit demand (submit)"} />
							</Button>
						</form>
					</Modal>
				}
			</div>
			{inventory.limit > 0 ?
				<Progress
					variant={{ size: "md" }}
					value={(100 * inventory.amount) / inventory.limit}
					css={{
						progress:
							inventory.amount >= inventory.limit ?
								["bg-amber-500"]
							:	undefined,
					}}
				/>
			:	null}
		</div>
	);
};
