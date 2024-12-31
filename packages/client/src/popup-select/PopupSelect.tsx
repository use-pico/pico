import type { ReactNode } from "@tanstack/react-router";
import type {
    CursorSchema,
    Entity,
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
import type { withRepository } from "../repository/withRepository";
import type { Table } from "../table/Table";
import { Tx } from "../tx/Tx";
import { PopupSelectCss } from "./PopupSelectCss";

export namespace PopupSelect {
	export interface Props<TItem extends IdentitySchema.Type>
		extends PopupSelectCss.Props {
		icon?: string | ReactNode;
		titleText?: ReactNode;
		modalProps?: Modal.PropsEx;
		table: FC<Table.PropsEx<any>>;
		render: FC<Entity.Type<TItem>>;
		useListQuery: withRepository.Instance.useListQuery.Callback<any>;

		value: string;
		onChange(value: string | undefined): void;
	}

	export type PropsEx<TItem extends IdentitySchema.Type> = Omit<
		Props<TItem>,
		"icon" | "titleText" | "table" | "useListQuery" | "render"
	>;
}

export const PopupSelect = <TItem extends IdentitySchema.Type>({
	icon,
	titleText,
	modalProps,
	table: Table,
	render: Render,
	useListQuery,

	value,
	onChange,

	variant,
	tva = PopupSelectCss,
	css,
}: PopupSelect.Props<TItem>) => {
	const tv = tva({
		...variant,
		css,
	}).slots;

	const [page, setPage] = useState(0);
	const [size, setSize] = useState(10);
	const [selection, setSelection] = useState<string[]>(value ? [value] : []);
	const [fulltext, setFulltext] = useState<string | undefined | null>(
		undefined,
	);

	const result = useListQuery({
		query: {
			where: {
				fulltext,
			} satisfies FilterSchema.Type,
			cursor: {
				page,
				size,
			} satisfies CursorSchema.Type,
		},
	});

	const selected = useListQuery({
		query: {
			where: {
				id: value,
			},
		},
		options: {
			enabled: Boolean(value),
		},
	});

	return (
		<Modal
			icon={icon}
			target={
				<div className={tv.input({ loading: selected.isLoading })}>
					<Icon icon={selected.data?.data?.[0] ? SelectionOn : SelectionOff} />
					{selected.data?.data?.[0] ?
						<Render entity={selected.data?.data?.[0]} />
					:	<Tx label={"Select item (label)"} />}
				</div>
			}
			title={titleText}
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
							},
						}}
						fulltext={{
							value: fulltext,
							onFulltext(value) {
								setFulltext(value);
							},
						}}
						table={{
							data: result.data?.data ?? [],
							selection: {
								type: "single",
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
								disabled={!selection.length}
								onClick={() => {
									onChange(selection?.[0]);
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
