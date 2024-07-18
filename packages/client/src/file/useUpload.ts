import { linkTo, type FileSchema, type IHrefProps } from "@use-pico/common";
import axios from "axios";
import { useRef } from "react";
import { v4 } from "uuid";
import { useChunk } from "../hook/useChunk";
import type { useLoop } from "../hook/useLoop";

const defaultChunkSize = 1048576 * 4;

export namespace useUpload {
	export interface Props extends Pick<useChunk.Props, "onStart" | "onError"> {
		chunkHref?: IHrefProps;
		commitHref?: IHrefProps;
		file: File;
		path: string;
		replace?: boolean;

		onFinish?(
			props: useLoop.onFinish.Props & {
				file: FileSchema.Type;
			},
		): Promise<void>;
	}
}

export const useUpload = ({
	file,
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
		onStart,
		onFinish: async (props) => {
			return axios
				.post<
					unknown,
					{
						data: FileSchema.Type;
					}
				>(
					linkTo({
						...commitHref,
						query: { chunkId: uuid.current },
					}),
					{
						name: file.name,
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
						file: data,
					}),
				);
		},
		onError,
	});
};
