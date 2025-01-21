import {
    getStraightPath,
    type ConnectionLineComponentProps,
} from "@xyflow/react";
import type { FC } from "react";

export namespace ConnectionLine {
	export interface Props extends ConnectionLineComponentProps {
		//
	}
}

export const ConnectionLine: FC<ConnectionLine.Props> = ({
	fromX,
	fromY,
	toX,
	toY,
	connectionLineStyle,
}) => {
	const [edgePath] = getStraightPath({
		sourceX: fromX,
		sourceY: fromY,
		targetX: toX,
		targetY: toY,
	});

	return (
		<g>
			<path
				style={connectionLineStyle}
				fill="none"
				d={edgePath}
			/>
		</g>
	);
};
