import type { SelectQueryBuilder } from "kysely";
import type { InventoryItemQuerySchema } from "~/app/inventory/db/InventoryItemQuerySchema";

export namespace withInventoryItemQueryBuilder {
	export interface Props {
		select: SelectQueryBuilder<any, any, any>;
		where?: InventoryItemQuerySchema.Type["filter"];
	}

	export type Callback = (props: Props) => SelectQueryBuilder<any, any, any>;
}

/**
 * Standalone query builder that applies all filters from InventoryItemQuerySchema
 * Can be used by both list and count queries to ensure consistency
 */
export const withInventoryItemQueryBuilder: withInventoryItemQueryBuilder.Callback =
	({ select, where }) => {
		let query = select;

		// Apply base filters
		if (where?.id) {
			query = query.where("id", "=", where.id);
		}

		if (where?.idIn && where.idIn.length > 0) {
			query = query.where("id", "in", where.idIn);
		}

		if (where?.fulltext) {
			query = query.where((eb) =>
				eb.or([
					eb("name", "like", `%${where.fulltext}%`),
					eb("description", "like", `%${where.fulltext}%`),
				]),
			);
		}

		// Apply custom filters
		if (where?.name) {
			query = query.where("name", "like", `%${where.name}%`);
		}

		if (where?.description) {
			query = query.where(
				"description",
				"like",
				`%${where.description}%`,
			);
		}

		if (where?.amountLte !== null && where?.amountLte !== undefined) {
			query = query.where("amount", "<=", where.amountLte);
		}

		if (where?.amountGte !== null && where?.amountGte !== undefined) {
			query = query.where("amount", ">=", where.amountGte);
		}

		return query;
	};

/**
 * Extended query builder that also handles sorting
 */
export const withInventoryItemQueryBuilderWithSort = (
	props: withInventoryItemQueryBuilder.Props & {
		sort?: Array<{
			value: string;
			sort?: "asc" | "desc" | null;
		}> | null;
	},
) => {
	let query = withInventoryItemQueryBuilder(props);

	// Apply sorting
	for (const sortItem of props.sort ?? []) {
		if (sortItem.sort) {
			switch (sortItem.value) {
				case "name":
					query = query.orderBy("name", sortItem.sort);
					break;
				case "amount":
					query = query.orderBy("amount", sortItem.sort);
					break;
			}
		}
	}

	return query;
};
