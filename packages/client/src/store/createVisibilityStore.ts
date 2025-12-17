import { create, type StoreApi, type UseBoundStore } from "zustand";

export namespace createVisibilityStore {
	export interface Props {
		/**
		 * Visible state, may be delayed
		 */
		defaultVisible?: boolean;
		/**
		 * Current real visibility flag (instant)
		 */
		defaultIsVisibleState?: boolean;
		defaultTopProximity?: boolean;
		defaultBottomProximity?: boolean;
	}

	export interface Store {
		/**
		 * Visible state, may be delayed
		 */
		visible: boolean;
		/**
		 * Current real visibility flag (instant)
		 *
		 * This flag is not counted to "isVisible" prop
		 */
		isVisibleState: boolean;
		/**
		 * Top proximity flag
		 */
		topProximity: boolean;
		/**
		 * Bottom proximity flag
		 */
		bottomProximity: boolean;
		//
		setVisible(visible: boolean): void;
		setTopProximity(topProximity: boolean): void;
		setBottomProximity(bottomProximity: boolean): void;
		//
		/**
		 * Any visibility flag is true (except of isVisibleState)
		 */
		isVisible: boolean;
	}

	export type Hook = UseBoundStore<StoreApi<Store>>;
}

export const createVisibilityStore = ({
	defaultVisible = false,
	defaultIsVisibleState = defaultVisible,
	defaultTopProximity = false,
	defaultBottomProximity = false,
}: createVisibilityStore.Props): createVisibilityStore.Hook => {
	return create<createVisibilityStore.Store>((set) => ({
		visible: defaultVisible,
		isVisibleState: defaultIsVisibleState,
		topProximity: defaultTopProximity,
		bottomProximity: defaultBottomProximity,
		//
		setVisible(visible: boolean) {
			set((prev) => ({
				visible: visible,
				isVisible: visible || prev.topProximity || prev.bottomProximity,
			}));
		},
		setTopProximity(topProximity: boolean) {
			set((prev) => ({
				topProximity: topProximity,
				isVisible: prev.visible || topProximity || prev.bottomProximity,
			}));
		},
		setBottomProximity(bottomProximity: boolean) {
			set((prev) => ({
				bottomProximity: bottomProximity,
				isVisible: prev.visible || prev.topProximity || bottomProximity,
			}));
		},
		//
		isVisible:
			defaultVisible || defaultTopProximity || defaultBottomProximity,
	}));
};
