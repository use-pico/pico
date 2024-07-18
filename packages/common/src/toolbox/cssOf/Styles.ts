import type { ClassNameValue } from "tailwind-merge";

export type Styles<T extends string> = Partial<Record<T, ClassNameValue>>;
