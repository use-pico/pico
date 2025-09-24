export { contract } from "./builder/contract";
export { definition } from "./builder/definition";
export { cls } from "./cls";
export * from "./react";
export type { Check } from "./types/Check";
export type { ClassName } from "./types/ClassName";
export type { Cls } from "./types/Cls";
export type { Contract } from "./types/Contract";
export type { Definition } from "./types/Definition";
export type { Rule } from "./types/Rule";
export type { Slot } from "./types/Slot";
export type { Token } from "./types/Token";
export type { Utils } from "./types/Utils";
export type { Variant } from "./types/Variant";
export type { What } from "./types/What";
export { tvc } from "./utils/tvc";

/**
 * Just a true boolean.
 *
 * I don't like boolean hells, so this is a little compromise.
 *
 * You _can_ use this for rules, when you want override to keep it
 * explicit, purely optional for you.
 */
export const OVERRIDE = true;
