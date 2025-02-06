import type { FC } from "react";

export namespace Chunks {
	export interface Config {
		chunkSize: number;
		plotSize: number;
	}

	export interface Props {
		config: Config;
	}
}

export const Chunks: FC<Chunks.Props> = ({ config }) => {
	return <></>;
};
