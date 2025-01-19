import { useNavigate, useParams } from "@tanstack/react-router";
import {
    Action,
    DeleteControl,
    EditIcon,
    LinkTo,
    Modal,
    TrashIcon,
    Tx,
    useInvalidator,
} from "@use-pico/client";
import { type IdentitySchema } from "@use-pico/common";
import { Handle, NodeProps, Position, type Node } from "@xyflow/react";
import { type FC } from "react";
import { kysely } from "~/app/derivean/db/kysely";
import { BlueprintIcon } from "~/app/derivean/icon/BlueprintIcon";
import { ProductionIcon } from "~/app/derivean/icon/ProductionIcon";
import { ResourceIcon } from "~/app/derivean/icon/ResourceIcon";

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
			className={"min-w-[14rem]"}
			onClick={() => {
				navigate({
					to: "/$locale/apps/derivean/root/editor",
					params: { locale },
					search: { zoomTo: id },
				});
			}}
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
				<div
					className={"flex flex-row items-center gap-2"}
					onClick={(e) => e.stopPropagation()}
					onDoubleClick={(e) => e.stopPropagation()}
					onMouseDown={(e) => e.stopPropagation()}
				>
					<LinkTo
						icon={BlueprintIcon}
						to={"/$locale/apps/derivean/root/blueprint/$id/view"}
						params={{ locale, id }}
					>
						{data.name}
					</LinkTo>
				</div>
				<div
					className={
						"flex flex-row items-center justify-between gap-2 border bg-slate-50 border-slate-200 rounded w-full p-1"
					}
					onClick={(e) => e.stopPropagation()}
					onDoubleClick={(e) => e.stopPropagation()}
					onMouseDown={(e) => e.stopPropagation()}
				>
					<div className={"flex flex-row gap-2"}>
						<LinkTo
							icon={ResourceIcon}
							to={"/$locale/apps/derivean/root/blueprint/$id/requirements"}
							params={{ locale, id }}
						/>
						<LinkTo
							icon={ProductionIcon}
							to={"/$locale/apps/derivean/root/blueprint/$id/production"}
							params={{ locale, id }}
						/>
						<LinkTo
							icon={EditIcon}
							to={"/$locale/apps/derivean/root/blueprint/$id/edit"}
							params={{ locale, id }}
						/>
					</div>
					<div>
						<Modal
							target={
								<Action
									iconEnabled={TrashIcon}
									css={{ base: ["text-red-500"] }}
								/>
							}
							outside={true}
							textTitle={<Tx label={"Delete blueprint (modal)"} />}
							css={{
								modal: ["w-1/3"],
							}}
						>
							{() => {
								const invalidator = useInvalidator([["Editor"]]);

								return (
									<DeleteControl
										callback={async () => {
											return kysely.transaction().execute(async (tx) => {
												return tx
													.deleteFrom("Blueprint")
													.where("id", "=", data.id)
													.execute();
											});
										}}
										textContent={<Tx label={"Delete blueprint (content)"} />}
										textToast={"Delete blueprint"}
										invalidator={invalidator}
									/>
								);
							}}
						</Modal>
					</div>
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
