import { useQuery } from "@tanstack/react-query";
import type { ReactNode } from "@tanstack/react-router";
import type {
	CursorSchema,
	FilterSchema,
	IdentitySchema,
} from "@use-pico/common";
import { type FC, useEffect, useId, useMemo } from "react";
import { Button } from "../button/Button";
import { BackIcon } from "../icon/BackIcon";
import { ConfirmIcon } from "../icon/ConfirmIcon";
import { Icon } from "../icon/Icon";
import { LoaderIcon } from "../icon/LoaderIcon";
import { SelectionOffIcon } from "../icon/SelectionOffIcon";
import { SelectionOnIcon } from "../icon/SelectionOnIcon";
import { Modal } from "../modal/Modal";
import type { withListCount } from "../source/withListCount";
import { createLocalTableStore } from "../table/createLocalTableStore";
import type { Table } from "../table/Table";
import { Tx } from "../tx/Tx";
import { PopupMultiContent } from "./PopupMultiContent";
import { PopupMultiSelectCls } from "./PopupMultiSelectCls";

export namespace PopupMultiSelect {
	export namespace Query {
		export interface Props {
			filter?: FilterSchema.Type;
			cursor?: CursorSchema.Type;
		}

		export type Callback<TItem extends IdentitySchema.Type> = (
			props: Props,
		) => Promise<withListCount.Result<TItem>>;
	}

	export interface Props<TItem extends IdentitySchema.Type>
		extends PopupMultiSelectCls.Props {
		icon?: string | ReactNode;
		textTitle?: ReactNode;
		textSelect?: ReactNode;
		modalProps?: Modal.PropsEx;
		table: FC<Table.PropsEx<TItem>>;
		render: FC<{
			entities: TItem[];
		}>;
		allowEmpty?: boolean;

		/**
		 * Name used for react-query cache.
		 */
		queryKey: string;
		queryHash?: Record<any, any>;
		query: Query.Callback<TItem>;

		value: string[] | undefined | null;
		onChange(value: string[]): void;
		/**
		 * When selection is submitted, here is a list of selected items.
		 */
		onSelect?(items: TItem[]): void;
	}

	export type PropsEx<TItem extends IdentitySchema.Type> = Omit<
		Props<TItem>,
		"table" | "queryKey" | "queryHash" | "query" | "render"
	>;
}

export const PopupMultiSelect = <TItem extends IdentitySchema.Type>({
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
	tva = PopupMultiSelectCls,
	cls,
}: PopupMultiSelect.Props<TItem>) => {
	const { slots } = tva(variant, cls);

	const useLocalStore = useMemo(() => createLocalTableStore({}), []);
	const fulltext = useLocalStore((state) => state.fulltext);
	const page = useLocalStore((state) => state.page);
	const size = useLocalStore((state) => state.size);
	const selection = useLocalStore((state) => state.selection);
	const setSelection = useLocalStore((state) => state.setSelection);

	const result = useQuery({
		queryKey: [
			queryKey,
			"PopupMultiSelect",
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

	const withValue = (value?.length || 0) > 0;

	const selected = useQuery({
		queryKey: [
			queryKey,
			"PopupMultiSelect",
			"selected",
			queryHash,
			{
				value,
			},
		],
		async queryFn() {
			return query({
				filter: {
					idIn: value || undefined,
				},
			});
		},
		enabled: withValue,
	});

	useEffect(() => {
		setSelection(value || []);
	}, [
		setSelection,
		value,
	]);

	const modalId = useId();

	return (
		<Modal
			key={modalId}
			icon={icon}
			target={
				<label
					htmlFor={modalId}
					className={slots.input({
						loading: selected.isFetching || result.isFetching,
						selected: Boolean(selected.data?.list.length),
					})}
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
					{withValue && selected.data && selected.data.list.length ? (
						<Render entities={selected.data.list} />
					) : (
						textSelect || <Tx label={"Select item (label)"} />
					)}
				</label>
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
			footer={({ close }) => {
				return (
					<div className={slots.footer()}>
						<Button
							iconEnabled={BackIcon}
							iconDisabled={BackIcon}
							onClick={() => {
								close();
								setSelection(value || []);
							}}
							variant={{
								variant: "subtle",
							}}
						>
							<Tx label={"Close (label)"} />
						</Button>

						<Button
							iconEnabled={ConfirmIcon}
							iconDisabled={ConfirmIcon}
							disabled={!selection.length && !allowEmpty}
							onClick={() => {
								onChange(selection);
								onSelect?.(
									result.data?.list?.filter((item) =>
										selection.includes(item.id),
									) || [],
								);
								close();
							}}
						>
							<Tx label={"Confirm selection (label)"} />
						</Button>
					</div>
				);
			}}
			{...modalProps}
		>
			<PopupMultiContent
				table={table}
				useLocalStore={useLocalStore}
				result={result}
			/>
		</Modal>
	);
};
