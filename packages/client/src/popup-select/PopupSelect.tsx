import type { ReactNode } from "@tanstack/react-router";
import type {
    CursorSchema,
    Entity,
    FilterSchema,
    IdentitySchema,
    withSource,
} from "@use-pico/common";
import { useState, type FC } from "react";
import { Button } from "../button/Button";
import type { Fulltext } from "../fulltext/Fulltext";
import { BackIcon } from "../icon/BackIcon";
import { ConfirmIcon } from "../icon/ConfirmIcon";
import { Icon } from "../icon/Icon";
import { SelectionOff } from "../icon/SelectionOff";
import { SelectionOn } from "../icon/SelectionOn";
import { Modal } from "../modal/Modal";
import { ModalContext } from "../modal/ModalContext";
import { useListQuery as useCoolListQuery } from "../source/useListQuery";
import type { Table } from "../table/Table";
import { Tx } from "../tx/Tx";
import { PopupSelectCss } from "./PopupSelectCss";

export namespace PopupSelect {
	export interface Props<TItem extends IdentitySchema.Type>
		extends PopupSelectCss.Props {
		icon?: string | ReactNode;
		textTitle?: ReactNode;
		textSelect?: ReactNode;
		modalProps?: Modal.PropsEx;
		table: FC<Table.PropsEx<any>>;
		render: FC<Entity.Type<TItem>>;
		allowEmpty?: boolean;

		source: withSource.Instance<any, any>;
		useListQuery?: useCoolListQuery<any, any>;

		value: string;
		onChange(value: string | undefined): void;
	}

	export type PropsEx<TItem extends IdentitySchema.Type> = Omit<
		Props<TItem>,
		"table" | "source" | "useListQuery" | "render"
	>;
}

export const PopupSelect = <TItem extends IdentitySchema.Type>({
	icon,
	textTitle,
	textSelect,
	modalProps,
	table: Table,
	render: Render,
	allowEmpty = false,

	source,
	useListQuery = useCoolListQuery,

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
	const [size, setSize] = useState(15);
	const [selection, setSelection] = useState<string[]>(value ? [value] : []);
	const [fulltext, setFulltext] = useState<Fulltext.Value>(undefined);

	const result = useListQuery({
		source,
		where: {
			fulltext,
		} satisfies FilterSchema.Type,
		cursor: {
			page,
			size,
		} satisfies CursorSchema.Type,
	});

	const selected = useListQuery({
		source,
		where: {
			id: value,
		},
		options: {
			enabled: Boolean(value),
		},
	});

	return (
		<Modal
			icon={icon}
			target={
				<label
					className={tv.input({
						loading: selected.isLoading,
						selected: Boolean(selected.data?.data?.length),
					})}
				>
					<Icon icon={selected.data?.data?.[0] ? SelectionOn : SelectionOff} />
					{selected.data?.data?.[0] ?
						<Render entity={selected.data?.data?.[0]} />
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
							},
						}}
						fulltext={{
							value: fulltext,
							set(value) {
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
								disabled={!selection.length && !allowEmpty}
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
