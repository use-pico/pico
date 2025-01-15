import { useMutation } from "@tanstack/react-query";
import { useNavigate, useParams } from "@tanstack/react-router";
import {
    Action,
    EditIcon,
    Icon,
    Modal,
    toast,
    useInvalidator,
    withToastPromiseTx,
} from "@use-pico/client";
import type { IdentitySchema } from "@use-pico/common";
import { Handle, NodeProps, Position, type Node } from "@xyflow/react";
import type { FC } from "react";
import { kysely } from "~/app/derivean/db/kysely";
import { BlueprintIcon } from "~/app/derivean/icon/BlueprintIcon";
import { ResourceIcon } from "~/app/derivean/icon/ResourceIcon";
import { BlueprintForm } from "~/app/derivean/root/BlueprintForm";

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
			className={"min-w-[10rem] nodrag"}
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
						outside={false}
						css={{
							modal: ["w-1/3"],
						}}
					>
						{({ close }) => (
							<>
								<div>dfgdfg</div>
							</>
						)}
					</Modal>
					<Modal
						target={<Action iconEnabled={EditIcon} />}
						outside={false}
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
