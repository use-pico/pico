import type { ClassName } from "../ClassName";

/**
 * Defines the structure of slots in a component.
 * TSlotKeys represents the names of different slots (like 'base', 'icon', 'label', etc.)
 * Each slot maps to a class name value that will be applied to that specific part of the component.
 */
export type SlotDef<TSlotKeys extends string> = Record<TSlotKeys, ClassName>;
