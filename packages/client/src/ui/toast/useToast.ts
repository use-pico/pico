import type { Toast } from "./Toast";
import { useToastContext } from "./useToastContext";

export const useToast = () => {
	const useToastStore = useToastContext();
	const $toast = useToastStore((store) => store.toast);
	const $send = useToastStore((store) => store.send);

	return (toast: Toast) => {
		$toast(toast);
		$send(toast.id);
	};
};
