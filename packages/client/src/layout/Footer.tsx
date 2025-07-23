import type { FC, PropsWithChildren } from "react";

export namespace Footer {
	export interface Props extends PropsWithChildren {
		//
	}
}

export const Footer: FC<Footer.Props> = ({ children }) => {
	return (
		<div className={"text-center text-xs text-gray-500 mb-8"}>
			{children}
		</div>
	);
};
