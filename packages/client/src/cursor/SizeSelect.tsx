import type { FC } from "react";
import { Select } from "../select/Select";

export namespace SizeSelect {
	export interface SizeType {
		id: string;
		size: number;
	}

	export interface Props extends Select.PropsEx<SizeType> {
		sizes?: number[];
		size: number;
		onSize(size: number): void;
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
			cls={{
				base: [
					"px-4",
					"py-1",
				],
				item: [
					"px-4",
					"py-1",
				],
			}}
			{...props}
		/>
	);
};
