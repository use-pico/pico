import { EventBus } from "@use-pico/common";

export namespace GameEventBus {
	export interface OnCamera {
		x: number;
		z: number;
		bottom: number;
		top: number;
		right: number;
		left: number;
		zoom: number;
	}

	export interface Event {
		/**
		 * Fired when a camera changes.
		 *
		 * In general, this would be the main signal of the game loop, like chunk generation and so on.
		 */
		onCamera: OnCamera;
	}
}

export type GameEventBus = EventBus<GameEventBus.Event>;

export const createGameEventBus = (): GameEventBus => {
	return EventBus<GameEventBus.Event>();
};
