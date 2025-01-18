import { useReactFlow } from "@xyflow/react";
import { useEffect, type FC } from "react";

export namespace ZoomToNode {
	export interface Props {
		nodeId?: string;
	}
}

export const ZoomToNode: FC<ZoomToNode.Props> = ({ nodeId }) => {
	const { fitView } = useReactFlow();

	useEffect(() => {
		nodeId &&
			setTimeout(() => {
				fitView({
					nodes: [{ id: nodeId }],
					duration: 750,
					minZoom: 1,
					maxZoom: 1,
				});
			}, 50);
	}, [nodeId]);

	return null;
};
