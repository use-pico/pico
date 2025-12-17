import type { PropsWithChildren } from "react";
import { createToastStore } from "./createToastStore";
import { ToastContext } from "./ToastContext";

export namespace ToastProvider {
	export interface Props extends PropsWithChildren<createToastStore.Props> {
		//
	}
}

export const ToastProvider = ({ children, ...props }: ToastProvider.Props) => {
	return (
		<ToastContext.Provider value={createToastStore(props)}>
			{children}
		</ToastContext.Provider>
	);
};
