import type { Render } from "./Render";

export interface Toast {
	id: string;
	durationMs?: number;
	render: Render.Fn;
}
