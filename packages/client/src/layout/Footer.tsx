import type { FC } from "react";

export namespace Footer {
	export type Props = {};
}

export const Footer: FC<Footer.Props> = () => {
	return (
		<div className={"text-center text-xs text-gray-500 mb-8"}>
			{import.meta.env.VITE_VERSION}
		</div>
	);
};
