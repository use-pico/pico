import { genId } from "@use-pico/common";
import { sql } from "kysely";
import type { WithTransaction } from "~/app/derivean/db/WithTransaction";

export namespace withBuildingRouteBuilding {
	export interface Props {
		tx: WithTransaction;
		userId: string;
		mapId: string;
	}
}

export const withBuildingRouteBuilding = async ({
	tx,
	userId,
	mapId,
}: withBuildingRouteBuilding.Props) => {
	const buildings = await tx.selectFrom("Building").select(["id"]).execute();

	await tx.deleteFrom("Building_Route_Building").execute();

	console.log(`Finding paths between [${buildings.length}] buildings`);

	const skip: string[] = [];
	const inserts: any[] = [];

	for await (const { id } of buildings) {
		if (skip.includes(id)) {
			console.log(`Skipping [${id}]`);
			continue;
		}

		console.log("skips", skip);

		const { rows: related } = (await sql`
            WITH RECURSIVE ConnectedWaypoints(waypointId, path, depth) AS (
                -- Step 1: Start with waypoints directly linked to the given building
                SELECT bw.waypointId, CAST(bw.waypointId AS TEXT), 1
                FROM Building_Waypoint AS bw
                WHERE bw.buildingId = ${id}
            
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
            WHERE b.id != ${id} -- Exclude original building
            AND l.mapId = ${mapId};
            `.execute(tx)) as { rows: { buildingId: string }[] };

		console.log(`-- Found [${related.length}] related paths`);

		skip.push(id);
		skip.push(...related.map(({ buildingId }) => buildingId));

		inserts.push(
			...related.map(({ buildingId }) => ({
				id: genId(),
				mapId,
				userId,
				buildingId: id,
				linkId: buildingId,
			})),
		);
		inserts.push(
			...related.map(({ buildingId }) => ({
				id: genId(),
				mapId,
				userId,
				buildingId,
				linkId: id,
			})),
		);
	}

	console.log("inserts", inserts);

	if (inserts.length > 0) {
		console.log(`-- Paths [${inserts.length}]`);

		await tx.insertInto("Building_Route_Building").values(inserts).execute();
	}

	console.log("Done");
};
