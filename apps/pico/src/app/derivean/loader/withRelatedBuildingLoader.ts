import type { QueryClient } from "@tanstack/react-query";
import { sql } from "kysely";
import { kysely } from "~/app/derivean/db/kysely";

export namespace withRelatedBuildingLoader {
	export interface Props {
		queryClient: QueryClient;
		buildingId: string;
		mapId: string;
	}
}

export const withRelatedBuildingLoader = async ({
	buildingId,
	mapId,
	queryClient,
}: withRelatedBuildingLoader.Props) => {
	return queryClient.ensureQueryData({
		queryKey: ["GameMap", mapId, "building", buildingId, "related"],
		async queryFn() {
			return kysely.transaction().execute(async (tx) => {
				return (
					await sql`
                WITH RECURSIVE ConnectedWaypoints(waypointId, path, depth) AS (
                    -- Step 1: Start with waypoints directly linked to the given building
                    SELECT bw.waypointId, CAST(bw.waypointId AS TEXT), 1
                    FROM Building_Waypoint AS bw
                    WHERE bw.buildingId = ${buildingId}
                
                    UNION ALL
                
                    -- Step 2: Traverse waypoints through routes in both directions (single recursion step)
                    SELECT r.toId, path || '->' || r.toId, depth + 1
                    FROM Route AS r
                    INNER JOIN ConnectedWaypoints AS cw ON cw.waypointId = r.fromId
                    WHERE INSTR(path, r.toId) = 0 -- Prevent cycles
                    AND depth < 50 -- Prevent excessive recursion
                
                    UNION ALL
                
                    -- Step 3: Traverse in the reverse direction (toId -> fromId)
                    SELECT r.fromId, path || '->' || r.fromId, depth + 1
                    FROM Route AS r
                    INNER JOIN ConnectedWaypoints AS cw ON cw.waypointId = r.toId
                    WHERE INSTR(path, r.fromId) = 0 -- Prevent cycles
                    AND depth < 50 -- Prevent excessive recursion
                )
                
                -- Step 4: Retrieve all connected buildings linked to waypoints
                SELECT DISTINCT b.id AS buildingId
                FROM ConnectedWaypoints AS cw
                INNER JOIN Building_Waypoint AS bw ON bw.waypointId = cw.waypointId
                INNER JOIN Building AS b ON b.id = bw.buildingId
                INNER JOIN Land AS l ON l.id = b.landId
                WHERE b.id != ${buildingId} -- Exclude original building
                AND l.mapId = ${mapId}; -- Ensure buildings are from the same map
                        `.execute(tx)
				).rows as { buildingId: string }[];
			});
		},
	});
};
