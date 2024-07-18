import { twMerge, type ClassNameValue } from "tailwind-merge";

/**
 * This method ensures all classes are merged with tailwind (or whatever framework) classes.
 *
 * It also provides some clever functions as it runs on top of `classnames` package.
 *
 * @group utils
 */
export const cssOf = (...args: ClassNameValue[]) => twMerge(...args);
