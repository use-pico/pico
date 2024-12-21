import type { BlueprintFilterSchema } from "~/app/derivean/blueprint/schema/BlueprintFilterSchema";
import type { BlueprintSchema } from "~/app/derivean/blueprint/schema/BlueprintSchema";

export namespace withBlueprintFilter {
	export interface Props {
		where?: BlueprintFilterSchema.Type;
		filter?: BlueprintFilterSchema.Type;
	}
}

export const withBlueprintFilter = ({
	where,
	filter,
}: withBlueprintFilter.Props) => {
	return (blueprint: BlueprintSchema.Type) => {
		if (where?.fulltext) {
			return (
				blueprint.name.toLowerCase().includes(where.fulltext.toLowerCase()) ||
				blueprint.kind.toLowerCase().includes(where.fulltext.toLowerCase()) ||
				blueprint.id.toLocaleLowerCase().includes(where.fulltext.toLowerCase())
			);
		} else if (filter?.fulltext) {
			return (
				blueprint.name.toLowerCase().includes(filter.fulltext.toLowerCase()) ||
				blueprint.kind.toLowerCase().includes(filter.fulltext.toLowerCase()) ||
				blueprint.id.toLocaleLowerCase().includes(filter.fulltext.toLowerCase())
			);
		}
		return true;
	};
};
