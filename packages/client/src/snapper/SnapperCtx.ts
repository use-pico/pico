import { createContext, type RefObject } from "react";

export type Orientation = "vertical" | "horizontal";

export interface Ctx {
	orientation: Orientation;
	containerRef: RefObject<HTMLDivElement | null>;
}

export const SnapperCtx = createContext<Ctx | null>(null);
