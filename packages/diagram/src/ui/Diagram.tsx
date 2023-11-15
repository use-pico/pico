"use client";

import {type FC}     from "react";
// @ts-expect-error
import Graph         from "react-graph-vis";
import {GraphSchema} from "../schema/GraphSchema";

export namespace Diagram {
    export interface Props {
        graph: GraphSchema.Type;
        border?: boolean;
        zoom?: boolean;

        onClick?(id: string): void;
    }
}

/**
 * Docs:
 * https://visjs.github.io/vis-network/docs/network
 */
export const Diagram: FC<Diagram.Props> = (
    {
        graph: {
                   nodes,
                   edges
               },
        border = true,
        zoom = true,
        onClick,
    }
) => {
    return <Graph
        style={border ? {
            border:    "1px solid #DDD",
            boxShadow: "4px 4px 6px #DDD",
        } : undefined}
        graph={{
            nodes: nodes.map(node => ({
                ...node,
            })),
            edges,
        }}
        events={{
            selectNode: (event: any) => {
                onClick?.(event.nodes[0]);
            },
        }}
        options={{
            edges:       {
                color:  "#333",
                shadow: {
                    enabled: true,
                },
                smooth: {
                    enabled: true,
                    type:    "diagonalCross",
                },
            },
            height:      "400px",
            interaction: {
                hover:       true,
                multiselect: true,
                zoomView:    zoom,
            },
            layout:      {
                hierarchical: {
                    blockShifting:        true,
                    direction:            "LR",
                    edgeMinimization:     true,
                    enabled:              true,
                    levelSeparation:      250,
                    nodeSpacing:          250,
                    parentCentralization: true,
                    sortMethod:           "directed",
                },
                randomSeed:   0,
            },
            nodes:       {
                fixed:           true,
                font:            {
                    size: 32,
                },
                margin:          {
                    top:    8,
                    bottom: 8,
                    left:   12,
                    right:  12,
                },
                shadow:          {
                    color:   "#BBB",
                    enabled: true,
                    size:    8,
                },
                shape:           "box",
                shapeProperties: {
                    borderRadius: 0,
                },
            },
            physics:     false,
        }}
    />;
};
