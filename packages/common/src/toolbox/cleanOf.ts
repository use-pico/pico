import cleaner, {type ICleanerOptions} from "fast-clean";

/**
 * Takes an object and remove all **undefined** properties, preserving nulls.
 */
export const cleanOf = <T extends object>(obj: T | undefined | null, options?: ICleanerOptions): T | undefined | null => {
	if (!obj) {
		return obj;
	}
	return cleaner.clean(obj, {
		nullCleaner:        false,
		emptyArraysCleaner: false,
		...options,
	});
};
