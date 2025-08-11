import type { FC } from "react";
import { Select } from "../select/Select";

export namespace SizeSelect {
	export interface SizeType {
		id: string;
		size: number;
	}

	export namespace Event {
		export type OnSize = (size: number) => void;
	}

	export interface Props extends Select.PropsEx<SizeType> {
		sizes?: number[];
		size: number;
		onSize: Event.OnSize;
	}
}

export const SizeSelect: FC<SizeSelect.Props> = ({
	sizes = [
		5,
		15,
		30,
		50,
		100,
	],
	size,
	onSize,
	...props
}) => {
	return (
		<Select<SizeSelect.SizeType>
			items={sizes.map((size) => ({
				id: `${size}`,
				size,
			}))}
			defaultValue={`${size}`}
			value={`${size}`}
			onItem={({ size }) => onSize(size)}
			render={({ entity: { size } }) => size}
			cls={({ what }) => ({
				slot: {
					base: what.css([
						"px-4",
						"py-1",
					]),
					item: what.css([
						"px-4",
						"py-1",
					]),
				},
			})}
			{...props}
		/>
	);
};
