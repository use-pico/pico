import { useThree } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import { Vector3, type Camera } from "three";

export namespace useCamera {
	export interface Props<TCamera extends Camera> {
		callback(camera: TCamera): void;
		delay?: number;
		idle?: number;
	}
}

export const useCamera = <TCamera extends Camera = Camera>({
	callback,
	delay = 125,
	idle = 150,
}: useCamera.Props<TCamera>) => {
	const camera = useThree(({ camera }) => camera);

	const lastRef = useRef(new Vector3().copy(camera.position));
	const idleTimeoutRef = useRef<NodeJS.Timeout>();
	const delayIntervalRef = useRef<NodeJS.Timeout>();

	useEffect(() => {
		delayIntervalRef.current = setInterval(() => {
			if (!camera.position.equals(lastRef.current)) {
				lastRef.current.copy(camera.position);
				clearTimeout(idleTimeoutRef.current);
				idleTimeoutRef.current = setTimeout(() => {
					callback(camera as unknown as TCamera);
				}, idle);
			}
		}, delay);

		return () => {
			clearInterval(delayIntervalRef.current);
			clearTimeout(idleTimeoutRef.current);
		};
	}, [camera, callback, idle, delay]);
};
