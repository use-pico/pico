import { JustDropZone } from "../just-drop-zone/JustDropZone";
import { Reader } from "./Xlsx/Reader";

export namespace Xlsx {
	export interface Props<TLoad extends Record<string, Reader.Sheet<any>>>
		extends Omit<JustDropZone.Props, "children">,
			Reader.Props<TLoad> {
		//
	}
}

export const Xlsx = <TLoad extends Record<string, Reader.Sheet<any>>>({
	load,
	onSuccess = async () => null,
	children,
	...props
}: Xlsx.Props<TLoad>) => {
	return (
		<JustDropZone
			accept={{
				"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet":
					[
						".xlsx",
					],
				"application/x-excel": [
					".xlsx",
				],
				"application/vnd.ms-excel": [
					".xlsx",
				],
			}}
			{...props}
		>
			{(props) => (
				<Reader
					load={load}
					onSuccess={onSuccess}
					{...props}
				>
					{children}
				</Reader>
			)}
		</JustDropZone>
	);
};
