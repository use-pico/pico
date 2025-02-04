import { tvc } from "@use-pico/common";
import { FC } from "react";
import { TransformComponent, TransformWrapper } from "react-zoom-pan-pinch";
import { Game } from "~/app/derivean/Game";

export namespace Map {
	export interface Plot {
		id: string;
		position: number;
	}

	export interface Land {
		id: string;
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

	// const mapRef = useRef<HTMLDivElement>(null);
	// const containerRef = useRef<HTMLDivElement>(null);

	// const [landIds, setLandIds] = useState<string[]>([]);

	// const updateVisibleLands = () => {
	// 	if (!containerRef.current || !mapRef.current) {
	// 		return;
	// 	}

	// 	const container = containerRef.current.getBoundingClientRect();
	// 	const map = mapRef.current.getBoundingClientRect();

	// 	const scaleFactor = scale;

	// 	const viewportLeft = (container.left - map.left) / scaleFactor;
	// 	const viewportTop = (container.top - map.top) / scaleFactor;
	// 	const viewportRight = viewportLeft + container.width / scaleFactor;
	// 	const viewportBottom = viewportTop + container.height / scaleFactor;

	// 	const landsInView = land.filter((land) => {
	// 		const x = (land.position % Game.world.lands) * Game.land.size;
	// 		const y = Math.floor(land.position / Game.world.lands) * Game.land.size;

	// 		return (
	// 			x + Game.land.size >= viewportLeft &&
	// 			x <= viewportRight &&
	// 			y + Game.land.size >= viewportTop &&
	// 			y <= viewportBottom
	// 		);
	// 	});

	// 	setLandIds(landsInView.map((l) => l.id));
	// };

	// useEffect(() => {
	// 	updateVisibleLands();
	// }, [land, position.x, position.y, scale, updateVisibleLands]);

	// const plots = useQuery({
	// 	queryKey: ["map", mapId, "plots", { landIds }],
	// 	async queryFn() {
	// 		console.log("Lands", landIds);
	// 		return "nope";
	// 	},
	// 	enabled: landIds.length > 0,
	// });

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
					className={tvc(["grid", "grid-cols-24"])}
					style={{ width: size, height: size }}
				>
					{land.map((land) => {
						return (
							<div
								key={`land-${land.id}`}
								className={tvc([
									"border-2",
									"bg-purple-50",
									"border-purple-600",
									// landIds.includes(land.id) ?
									// 	["bg-green-500"]
									// :	["bg-purple-500"],
								])}
								style={{
									width: Game.land.size,
									height: Game.land.size,
								}}
							/>
						);
					})}
				</div>
			</TransformComponent>
		</TransformWrapper>
	);
};
