import { linkTo } from "@use-pico/common";
import axios from "axios";
import { useRef } from "react";
import { v4 } from "uuid";
import { useChunk } from "../loop/useChunk";
import type { useLoop } from "../loop/useLoop";

const defaultChunkSize = 1048576 * 4;

export namespace useUpload {
	export namespace File {
		export interface Type {
			id: string;
			name: string;
			path: string;
			mime: string;
			size: number;
		}
	}

	export interface Props extends Pick<useChunk.Props, "onError"> {
		/**
		 * Where to upload chunk of the file.
		 *
		 * Untyped, it's up to you to ensure a link is valid.
		 *
		 * Base url is cleared up, so the link expects to be a full url.
		 *
		 * Upload is using default axios instance.
		 */
		chunkHref?: linkTo.Props;
		/**
		 * Where to commit the file.
		 *
		 * Upload calls this endpoint when all chunks are uploaded, so the file is ready.
		 *
		 * Untyped, it's up to you to ensure a link is valid.
		 */
		commitHref?: linkTo.Props;
		file: File;
		name?: string;
		path: string;
		replace?: boolean;

		onStart?(props: { file: File }): Promise<void>;

		onFinish?(
			props: useLoop.onFinish.Props & {
				file: File;
				data: File.Type;
			},
		): Promise<void>;
	}

	export type onStart = Props["onStart"];
	export type onFinish = Props["onFinish"];
}

export const useUpload = ({
	file,
	name,
	path,
	chunkHref = { href: "/api/file/chunk/{chunkId}/upload" },
	commitHref = { href: "/api/file/chunk/{chunkId}/commit" },
	onStart,
	onFinish,
	onError,
	replace = true,
}: useUpload.Props) => {
	const uuid = useRef(v4());
	return useChunk({
		chunk: defaultChunkSize,
		throttle: 0,
		size: file.size,
		async onTick({ start, end }) {
			return axios.post(
				linkTo({
					...chunkHref,
					query: { chunkId: uuid.current },
				}),
				file.slice(start, end),
				{
					headers: {
						"Content-Type": "application/octet-stream",
					},
					baseURL: "",
				},
			);
		},
		async onStart() {
			return onStart?.({ file });
		},
		async onFinish(props) {
			return axios
				.post<
					unknown,
					{
						data: useUpload.File.Type;
					}
				>(
					linkTo({
						...commitHref,
						query: { chunkId: uuid.current },
					}),
					{
						name: name || file.name,
						path,
						mime: file.type,
						chunkId: uuid.current,
						replace,
					},
					{
						baseURL: "",
					},
				)
				.then(({ data }) =>
					onFinish?.({
						...props,
						file,
						data,
					}),
				);
		},
		onError,
	});
};
