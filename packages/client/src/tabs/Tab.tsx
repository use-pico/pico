import { type FC, type PropsWithChildren, useContext } from "react";
import { TabCls } from "./TabCls";
import { TabsContext } from "./TabsContext";

export namespace Tab {
	export interface Props extends TabCls.Props<PropsWithChildren> {
		tab: string;
	}
}

export const Tab: FC<Tab.Props> = ({
	tab,
	token,
	variant,
	tva = TabCls,
	slot,
	children,
}) => {
	const useStore = useContext(TabsContext);
	const store = useStore();

	const { slots } = tva.create({
		token: token ?? (undefined as never),
		slot,
		variant: {
			active: tab === store.tab ? "true" : "false",
			...variant,
		},
	});

	return store.hidden.includes(tab) ? null : (
		<div
			className={slots.base}
			onClick={() => store.setCurrent(tab)}
		>
			{children}
		</div>
	);
};
