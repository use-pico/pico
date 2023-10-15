import cleaner, {type ICleanerOptions} from "fast-clean";

/**
 * Takes an object and remove all **undefined** properties, preserving nulls.
 */
export const cleanOf = <T>(obj: T, options?: ICleanerOptions): T => cleaner.clean(obj || {}, {
    nullCleaner:        false,
    emptyArraysCleaner: false,
    ...options,
});
