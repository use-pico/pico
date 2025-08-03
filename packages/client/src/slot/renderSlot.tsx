import type { Key } from "react";
import type { slot } from "./Slot";

export const renderSlot = <
	C extends React.ComponentType<any>,
	Injected extends object,
>(
	{ Component, props }: slot.Slot<C, Injected>,
	injected: Injected,
	key?: Key,
	merge: (
		injected: Injected,
		user?: Partial<slot.UserPropsOf<C, Injected>>,
	) => any = (injected, user) => ({
		...injected,
		...(user as object),
	}),
) => {
	return (
		<Component
			key={key}
			{...merge(injected, props)}
		/>
	);
};
