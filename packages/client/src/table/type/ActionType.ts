import type { EntitySchema } from "@use-pico/common";
import type { FC } from "react";
import type { SelectionType } from "./SelectionType";

export namespace ActionType {
	export namespace Table {
		export interface Props<
			TData extends EntitySchema.Type,
			TContext = any,
		> {
			data: TData[];
			selection?: SelectionType.Selection;
			context?: TContext;
		}

		export type Component<
			TData extends EntitySchema.Type,
			TContext = any,
		> = FC<Props<TData, TContext>>;

		/**
		 * Table configuration of action type
		 */
		export interface Table<
			TData extends EntitySchema.Type,
			TContext = any,
		> {
			action?: Component<TData, TContext>;
			width?: string;
		}
	}

	export namespace Row {
		export interface Props<
			TData extends EntitySchema.Type,
			TContext = any,
		> {
			data: TData;
			context?: TContext;
		}

		export type Component<
			TData extends EntitySchema.Type,
			TContext = any,
		> = FC<Props<TData, TContext>>;

		/**
		 * Table configuration of action type
		 */
		export interface Table<
			TData extends EntitySchema.Type,
			TContext = any,
		> {
			action: Component<TData, TContext> | undefined;
		}
	}
}
