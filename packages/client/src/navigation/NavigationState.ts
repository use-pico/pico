import type { CursorSchema, OrderSchema, StateType } from "@use-pico/common";
import type { Cursor } from "../cursor/Cursor";
import type { Fulltext } from "../fulltext/Fulltext";
import type { SelectionType } from "../table/type/SelectionType";

export const NavigationState = {
	filter(
		value: Record<string, any> | undefined,
		navigate: (props: {
			search: (props: {
				cursor: {
					page: number;
				};
			}) => any;
			replace?: boolean;
		}) => void,
	): StateType<Record<string, any> | undefined> {
		return {
			value,
			set(filter) {
				return navigate({
					search: ({ cursor, ...prev }) => ({
						...prev,
						filter,
						cursor: {
							...cursor,
							page: 0,
						},
					}),
				});
			},
		};
	},
	fulltext(
		value: Fulltext.Value,
		navigate: (props: {
			search: (props: {
				cursor: {
					page: number;
				};
				filter?: {
					fulltext?: string | null;
				} | null;
			}) => any;
			replace?: boolean;
		}) => void,
	): StateType<Fulltext.Value> {
		return {
			value,
			set(text) {
				if ((text ?? "") === (value ?? "")) {
					return;
				}

				return navigate({
					search: ({ cursor, filter, ...rest }) => ({
						...rest,
						filter: {
							...filter,
							fulltext: text,
						},
						cursor: {
							...cursor,
							page: text ? 0 : cursor.page,
						},
					}),
					replace: false,
				});
			},
		};
	},
	selection(
		type: "single" | "multi",
		value: any[],
		navigate: (props: {
			search: (props: { selection: any[] }) => any;
		}) => void,
	): SelectionType.Table {
		return {
			type,
			state: {
				value,
				set(selection) {
					return navigate({
						search(prev) {
							return {
								...prev,
								selection,
							};
						},
					});
				},
			},
		};
	},
	cursor(
		value: CursorSchema.Type,
		navigate: (props: {
			search: (props: {
				cursor: {
					page: number;
					size: number;
				};
			}) => any;
		}) => void,
	): Cursor.State {
		return {
			value,
			set(value) {
				return navigate({
					search: ({ cursor, ...rest }) => ({
						...rest,
						cursor: value,
					}),
				});
			},
		};
	},
	sort(
		value: Record<string, OrderSchema.Type>,
		navigate: (props: {
			search: (props: { sort: Record<string, OrderSchema.Type> }) => any;
			replace?: boolean;
		}) => void,
	): StateType<Record<string, OrderSchema.Type>> {
		return {
			value,
			set(sort) {
				navigate({
					search: (search) => ({
						...search,
						sort,
					}),
				});
			},
		};
	},
} as const;
