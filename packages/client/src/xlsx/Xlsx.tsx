import type z from "zod";
import { JustDropZone } from "../just-drop-zone/JustDropZone";
import { Reader } from "./Xlsx/Reader";

export namespace Xlsx {
	export type Sheet<TSchema extends z.core.$ZodObject> =
		Reader.Sheet<TSchema>;

	export type Result<TLoad extends Record<string, Sheet<z.core.$ZodObject>>> =
		Reader.Result<TLoad>;

	export interface Props<
		TLoad extends Record<string, Sheet<z.core.$ZodObject>>,
	> extends Omit<JustDropZone.Props, "children">,
			Pick<Reader.Props<TLoad>, "load" | "onSuccess" | "children"> {
		//
	}
}

export const Xlsx = <TLoad extends Record<string, Xlsx.Sheet<any>>>({
	load,
	onSuccess,
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
			{(props) => {
				return (
					<Reader
						load={load}
						onSuccess={onSuccess}
						{...props}
					>
						{children}
					</Reader>
				);
			}}
		</JustDropZone>
	);
};
