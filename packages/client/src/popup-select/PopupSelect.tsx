import type {
	EntitySchema,
	StateType,
	withQuerySchema,
} from "@use-pico/common";
import { type FC, type ReactNode, useId } from "react";
import { useCls } from "../hooks/useCls";
import type { Icon } from "../icon/Icon";
import { Modal } from "../modal/Modal";
import type { withQuery } from "../source/withQuery";
import type { Table } from "../table/Table";
import { Content } from "./Content";
import { PopupSelectCls } from "./PopupSelectCls";
import { Target } from "./Target";

export namespace PopupSelect {
	export type State = StateType<string[]>;

	export namespace Render {
		export interface Props<TItem extends EntitySchema.Type> {
			entities: TItem[];
		}

		export type Render<TItem extends EntitySchema.Type> = (
			props: Props<TItem>,
		) => ReactNode;
	}

	export interface Props<
		TQuery extends withQuerySchema.Query,
		TItem extends EntitySchema.Type,
	> extends PopupSelectCls.Props {
		mode: "single" | "multi";
		withQuery: withQuery.Api<TQuery, TItem[]>;
		query?: TQuery;
		table: FC<Table.PropsEx<TQuery, TItem>>;
		//
		render: Render.Render<TItem>;
		//
		icon?: Icon.Type;
		textTitle?: ReactNode;
		textSelect?: ReactNode;
		modalProps?: Modal.PropsEx;
		//
		allowEmpty?: boolean;
		//
		state: State;
	}

	export type PropsEx<
		TQuery extends withQuerySchema.Query,
		TItem extends EntitySchema.Type,
	> = Omit<Props<TQuery, TItem>, "withQuery" | "table" | "render">;
}

export const PopupSelect = <
	TQuery extends withQuerySchema.Query,
	TItem extends EntitySchema.Type,
>({
	mode,
	withQuery,
	query,
	table,
	render,
	//
	icon,
	textTitle,
	textSelect,
	modalProps,
	//
	allowEmpty = false,
	//
	state,
	//
	variant,
	tva = PopupSelectCls,
	cls,
}: PopupSelect.Props<TQuery, TItem>) => {
	const { slots } = useCls(tva, variant, cls);

	const modalId = useId();

	return (
		<Modal
			key={modalId}
			icon={icon}
			target={
				<Target
					modalId={modalId}
					slots={slots}
					withQuery={withQuery}
					render={render}
					textSelect={textSelect}
					state={state}
				/>
			}
			textTitle={textTitle}
			variant={
				{
					// loading: result.isFetching,
				}
			}
			// disabled={result.isFetching}
			cls={{
				modal: [
					"w-2/3",
				],
			}}
			{...modalProps}
		>
			<Content
				mode={mode}
				query={query}
				table={table}
				state={state}
				slots={slots}
				allowEmpty={allowEmpty}
			/>
		</Modal>
	);
};
