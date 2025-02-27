import type { XZ } from "~/app/derivean/type/XZ";

export namespace fpScaleXZ {
	export interface Props {
		scale: number;
	}
}

export const fpScaleXZ = ({ scale }: fpScaleXZ.Props) => {
	return ([x, z]: XZ): XZ => {
		return [x * scale, z * scale] as const;
	};
};
