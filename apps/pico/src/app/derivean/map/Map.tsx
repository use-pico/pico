import { useQuery } from "@tanstack/react-query";
import { tvc } from "@use-pico/common";
import { FC, useEffect, useRef, useState } from "react";
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

	const mapRef = useRef<HTMLDivElement>(null);
	const containerRef = useRef<HTMLDivElement>(null);

	const [scale, setScale] = useState(1);
	const [position, setPosition] = useState({ x: 0, y: 0 });
	const isDragging = useRef(false);
	const initial = useRef({ x: 0, y: 0 });

	const minScale = 0.05;
	const maxScale = 1.5;

	useEffect(() => {
		if (mapRef.current && containerRef.current) {
			mapRef.current.scrollIntoView({
				behavior: "instant",
				block: "center",
				inline: "center",
			});
		}
	}, []);

	const onMouseDown = (e: React.MouseEvent) => {
		isDragging.current = true;
		initial.current = { x: e.clientX - position.x, y: e.clientY - position.y };
	};

	const onMouseMove = (e: React.MouseEvent) => {
		if (!isDragging.current || !mapRef.current || !containerRef.current) {
			return;
		}
		e.preventDefault();

		let newX = e.clientX - initial.current.x;
		let newY = e.clientY - initial.current.y;

		const scaledSize = size * scale;
		const maxOffsetX = Math.max(0, (scaledSize - window.innerWidth) / 2);
		const maxOffsetY = Math.max(0, (scaledSize - window.innerHeight) / 2);

		newX = Math.max(-maxOffsetX, Math.min(maxOffsetX, newX));
		newY = Math.max(-maxOffsetY, Math.min(maxOffsetY, newY));

		setPosition({ x: newX, y: newY });
	};

	const onMouseUp = () => {
		isDragging.current = false;
	};

	const onWheel = (e: React.WheelEvent) => {
		if (!mapRef.current) {
			return;
		}

		const rect = mapRef.current.getBoundingClientRect();
		const mouseX = e.clientX - rect.left;
		const mouseY = e.clientY - rect.top;

		const newScale = Math.min(
			maxScale,
			Math.max(minScale, scale + e.deltaY * -0.001),
		);

		const scaleFactor = newScale / scale;
		const newX = position.x - (mouseX - position.x) * (scaleFactor - 1);
		const newY = position.y - (mouseY - position.y) * (scaleFactor - 1);

		const scaledSize = size * newScale;
		const maxOffsetX = Math.max(0, (scaledSize - window.innerWidth) / 2);
		const maxOffsetY = Math.max(0, (scaledSize - window.innerHeight) / 2);

		setPosition({
			x: Math.max(-maxOffsetX, Math.min(maxOffsetX, newX)),
			y: Math.max(-maxOffsetY, Math.min(maxOffsetY, newY)),
		});

		setScale(newScale);
	};

	const [landIds, setLandIds] = useState<string[]>([]);

	const updateVisibleLands = () => {
		if (!containerRef.current || !mapRef.current) {
			return;
		}

		const container = containerRef.current.getBoundingClientRect();
		const map = mapRef.current.getBoundingClientRect();

		const scaleFactor = scale;

		const viewportLeft = (container.left - map.left) / scaleFactor;
		const viewportTop = (container.top - map.top) / scaleFactor;
		const viewportRight = viewportLeft + container.width / scaleFactor;
		const viewportBottom = viewportTop + container.height / scaleFactor;

		const landsInView = land.filter((land) => {
			const x = (land.position % Game.world.lands) * Game.land.size;
			const y = Math.floor(land.position / Game.world.lands) * Game.land.size;

			return (
				x + Game.land.size >= viewportLeft &&
				x <= viewportRight &&
				y + Game.land.size >= viewportTop &&
				y <= viewportBottom
			);
		});

		setLandIds(landsInView.map((l) => l.id));
	};

	useEffect(() => {
		updateVisibleLands();
	}, [land, position.x, position.y, scale, updateVisibleLands]);

	const plots = useQuery({
		queryKey: ["map", mapId, "plots", { landIds }],
		async queryFn() {
			console.log("Lands", landIds);
			return "nope";
		},
		enabled: landIds.length > 0,
	});

	return (
		<div
			ref={containerRef}
			className={tvc("w-screen", "h-screen", "overflow-hidden", "relative")}
			onMouseMove={onMouseMove}
			onMouseUp={onMouseUp}
			onMouseLeave={onMouseUp}
			onWheel={onWheel}
		>
			<div
				ref={mapRef}
				className={"absolute bg-amber-100 cursor-grab active:cursor-grabbing"}
				style={{
					width: size,
					height: size,
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
					transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
					transformOrigin: "center",
				}}
				onMouseDown={onMouseDown}
			>
				<div className={tvc(["grid", "grid-cols-24"])}>
					{land.map((land) => {
						return (
							<div
								key={`land-${land.id}`}
								className={tvc([
									"border-2",
									"border-purple-600",
									landIds.includes(land.id) ?
										["bg-green-500"]
									:	["bg-purple-500"],
								])}
								style={{
									width: Game.land.size,
									height: Game.land.size,
								}}
							/>
						);
					})}
				</div>
			</div>
		</div>
	);
};
