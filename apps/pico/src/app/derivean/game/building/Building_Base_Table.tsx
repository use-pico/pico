import { useMutation, useQuery } from "@tanstack/react-query";
import { useParams } from "@tanstack/react-router";
import {
    Button,
    LinkTo,
    Table,
    Tx,
    useTable,
    withColumn,
} from "@use-pico/client";
import { toHumanNumber, tvc, type IdentitySchema } from "@use-pico/common";
import type { FC } from "react";
import { BuildingIcon } from "~/app/derivean/icon/BuildingIcon";

export namespace Building_Base_Table {
	export interface Data extends IdentitySchema.Type {
		name: string;
		cycles: number;
		// requirements: (ResourceRequirementSchema["~entity"] & {
		// 	name: string;
		// })[];
	}

	export interface Context {
		userId: string;
	}
}

const column = withColumn<
	Building_Base_Table.Data,
	Building_Base_Table.Context
>();

const columns = [
	column({
		name: "name",
		header() {
			return <Tx label={"Building name (label)"} />;
		},
		render({ data, value, context: { userId } }) {
			const { locale } = useParams({ from: "/$locale" });
			const mutation = useMutation({
				async mutationFn({ buildingBaseId }: { buildingBaseId: string }) {
					return buildingBaseId;
				},
			});
			const count = useQuery({
				queryKey: ["foo"],
				queryFn() {
					return { baseBuildingId: data.id, userId };
				},
			});
			// const { check } = inventoryCheck({
			// 	inventory,
			// 	requirements: data.requirements,
			// });

			const available = false;

			return (
				<div className={tvc(["w-full", "flex", "gap-2", "items-center"])}>
					<Button
						iconEnabled={BuildingIcon}
						iconDisabled={BuildingIcon}
						variant={{
							variant: !available || count.isLoading ? "subtle" : "primary",
						}}
						onClick={() => {
							mutation.mutate({
								buildingBaseId: data.id,
							});
						}}
						disabled={!available}
						loading={mutation.isPending || count.isLoading}
					/>
					<LinkTo
						to={"/$locale/apps/derivean/game/building/base/$id/view"}
						params={{ locale, id: data.id }}
					>
						{value}
					</LinkTo>
				</div>
			);
		},
		size: 16,
	}),
	column({
		name: "cycles",
		header() {
			return <Tx label={"Construction cycles (label)"} />;
		},
		render({ value }) {
			return toHumanNumber({ number: value });
		},
		size: 14,
	}),
	// column({
	// 	name: "requirements",
	// 	header() {
	// 		return <Tx label={"Required resources (label)"} />;
	// 	},
	// 	render({ value }) {
	// 		// const { missing } = inventoryCheck({ inventory, requirements: value });

	// 		return (
	// 			<RequirementsInline
	// 				textTitle={<Tx label={"Building requirements (title)"} />}
	// 				textEmpty={<Tx label={"No requirements (label)"} />}
	// 				requirements={value}
	// 				// diff={missing}
	// 				limit={5}
	// 			/>
	// 		);
	// 	},
	// 	size: 72,
	// }),
];

export namespace Building_Base_Table {
	export interface Props extends Table.PropsEx<Data, Context> {
		userId: string;
	}
}

export const Building_Base_Table: FC<Building_Base_Table.Props> = ({
	userId,
	table,
	...props
}) => {
	return (
		<Table
			table={useTable({
				...table,
				columns,
				context: {
					userId,
				},
			})}
			{...props}
		/>
	);
};
