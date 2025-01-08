import { useQuery } from "@tanstack/react-query";
import type { ReactNode } from "@tanstack/react-router";
import type {
    CursorSchema,
    FilterSchema,
    IdentitySchema,
} from "@use-pico/common";
import { useState, type FC } from "react";
import { Button } from "../button/Button";
import { BackIcon } from "../icon/BackIcon";
import { ConfirmIcon } from "../icon/ConfirmIcon";
import { Icon } from "../icon/Icon";
import { SelectionOff } from "../icon/SelectionOff";
import { SelectionOn } from "../icon/SelectionOn";
import { Modal } from "../modal/Modal";
import { ModalContext } from "../modal/ModalContext";
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
		/**
		 * Name used for react-query cache.
		 */
		name: string;
		icon?: string | ReactNode;
		textTitle?: ReactNode;
		textSelect?: ReactNode;
		modalProps?: Modal.PropsEx;
		table: FC<Table.PropsEx<any>>;
		render: FC<{ entities: TItem[] }>;
		allowEmpty?: boolean;

		query: Query.Callback<TItem>;

		value: string[] | undefined;
		onChange(value: string[]): void;
	}

	export type PropsEx<TItem extends IdentitySchema.Type> = Omit<
		Props<TItem>,
		"name" | "table" | "source" | "query" | "render"
	>;
}

export const PopupMultiSelect = <TItem extends IdentitySchema.Type>({
	name,
	icon,
	textTitle,
	textSelect,
	modalProps,
	table: Table,
	render: Render,
	allowEmpty = false,

	query,

	value,
	onChange,

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
	const [fulltext, setFulltext] = useState<string | undefined>(undefined);

	const result = useQuery({
		queryKey: [name, "PopupMultiSelect", "data", { fulltext, page, size }],
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

	const selected = useQuery({
		queryKey: [name, "PopupMultiSelect", "selected", { value }],
		async queryFn() {
			return query({
				filter: {
					idIn: value,
				},
			});
		},
		enabled: Boolean(value),
	});

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
						icon={selected.data?.data?.length ? SelectionOn : SelectionOff}
					/>
					{selected.data && selected.data.data.length ?
						<Render entities={selected.data.data} />
					:	textSelect || <Tx label={"Select item (label)"} />}
				</label>
			}
			title={textTitle}
			variant={{
				loading: result.isLoading,
			}}
			disabled={result.isLoading}
			{...modalProps}
		>
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

				<ModalContext.Consumer>
					{(modalContext) => (
						<div className={tv.footer()}>
							<Button
								iconEnabled={BackIcon}
								iconDisabled={BackIcon}
								onClick={() => {
									modalContext?.close();
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
									modalContext?.close();
								}}
							>
								<Tx label={"Confirm selection (label)"} />
							</Button>
						</div>
					)}
				</ModalContext.Consumer>
			</div>
		</Modal>
	);
};
