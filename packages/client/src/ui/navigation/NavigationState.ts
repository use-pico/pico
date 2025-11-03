import type { CursorSchema, withQuerySchema } from "@use-pico/common/schema";
import type { StateType } from "@use-pico/common/type";
import type { Fulltext } from "../fulltext/Fulltext";

export const NavigationState = {
	filter(
		value: Record<string, any> | undefined,
		navigate: (props: {
			search: (props: {
				filter?: any;
				cursor?: {
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
	): StateType<CursorSchema.Type> {
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
		value: withQuerySchema.Query<any, any>["sort"] | undefined,
		navigate: (props: {
			search: (props: {
				sort:
					| withQuerySchema.Query<any, any>["sort"]
					| undefined
					| null;
			}) => any;
			replace?: boolean;
		}) => void,
	): StateType<withQuerySchema.Query<any, any>["sort"] | undefined> {
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
