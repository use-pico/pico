import type { EntitySchema } from "@use-pico/common/schema";

export namespace usePatchCollection {
	export interface Collection<TItem extends EntitySchema.Type> {
		data: TItem[];
	}

	export namespace Patch {
		export type Fn<TCollection extends Collection<EntitySchema.Type>> = (
			patch: Partial<TCollection["data"][number]> & EntitySchema.Type,
		) => (prev: TCollection | undefined) => TCollection | undefined;
	}
}

export const usePatchCollection = <
	TCollection extends usePatchCollection.Collection<EntitySchema.Type>,
>(
	values: TCollection["data"][number],
): usePatchCollection.Patch.Fn<TCollection> => {
	return (patch) => (prev) => {
		if (!prev) {
			return prev;
		}

		return {
			...prev,
			data: prev.data.map((item) => {
				if (item.id === values.id) {
					return {
						...item,
						...patch,
					};
				}
				return item;
			}),
		};
	};
};
