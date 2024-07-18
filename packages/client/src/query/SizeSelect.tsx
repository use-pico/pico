import type { FC } from "react";
import { z } from "zod";
import { Select } from "../form/input/Select";
import { useStore } from "../store/useStore";
import type { IQueryStore } from "./IQueryStore";

const SizeSchema = z.object({
	id: z.string(),
	size: z.number(),
});
type SizeSchema = typeof SizeSchema;

export namespace SizeSelect {
	export interface Props extends Select.PropsEx<SizeSchema> {
		sizes?: number[];
		withQueryStore: IQueryStore.Store<any>;
	}
}

export const SizeSelect: FC<SizeSelect.Props> = ({
	sizes = [5, 15, 30, 50, 100],
	withQueryStore,
	...props
}) => {
	const { cursor, setCursor } = useStore(
		withQueryStore,
		({ cursor, setCursor }) => ({
			cursor,
			setCursor,
		}),
	);

	return (
		<Select<SizeSchema>
			items={sizes.map((size) => ({
				id: `${size}`,
				size,
			}))}
			defaultValue={`${cursor?.size || 30}`}
			value={`${cursor?.size || 30}`}
			onItem={({ size }) => setCursor(0, size)}
			render={({ entity: { size } }) => size}
			css={{
				root: ["px-8 py-1"],
				item: ["px-8 py-1"],
			}}
			{...props}
		/>
	);
};
