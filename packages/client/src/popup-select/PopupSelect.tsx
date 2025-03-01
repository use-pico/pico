import { useQuery } from "@tanstack/react-query";
import type { ReactNode } from "@tanstack/react-router";
import type {
	CursorSchema,
	Entity,
	FilterSchema,
	IdentitySchema,
} from "@use-pico/common";
import { useEffect, useMemo, type FC } from "react";
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
import { PopupContent } from "./PopupContent";
import { PopupSelectCss } from "./PopupSelectCss";

export namespace PopupSelect {
	export namespace Query {
		export interface Props {
			filter?: Omit<FilterSchema.Type, "idIn">;
			cursor?: CursorSchema.Type;
		}

		export type Callback<TItem extends IdentitySchema.Type> = (
			props: Props,
		) => Promise<withListCount.Result<TItem>>;
	}

	export interface Props<TItem extends IdentitySchema.Type>
		extends PopupSelectCss.Props {
		icon?: string | ReactNode;
		textTitle?: ReactNode;
		textSelect?: ReactNode;
		modalProps?: Modal.PropsEx;
		table: FC<Table.PropsEx<TItem>>;
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

	export type PropsEx<TItem extends IdentitySchema.Type> = Omit<
		Props<TItem>,
		"table" | "queryKey" | "queryHash" | "query" | "render"
	>;
}

export const PopupSelect = <TItem extends IdentitySchema.Type>({
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
	tva = PopupSelectCss,
	css,
}: PopupSelect.Props<TItem>) => {
	const tv = tva({
		...variant,
		css,
	}).slots;

	/**
	 * Dependency-free meme, because... store does not have any dependencies (defaultOpen
	 * values are not used).
	 */
	const useLocalStore = useMemo(() => createLocalTableStore({}), []);
	const fulltext = useLocalStore((state) => state.fulltext);
	const page = useLocalStore((state) => state.page);
	const size = useLocalStore((state) => state.size);
	const selection = useLocalStore((state) => state.selection);
	const setSelection = useLocalStore((state) => state.setSelection);

	const result = useQuery({
		queryKey: [
			queryKey,
			"PopupSelect",
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

	const withValue = Boolean(value);

	const selected = useQuery({
		queryKey: [queryKey, "PopupSelect", "selected", { value, ...queryHash }],
		async queryFn() {
			return query({
				filter: {
					id: value ?? undefined,
				},
			});
		},
		enabled: withValue,
	});

	useEffect(() => {
		setSelection(value ? [value] : []);
	}, [value]);

	return (
		<Modal
			icon={icon}
			target={
				<label
					className={tv.input({
						loading: selected.isLoading || result.isLoading,
						selected: Boolean(selected.data?.data.length),
					})}
				>
					<Icon
						icon={
							selected.isLoading ? LoaderIcon
							: withValue && selected.data?.data?.[0] ?
								SelectionOnIcon
							:	SelectionOffIcon
						}
					/>
					{withValue && selected.data?.data?.[0] ?
						<Render entity={selected.data?.data?.[0]} />
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
			footer={({ close }) => (
				<div className={tv.footer()}>
					<Button
						iconEnabled={BackIcon}
						iconDisabled={BackIcon}
						onClick={() => {
							close();
							setSelection(value ? [value] : []);
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
							onChange(selection?.[0] || null);
							onSelect?.(
								result.data?.data?.find((item) => item.id === selection?.[0]) ??
									null,
							);
							close();
						}}
					>
						<Tx label={"Confirm selection (label)"} />
					</Button>
				</div>
			)}
			{...modalProps}
		>
			<PopupContent
				table={table}
				useLocalStore={useLocalStore}
				result={result}
				onChange={onChange}
				onSelect={onSelect}
			/>
		</Modal>
	);
};
