import { PopupSelect, Tx, withListCount } from "@use-pico/client";
import { withJsonArraySchema } from "@use-pico/common";
import type { FC } from "react";
import { z } from "zod";
import { kysely } from "~/app/derivean/db/kysely";
import { BuildingBaseIcon } from "~/app/derivean/icon/BuildingBaseIcon";
import { Building_Base_Table } from "~/app/derivean/root/building/Building_Base_Table";
import { Building_Base_Resource_Requirement_Schema } from "~/app/derivean/schema/building/Building_Base_Resource_Requirement_Schema";

export namespace Building_Base_PopupSelect {
	export interface Props extends PopupSelect.PropsEx<Building_Base_Table.Data> {
		//
	}
}

export const Building_Base_PopupSelect: FC<Building_Base_PopupSelect.Props> = (
	props,
) => {
	return (
		<PopupSelect<Building_Base_Table.Data>
			icon={BuildingBaseIcon}
			textTitle={<Tx label={"Select building base (title)"} />}
			table={Building_Base_Table}
			render={({ entity }) => {
				return entity.name;
			}}
			queryKey={"Building_Base"}
			query={async ({ filter, cursor }) => {
				return kysely.transaction().execute(async (tx) => {
					return withListCount({
						select: tx
							.selectFrom("Building_Base as bb")
							.select(["bb.id", "bb.name", "bb.cycles"]),
						output: z.object({
							id: z.string().min(1),
							name: z.string().min(1),
							cycles: z.number(),
							requirements: withJsonArraySchema(
								Building_Base_Resource_Requirement_Schema.entity.merge(
									z.object({
										name: z.string().min(1),
									}),
								),
							),
						}),
						filter,
						cursor,
					});
				});
			}}
			{...props}
		/>
	);
};
