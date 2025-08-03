import { useQuery } from "@tanstack/react-query";
import type {
	CursorSchema,
	Entity,
	EntitySchema,
	FilterSchema,
} from "@use-pico/common";
import { type FC, type ReactNode, useEffect, useId, useMemo } from "react";
import { Icon } from "../icon/Icon";
import { LoaderIcon } from "../icon/LoaderIcon";
import { SelectionOffIcon } from "../icon/SelectionOffIcon";
import { SelectionOnIcon } from "../icon/SelectionOnIcon";
import { Modal } from "../modal/Modal";
import { ModalFooter } from "../modal/ModalFooter";
import { createLocalTableStore } from "../table/createLocalTableStore";
import { Tx } from "../tx/Tx";
import { PopupContent } from "./PopupContent";
import { PopupSelectCls } from "./PopupSelectCls";

export namespace PopupSelect {
	export namespace Query {
		export interface Props {
			filter?: Omit<FilterSchema.Type, "idIn">;
			cursor?: CursorSchema.Type;
		}

		export type Callback<TItem extends EntitySchema.Type> = (
			props: Props,
		) => Promise<PopupContent.List<TItem>>;
	}

	/**
	 * This is a working name for a component used to render items in the popup.
	 *
	 * It does not necessarily have to be a table, but it is a good name for a component that renders a list of items.
	 */
	export namespace Table {
		export type Props = {};

		export type Component = FC<Props>;
	}

	export interface Props<TItem extends EntitySchema.Type>
		extends PopupSelectCls.Props {
		icon?: Icon.Type;
		textTitle?: ReactNode;
		textSelect?: ReactNode;
		modalProps?: Modal.PropsEx;
		table: Table.Component;
		render: FC<Entity.Type<TItem>>;
		allowEmpty?: boolean;

		/**
		 * Name used for react-query cache.
		 */
		queryKey: string;
		queryHash?: Record<any, any>;
		query: Query.Callback<TItem>;

		value?: string | null;
		onChange(value: string | null): void;
		/**
		 * Selected (submitted) value/null.
		 */
		onSelect?(item: TItem | null): void;
	}

	export type PropsEx<TItem extends EntitySchema.Type> = Omit<
		Props<TItem>,
		"table" | "queryKey" | "queryHash" | "query" | "render"
	>;
}

export const PopupSelect = <TItem extends EntitySchema.Type>({
	icon,
	textTitle,
	textSelect,
	modalProps,
	table,
	render: Render,
	allowEmpty = false,

	queryKey,
	queryHash,
	query,

	value,
	onChange,
	onSelect,

	variant,
	tva = PopupSelectCls,
	cls,
}: PopupSelect.Props<TItem>) => {
	const { el } = tva(variant, cls);

	/**
	 * Dependency-free memo, because... store does not have any dependencies (defaultOpen
	 * values are not used).
	 */
	const useLocalTableStore = useMemo(() => createLocalTableStore({}), []);
	const fulltext = useLocalTableStore((state) => state.fulltext);
	const page = useLocalTableStore((state) => state.page);
	const size = useLocalTableStore((state) => state.size);
	const selection = useLocalTableStore((state) => state.selection);
	const setSelection = useLocalTableStore((state) => state.setSelection);

	useEffect(() => {
		setSelection(
			value
				? [
						value,
					]
				: [],
		);
	}, [
		setSelection,
		value,
	]);

	const result = useQuery({
		queryKey: [
			queryKey,
			"PopupSelect",
			"data",
			queryHash,
			{
				fulltext,
				page,
				size,
			},
		],
		async queryFn() {
			return query({
				filter: {
					fulltext,
				},
				cursor: {
					page,
					size,
				},
			});
		},
	});

	const withValue = Boolean(value);

	const selected = useQuery({
		queryKey: [
			queryKey,
			"PopupSelect",
			"selected",
			queryHash,
			{
				value,
			},
		],
		async queryFn() {
			return query({
				filter: {
					id: value ?? undefined,
				},
			});
		},
		enabled: withValue,
	});

	const modalId = useId();

	return (
		<Modal
			key={modalId}
			icon={icon}
			target={
				<el.input.Label
					htmlFor={modalId}
					variant={{
						loading: selected.isFetching || result.isFetching,
						selected: Boolean(selected.data?.list.length),
					}}
				>
					<Icon
						icon={
							result.isFetching || selected.isFetching
								? LoaderIcon
								: withValue && selected.data?.list?.[0]
									? SelectionOnIcon
									: SelectionOffIcon
						}
					/>
					{withValue && selected.data?.list?.[0] ? (
						<Render entity={selected.data?.list?.[0]} />
					) : (
						textSelect || <Tx label={"Select item (label)"} />
					)}
				</el.input.Label>
			}
			textTitle={textTitle}
			variant={{
				loading: result.isFetching,
			}}
			disabled={result.isFetching}
			cls={{
				modal: [
					"w-2/3",
				],
			}}
			footer={() => (
				<ModalFooter
					disabled={!selection.length && !allowEmpty}
					onCancel={() => {
						setSelection(
							value
								? [
										value,
									]
								: [],
						);
					}}
					onConfirm={() => {
						onChange(selection?.[0] || null);
						onSelect?.(
							result.data?.list?.find(
								(item) => item.id === selection?.[0],
							) ?? null,
						);
					}}
				/>
			)}
			{...modalProps}
		>
			{() => (
				<PopupContent
					table={table}
					useLocalStore={useLocalTableStore}
					result={result}
					onChange={onChange}
					onSelect={onSelect}
				/>
			)}
		</Modal>
	);
};
