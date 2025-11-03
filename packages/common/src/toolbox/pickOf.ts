import type { DeepKeys } from "../type/DeepKeys";

export namespace pickOf {
	export interface Props<T extends object> {
		/**
		 * Source object to pick properties from
		 */
		object: T;
		/**
		 * Which properties to pick
		 */
		pick: DeepKeys<T>[];
	}
}

export const pickOf = <T extends object>({ object, pick }: pickOf.Props<T>) => {
	// @ts-expect-error
	const bind = pathOf(object);
	return pick.reduce(
		(acc, key) => {
			const value = bind.get(key);
			if (value !== undefined) {
				acc[key] = value;
			}
			return acc;
		},
		{} as Partial<Record<DeepKeys<T>, unknown>>,
	);
};
