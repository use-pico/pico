import type {
	EntitySchema,
	StateType,
	withQuerySchema,
} from "@use-pico/common";
import { type FC, type ReactNode, useId } from "react";
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
		export namespace Single {
			export interface Props<TItem extends EntitySchema.Type> {
				entity: TItem;
			}

			export type Render<TItem extends EntitySchema.Type> = (
				props: Props<TItem>,
			) => ReactNode;
		}

		export namespace Multi {
			export interface Props<TItem extends EntitySchema.Type> {
				entities: TItem[];
			}

			export type Render<TItem extends EntitySchema.Type> = (
				props: Props<TItem>,
			) => ReactNode;
		}
	}

	export interface Props<
		TQuery extends withQuerySchema.Query,
		TItem extends EntitySchema.Type,
	> extends PopupSelectCls.Props {
		mode: "single" | "multi";
		withQuery: withQuery.Api<TQuery, TItem[]>;
		query?: Omit<TQuery, "filter" | "cursor">;
		table: FC<Table.PropsEx<TQuery, TItem>>;
		//
		/**
		 * Because user can switch between single and multi mode, we've to provide
		 * both renderers - this one is for single mode.
		 */
		renderSingle: Render.Single.Render<TItem>;
		/**
		 * Because user can switch between single and multi mode, we've to provide
		 * both renderers - this one is for multi mode.
		 */
		renderMulti: Render.Multi.Render<TItem>;
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
	> = Omit<
		Props<TQuery, TItem>,
		"withQuery" | "table" | "renderSingle" | "renderMulti"
	>;
}

export const PopupSelect = <
	TQuery extends withQuerySchema.Query,
	TItem extends EntitySchema.Type,
>({
	mode,
	withQuery,
	query,
	table,
	renderSingle,
	renderMulti,
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
	tva = PopupSelectCls,
	cls,
}: PopupSelect.Props<TQuery, TItem>) => {
	const classes = tva.create(cls);

	const modalId = useId();

	return (
		<Modal
			key={modalId}
			icon={icon}
			target={
				<Target
					mode={mode}
					modalId={modalId}
					slots={classes}
					withQuery={withQuery}
					renderSingle={renderSingle}
					renderMulti={renderMulti}
					textSelect={textSelect}
					state={state}
				/>
			}
			textTitle={textTitle}
			cls={({ what }) => ({
				variant: what.variant({
					// loading: result.isFetching,
				}),
				slot: {
					modal: what.css([
						"w-2/3",
					]),
				},
			})}
			{...modalProps}
		>
			{() => (
				<Content
					mode={mode}
					query={query}
					table={table}
					state={state}
					slots={classes}
					allowEmpty={allowEmpty}
				/>
			)}
		</Modal>
	);
};
