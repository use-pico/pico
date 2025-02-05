import { tvc } from "@use-pico/common";
import { FC, useEffect, useRef, useState } from "react";
import { TransformComponent, TransformWrapper } from "react-zoom-pan-pinch";
import { Game } from "~/app/derivean/Game";
import { Land } from "~/app/derivean/map/Land";

export namespace Map {
	export interface Land {
		id: string;
		regionId: string;
		position: number;
	}

	export interface Props {
		mapId: string;
		userId: string;
		cycle: number;
		land: Land[];
	}
}

export const Map: FC<Map.Props> = ({ mapId, land }) => {
	const { size } = Game.world;
	const landRefs = useRef<HTMLDivElement[]>([]);
	const [landIds, setLandIds] = useState(new Set<string>());

	useEffect(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				setLandIds((prev) => {
					const set = new Set<string>(prev);
					entries.forEach((entry) => {
						if (entry.isIntersecting) {
							set.add(entry.target.id);
						} else {
							set.delete(entry.target.id);
						}
					});
					return set;
				});
			},
			{ root: null, threshold: 0.0 },
		);

		landRefs.current.forEach((div) => {
			div && observer.observe(div);
		});

		return () => observer.disconnect();
	}, [landRefs]);

	return (
		<TransformWrapper
			centerOnInit
			minScale={0.1}
			limitToBounds
			disablePadding
		>
			<TransformComponent
				wrapperClass={tvc(["w-screen", "h-screen", "overflow-hidden"])}
			>
				<div
					className={tvc(["grid"])}
					style={{
						width: size,
						height: size,
						gridTemplateColumns: `repeat(${Game.world.lands}, minmax(0, 1fr))`,
					}}
				>
					{land.map((land) => (
						<Land
							key={`land-${land.id}`}
							ref={(ref) => ref && landRefs.current.push(ref)}
							mapId={mapId}
							land={land}
							visible={landIds.has(land.id)}
						/>
					))}
				</div>
			</TransformComponent>
		</TransformWrapper>
	);
};
