import { useEffect } from "react";

export namespace useDocumentVisibility {
	export interface Props {
		onVisible(): void;
		onHidden(): void;
	}
}

export const useDocumentVisibility = ({
	onVisible,
	onHidden,
}: useDocumentVisibility.Props) => {
	useEffect(() => {
		const onVisibilityState = () => {
			if (document.visibilityState !== "visible") {
				onHidden();
			} else {
				onVisible();
			}
		};

		document.addEventListener("visibilitychange", onVisibilityState);

		return () =>
			document.removeEventListener("visibilitychange", onVisibilityState);
	}, [
		onVisible,
		onHidden,
	]);
};
