import { More, PopupMultiSelect, Tx, withListCount } from "@use-pico/client";
import { tvc } from "@use-pico/common";
import type { FC } from "react";
import { kysely } from "~/app/derivean/db/kysely";
import { RegionIcon } from "~/app/derivean/icon/RegionIcon";
import { RegionTable } from "~/app/derivean/root/RegionTable";
import { RegionSchema } from "~/app/derivean/schema/RegionSchema";

export namespace RegionPopupMultiSelect {
	export interface Props extends PopupMultiSelect.PropsEx<RegionTable.Data> {
		//
	}
}

export const RegionPopupMultiSelect: FC<RegionPopupMultiSelect.Props> = (
	props,
) => {
	return (
		<PopupMultiSelect<RegionTable.Data>
			icon={RegionIcon}
			table={RegionTable}
			textTitle={<Tx label={"Select regions (title)"} />}
			render={({ entities }) => {
				return (
					<More
						items={entities}
						css={{ base: ["flex", "flex-row", "gap-2"] }}
						render={({ entity }) => (
							<div
								className={tvc([
									"p-2",
									"border",
									"border-blue-300",
									"bg-blue-50",
									"rounded-sm",
								])}
							>
								{entity.name}
							</div>
						)}
					/>
				);
			}}
			queryKey={"Region"}
			query={async ({ filter, cursor }) => {
				return kysely.transaction().execute(async (tx) => {
					return withListCount({
						select: tx.selectFrom("Region as r").selectAll(),
						output: RegionSchema.entity,
						query({ select, where }) {
							let $select = select;

							if (where?.id) {
								$select = $select.where("r.id", "=", where.id);
							}

							if (where?.idIn) {
								$select = $select.where("r.id", "in", where.idIn);
							}

							if (where?.fulltext) {
								const fulltext = `%${where.fulltext}%`.toLowerCase();

								$select = $select.where((qb) => {
									return qb.or([
										qb("r.id", "like", fulltext),
										qb("r.name", "like", fulltext),
									]);
								});
							}

							return $select;
						},
						filter,
						cursor,
					});
				});
			}}
			{...props}
		/>
	);
};
