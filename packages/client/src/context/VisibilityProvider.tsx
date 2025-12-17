import type { FC, PropsWithChildren } from "react";
import { createVisibilityStore } from "../store/createVisibilityStore";
import { VisibilityContext } from "./VisibilityContext";

export namespace VisibilityProvider {
	export interface Props
		extends PropsWithChildren<createVisibilityStore.Props> {}
}

export const VisibilityProvider: FC<VisibilityProvider.Props> = ({
	children,
	...props
}) => {
	return (
		<VisibilityContext value={createVisibilityStore(props)}>
			{children}
		</VisibilityContext>
	);
};
