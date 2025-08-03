import type { ComponentProps, ComponentType } from "react";

export namespace slot {
	/** Props allowed from the caller = all component props minus the injected ones. */
	export type UserPropsOf<
		C extends ComponentType<any>,
		Injected extends object,
	> = Omit<ComponentProps<C>, keyof Injected>;

	/** Slot carrying a component and only the user-supplied (non-injected) props. */
	export type Slot<
		C extends ComponentType<any>,
		Injected extends object = {},
	> = {
		Component: C;
		/** Caller can pass anything except the injected keys. */
		props: Partial<UserPropsOf<C, Injected>>;
	};
}

/** Helper to get perfect inference at call site. */
export const slot = <
	C extends ComponentType<any>,
	Injected extends object = {},
>(
	Component: C,
	props: slot.UserPropsOf<C, Injected>,
): slot.Slot<C, Injected> => ({
	Component,
	props,
});
