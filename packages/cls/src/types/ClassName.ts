import type { ClassNameValue } from "tailwind-merge";

/**
 * Just forward class name type to prevent direct dependency on providing package.
 * This type represents any valid class name value that can be passed to the system.
 */
export type ClassName = ClassNameValue;
