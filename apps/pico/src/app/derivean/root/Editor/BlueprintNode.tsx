import { useMutation, useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "@tanstack/react-router";
import {
    Action,
    EditIcon,
    Icon,
    LoadingOverlay,
    Modal,
    toast,
    Tx,
    useInvalidator,
    withListCount,
    withToastPromiseTx,
} from "@use-pico/client";
import {
    withBoolSchema,
    withJsonArraySchema,
    type IdentitySchema,
} from "@use-pico/common";
import { Handle, NodeProps, Position, type Node } from "@xyflow/react";
import { sql } from "kysely";
import { useState, type FC } from "react";
import { z } from "zod";
import { kysely } from "~/app/derivean/db/kysely";
import { BlueprintIcon } from "~/app/derivean/icon/BlueprintIcon";
import { ProductionIcon } from "~/app/derivean/icon/ProductionIcon";
import { ResourceIcon } from "~/app/derivean/icon/ResourceIcon";
import { BlueprintForm } from "~/app/derivean/root/BlueprintForm";
import { BlueprintProductionTable } from "~/app/derivean/root/BlueprintProductionTable";
import { BlueprintRequirementTable } from "~/app/derivean/root/BlueprintRequirementTable";
import { BlueprintProductionRequirementSchema } from "~/app/derivean/schema/BlueprintProductionRequirementSchema";

export namespace BlueprintNode {
	export type Data = IdentitySchema.Type & {
		name: string;
	};

	export interface Props extends NodeProps<Node<Data, "blueprint">> {
		//
	}
}

export const BlueprintNode: FC<BlueprintNode.Props> = ({
	id,
	data,
	isConnectable,
}) => {
	const { locale } = useParams({ from: "/$locale" });
	const navigate = useNavigate();

	return (
		<div
			className={"min-w-[10rem]"}
			onDoubleClick={() => {
				navigate({
					to: "/$locale/apps/derivean/root/blueprint/$id/view",
					params: { locale, id },
				});
			}}
		>
			<Handle
				type={"target"}
				position={Position.Left}
				className={"w-4 h-4"}
			/>
			<div className={"flex flex-col gap-2 items-start"}>
				<div className={"flex flex-row items-center gap-2"}>
					<Icon icon={BlueprintIcon} />
					<div className={"font-bold"}>{data.name}</div>
				</div>
				<div
					className={
						"flex flex-row items-center gap-2 border bg-slate-50 border-slate-200 rounded w-full p-1"
					}
					onClick={(e) => e.stopPropagation()}
					onDoubleClick={(e) => e.stopPropagation()}
					onMouseDown={(e) => e.stopPropagation()}
				>
					<Modal
						target={<Action iconEnabled={ResourceIcon} />}
						outside={true}
						textTitle={<Tx label={"Required resources (modal)"} />}
						css={{
							modal: ["w-1/3"],
						}}
					>
						{() => {
							const [page, setPage] = useState(0);
							const [size, setSize] = useState(15);

							const data = useQuery({
								queryKey: ["Blueprint_Requirement", id, { page, size }],
								async queryFn() {
									return kysely.transaction().execute(async (tx) => {
										return withListCount({
											select: tx
												.selectFrom("Blueprint_Requirement as br")
												.innerJoin("Resource as r", "r.id", "br.resourceId")
												.select([
													"br.id",
													"r.name",
													"br.resourceId",
													"br.amount",
													"br.passive",
												])
												.where("br.blueprintId", "=", id)
												.orderBy("r.name", "asc"),
											query({ select, where }) {
												let $select = select;

												if (where?.id) {
													$select = $select.where("br.id", "=", where.id);
												}
												if (where?.idIn) {
													$select = $select.where("br.id", "in", where.idIn);
												}

												return $select;
											},
											output: z.object({
												id: z.string().min(1),
												name: z.string().min(1),
												resourceId: z.string().min(1),
												amount: z.number().nonnegative(),
												passive: withBoolSchema(),
											}),
											cursor: {
												page,
												size,
											},
										});
									});
								},
							});

							return (
								data.isLoading ? <LoadingOverlay />
								: data.isSuccess ?
									<BlueprintRequirementTable
										blueprintId={id}
										table={{
											data: data.data.data,
										}}
										cursor={{
											count: data.data.count,
											cursor: {
												page,
												size,
											},
											textTotal: (
												<Tx label={"Number of requirements (label)"} />
											),
											onPage(page) {
												setPage(page);
											},
											onSize(size) {
												setSize(size);
											},
										}}
									/>
								:	"boom"
							);
						}}
					</Modal>
					<Modal
						target={<Action iconEnabled={ProductionIcon} />}
						outside={false}
						textTitle={<Tx label={"Blueprint production (modal)"} />}
						css={{
							modal: ["w-2/3"],
						}}
					>
						{() => {
							const [page, setPage] = useState(0);
							const [size, setSize] = useState(15);

							const data = useQuery({
								queryKey: ["Blueprint_Production", id, { page, size }],
								async queryFn() {
									return kysely.transaction().execute(async (tx) => {
										return withListCount({
											select: tx
												.selectFrom("Blueprint_Production as bp")
												.innerJoin("Blueprint as bl", "bl.id", "bp.blueprintId")
												.innerJoin("Resource as r", "r.id", "bp.resourceId")
												.select([
													"bp.id",
													"r.name",
													"bp.amount",
													"bp.blueprintId",
													"bp.limit",
													"bp.cycles",
													"bp.resourceId",
													(eb) =>
														eb
															.selectFrom(
																"Blueprint_Production_Requirement as bpr",
															)
															.innerJoin(
																"Resource as r",
																"r.id",
																"bpr.resourceId",
															)
															.select((eb) => {
																return sql<string>`json_group_array(json_object(
                                                                                    'id', ${eb.ref("bpr.id")},
                                                                                    'amount', ${eb.ref("bpr.amount")},
                                                                                    'passive', ${eb.ref("bpr.passive")},
                                                                                    'blueprintProductionId', ${eb.ref("bpr.blueprintProductionId")},
                                                                                    'resourceId', ${eb.ref("bpr.resourceId")},
                                                                                    'name', ${eb.ref("r.name")}
                                                                                ))`.as(
																	"requirements",
																);
															})
															.whereRef(
																"bpr.blueprintProductionId",
																"=",
																"bp.id",
															)
															.as("requirements"),
												])
												.where("bp.blueprintId", "=", id)
												.orderBy("r.name", "asc"),
											output: z.object({
												id: z.string().min(1),
												name: z.string().min(1),
												blueprintId: z.string().min(1),
												resourceId: z.string().min(1),
												amount: z.number().nonnegative(),
												limit: z.number().nonnegative(),
												cycles: z.number().nonnegative(),
												requirements: withJsonArraySchema(
													BlueprintProductionRequirementSchema.entity.merge(
														z.object({
															name: z.string().min(1),
														}),
													),
												),
											}),
											cursor: {
												page,
												size,
											},
										});
									});
								},
							});

							return (
								data.isLoading ? <LoadingOverlay />
								: data.isSuccess ?
									<BlueprintProductionTable
										blueprintId={id}
										table={{
											data: data.data.data,
										}}
										cursor={{
											count: data.data.count,
											cursor: {
												page,
												size,
											},
											textTotal: (
												<Tx label={"Number of production items (label)"} />
											),
											onPage(page) {
												setPage(page);
											},
											onSize(size) {
												setSize(size);
											},
										}}
									/>
								:	"boom"
							);
						}}
					</Modal>
					<Modal
						target={<Action iconEnabled={EditIcon} />}
						outside={false}
						textTitle={<Tx label={"Edit blueprint (modal)"} />}
						css={{
							modal: ["w-1/3"],
						}}
					>
						{({ close }) => {
							const invalidator = useInvalidator([["Editor"]]);

							return (
								<BlueprintForm
									defaultValues={data}
									mutation={useMutation({
										async mutationFn(values) {
											return toast.promise(
												kysely.transaction().execute((tx) => {
													return tx
														.updateTable("Blueprint")
														.set(values)
														.where("id", "=", data.id)
														.execute();
												}),
												withToastPromiseTx("Update blueprint"),
											);
										},
										async onSuccess() {
											await invalidator();
											close();
										},
									})}
								/>
							);
						}}
					</Modal>
				</div>
			</div>
			<Handle
				type={"source"}
				position={Position.Right}
				isConnectable={isConnectable}
				className={"w-4 h-4"}
			/>
		</div>
	);
};
