import { useQuery } from "@tanstack/react-query";
import type { ReactNode } from "@tanstack/react-router";
import type {
	CursorSchema,
	FilterSchema,
	IdentitySchema,
} from "@use-pico/common";
import { useEffect, useState, type FC } from "react";
import { Button } from "../button/Button";
import type { Fulltext } from "../fulltext/Fulltext";
import { BackIcon } from "../icon/BackIcon";
import { ConfirmIcon } from "../icon/ConfirmIcon";
import { Icon } from "../icon/Icon";
import { LoaderIcon } from "../icon/LoaderIcon";
import { SelectionOff } from "../icon/SelectionOff";
import { SelectionOn } from "../icon/SelectionOn";
import { Modal } from "../modal/Modal";
import type { withListCount } from "../source/withListCount";
import type { Table } from "../table/Table";
import { Tx } from "../tx/Tx";
import { PopupMultiSelectCss } from "./PopupMultiSelectCss";

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
		extends PopupMultiSelectCss.Props {
		icon?: string | ReactNode;
		textTitle?: ReactNode;
		textSelect?: ReactNode;
		modalProps?: Modal.PropsEx;
		table: FC<Table.PropsEx<TItem>>;
		render: FC<{ entities: TItem[] }>;
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
	table: Table,
	render: Render,
	allowEmpty = false,

	queryKey,
	queryHash,
	query,

	value,
	onChange,
	onSelect,

	variant,
	tva = PopupMultiSelectCss,
	css,
}: PopupMultiSelect.Props<TItem>) => {
	const tv = tva({
		...variant,
		css,
	}).slots;

	const [page, setPage] = useState(0);
	const [size, setSize] = useState(15);
	const [selection, setSelection] = useState<string[]>(value || []);
	const [fulltext, setFulltext] = useState<Fulltext.Value>("");

	const result = useQuery({
		queryKey: [
			queryKey,
			"PopupMultiSelect",
			"data",
			{ fulltext, page, size, ...queryHash },
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
			{ value, ...queryHash },
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
	}, [value]);

	return (
		<Modal
			icon={icon}
			target={
				<label
					className={tv.input({
						loading: selected.isLoading,
						selected: Boolean(selected.data?.data.length),
					})}
				>
					<Icon
						icon={
							selected.isLoading ? LoaderIcon
							: withValue && selected.data?.data?.[0] ?
								SelectionOn
							:	SelectionOff
						}
					/>
					{withValue && selected.data && selected.data.data.length ?
						<Render entities={selected.data.data} />
					:	textSelect || <Tx label={"Select item (label)"} />}
				</label>
			}
			textTitle={textTitle}
			variant={{
				loading: result.isLoading,
			}}
			disabled={result.isLoading}
			css={{
				modal: ["w-2/3"],
			}}
			{...modalProps}
		>
			{({ close }) => {
				return (
					<div className={tv.base()}>
						<div className={tv.content()}>
							<Table
								cursor={{
									cursor: {
										page,
										size,
									},
									count:
										result.data?.count ?
											result.data.count
										:	{
												filter: -1,
												total: -1,
												where: -1,
											},
									textTotal: <Tx label={"Total count of items (label)"} />,
									onPage(page) {
										setPage(page);
									},
									onSize(size) {
										setSize(size);
										setPage(0);
									},
								}}
								fulltext={{
									value: fulltext,
									set(value) {
										setFulltext(value);
										setPage(0);
									},
								}}
								table={{
									data: result.data?.data ?? [],
									selection: {
										type: "multi",
										value: selection,
										set(selection) {
											setSelection(selection);
										},
									},
								}}
							/>
						</div>

						<div className={tv.footer()}>
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
										result.data?.data?.filter((item) =>
											selection.includes(item.id),
										) || [],
									);
									close();
								}}
							>
								<Tx label={"Confirm selection (label)"} />
							</Button>
						</div>
					</div>
				);
			}}
		</Modal>
	);
};
