import type { Cls } from "@use-pico/cls";
import { create, type StoreApi, type UseBoundStore } from "zustand";
import type { Toast } from "./Toast";
import type { ToasterCls } from "./ToasterCls";

export namespace createToastStore {
	export interface Props {
		maxCount: number;
		durationMs: number;
	}

	export interface Store {
		maxCount: number;
		//
		durationMs: number;
		//
		toasts: Record<string, Toast>;
		//
		visible: string[];
		queue: string[];
		//
		/**
		 * Registers or updates a toast instance within the store.
		 * @param toast - Toast payload to persist by its `id`.
		 */
		toast(toast: Toast): void;
		//
		/**
		 * Moves a toast into the visible list or queues it if the visible limit is reached.
		 * @param id - Identifier of the toast to display.
		 */
		send(id: string): void;
		//
		/**
		 * Promotes the next queued toast into the visible list when space is available.
		 */
		pull(): void;
		/**
		 * Dismisses a toast by its identifier.
		 * @param id - Identifier of the toast to dismiss.
		 */
		dismiss(id: string): void;
		//
		/**
		 * Resolves the currently visible toast payloads.
		 * @returns Ordered collection of visible toast instances.
		 */
		getVisible(position: Cls.VariantOf<ToasterCls, "position">): Toast[];
		/**
		 * Resolves the currently queued toast payloads.
		 * @returns Ordered collection of queued toast instances.
		 */
		getQueue(): Toast[];
	}

	export type Hook = UseBoundStore<StoreApi<Store>>;
}

export const createToastStore = ({
	maxCount,
	durationMs,
}: createToastStore.Props): createToastStore.Hook => {
	return create<createToastStore.Store>((set, get) => ({
		maxCount,
		//
		durationMs,
		//
		toasts: {},
		//
		visible: [],
		queue: [],
		//
		toast(toast) {
			set((state) => {
				if (state.toasts[toast.id]) {
					return state;
				}

				return {
					toasts: {
						...state.toasts,
						[toast.id]: toast,
					},
				};
			});
		},
		//
		send(id) {
			set((state) => {
				if (state.visible.includes(id) || state.queue.includes(id)) {
					return state;
				}

				const toast = state.toasts[id];
				if (!toast) {
					return state;
				}

				if (state.visible.length < state.maxCount) {
					return {
						visible: [
							...state.visible,
							toast.id,
						],
					};
				}

				return {
					queue: [
						...state.queue,
						toast.id,
					],
				};
			});
		},
		//
		pull() {
			set((state) => {
				if (
					state.queue.length > 0 &&
					state.visible.length < state.maxCount
				) {
					return {
						visible: [
							...state.visible,
							// biome-ignore lint/style/noNonNullAssertion: We've check in the condition
							state.queue[0]!,
						],
						queue: state.queue.slice(1),
					};
				}

				return state;
			});
		},
		//
		dismiss(id) {
			set((state) => {
				const { [id]: _, ...toasts } = state.toasts;

				return {
					visible: state.visible.filter((t) => t !== id),
					queue: state.queue.filter((t) => t !== id),
					toasts,
				};
			});
		},
		//
		getVisible(position) {
			const current = get();

			return (
				(
					[
						"bottom-center",
						"bottom-left",
						"bottom-right",
					] as (typeof position)[]
				).includes(position)
					? current.visible.reverse()
					: current.visible
			)
				.map((id) => current.toasts[id])
				.filter((t) => t !== undefined);
		},
		//
		getQueue() {
			const current = get();

			return current.queue
				.map((id) => current.toasts[id])
				.filter((t) => t !== undefined);
		},
	}));
};
