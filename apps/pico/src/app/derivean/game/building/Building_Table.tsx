import { useMutation } from "@tanstack/react-query";
import { useParams } from "@tanstack/react-router";
import {
    Badge,
    Button,
    Table,
    Tx,
    useTable,
    withColumn,
} from "@use-pico/client";
import type { IdentitySchema } from "@use-pico/common";
import type { FC } from "react";
import { ResourceIcon } from "~/app/derivean/icon/ResourceIcon";

export namespace Building_Table {
	export interface Data extends IdentitySchema.Type {
		name: string;
	}
}

const column = withColumn<Building_Table.Data>();

const columns = [
	column({
		name: "name",
		header() {
			return <Tx label={"Building name (label)"} />;
		},
		render({ data, value }) {
			const { locale } = useParams({ from: "/$locale" });
			// const resourceCount = useCountQuery({
			// 	source: BuildingResourceSource,
			// 	filter: {
			// 		buildingId: data.id,
			// 	},
			// });
			// const queueCount = useCountQuery({
			// 	source: BuildingProductionQueueSource,
			// 	filter: {
			// 		buildingId: data.id,
			// 	},
			// });
			const resourceCount = { data: undefined } as any;
			const queueCount = { data: undefined } as any;
			const mutation = useMutation({
				async mutationFn({ buildingId }: { buildingId: string }) {
					return "nope";
				},
			});

			return (
				<div className={"flex flex-row items-center gap-2"}>
					<div>
						<Badge
							css={{
								base:
									queueCount.data?.filter ?
										["bg-emerald-200", "border-emerald-400"]
									:	["bg-amber-200", "border-amber-400"],
							}}
						>
							{queueCount.data?.filter || 0}
						</Badge>
					</div>
					<Button
						iconEnabled={ResourceIcon}
						iconDisabled={ResourceIcon}
						disabled={!resourceCount.data?.filter}
						loading={mutation.isPending}
						onClick={() => {
							mutation.mutate({
								buildingId: data.id,
							});
						}}
						variant={{ variant: "subtle" }}
					/>
					<div>{value}</div>
				</div>
			);
		},
	}),
];

export namespace Building_Table {
	export interface Props extends Table.PropsEx<Data> {
		//
	}
}

export const Building_Table: FC<Building_Table.Props> = ({
	table,
	...props
}) => {
	return (
		<Table
			table={useTable({
				...table,
				columns,
			})}
			{...props}
		/>
	);
};
