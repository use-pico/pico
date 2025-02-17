import { FC, useMemo } from "react";
import { BufferGeometry, Float32BufferAttribute } from "three";

export namespace Grid {
	export interface Props {
		size?: number;
		divisions?: number;
		color?: number;
		opacity?: number;
		dashSize?: number;
		gapSize?: number;
		position?: [number, number, number];
	}
}

export const Grid: FC<Grid.Props> = ({
	size = 10,
	divisions = 10,
	color = 0xffffff,
	opacity = 0.1,
	dashSize = 0.2,
	gapSize = 0.2,
	position = [0, 0, 0],
}) => {
	const geometry = useMemo(() => {
		const step = size / divisions;
		const halfSize = size / 2;
		const vertices = [];

		for (let i = -halfSize; i <= halfSize; i += step) {
			vertices.push(-halfSize, 0, i, halfSize, 0, i);
			vertices.push(i, 0, -halfSize, i, 0, halfSize);
		}

		const gridGeometry = new BufferGeometry();
		gridGeometry.setAttribute(
			"position",
			new Float32BufferAttribute(vertices, 3),
		);

		return gridGeometry;
	}, [size, divisions]);

	return (
		<lineSegments
			position={position}
			args={[geometry]}
		>
			<lineDashedMaterial
				color={color}
				transparent
				opacity={opacity}
				dashSize={dashSize}
				gapSize={gapSize}
			/>
		</lineSegments>
	);
};
