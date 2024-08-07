import { Css, cssOf, pagesOf, type QuerySchema } from "@use-pico/common";
import { useMemo, type ReactNode } from "react";
import { useDebounce } from "../hook/useDebounce";
import { tx } from "../i18n/tx";
import { useStore } from "../store/useStore";
import { Icon } from "../ui/Icon";
import { Loader } from "../ui/Loader";
import { IQueryStore } from "./IQueryStore";
import type { IWithSourceQuery } from "./IWithSourceQuery";
import { Pages } from "./Pagination/Pages";
import { SizeSelect } from "./SizeSelect";
import { useCount } from "./useCount";

export namespace Pagination {
	export interface Props<TQuerySchema extends QuerySchema<any, any>>
		extends Css.Style {
		withQueryStore: IQueryStore.Store<TQuerySchema>;
		withSourceQuery: IWithSourceQuery<TQuerySchema, any>;
		refresh?: number;
		text?: {
			total?: ReactNode;
		};
	}
}

export const Pagination = <TQuerySchema extends QuerySchema<any, any>>({
	withQueryStore,
	withSourceQuery,
	refresh,
	text,
	css,
}: Pagination.Props<TQuerySchema>) => {
	const { cursor, setCursor } = useStore(
		withQueryStore,
		({ cursor, setCursor }) => ({
			cursor,
			setCursor,
		}),
	);
	const result = useCount({
		store: withQueryStore,
		withSourceQuery,
		refetchInterval: refresh,
	});

	const [value, setValue] = useDebounce(
		cursor?.page || 0,
		(value) => {
			setCursor(value);
		},
		500,
	);

	const paginator = useMemo(
		() =>
			pagesOf({
				page: value + 1,
				total: Math.ceil((result.data?.count || 0) / (cursor?.size || 30)),
				siblings: 2,
				boundaries: 2,
			}),
		[value, cursor?.size, result.data?.count],
	);

	const onPage = (page: number) => setValue(page);

	return (
		<div
			className={cssOf(
				"flex items-center justify-between",
				"my-2",
				"h-10",
				"gap-2",
				css,
			)}
		>
			{paginator.total > 1 ?
				<div
					className={cssOf("flex items-center justify-center gap-2", "text-sm")}
				>
					{["both", "start"].includes(paginator.type) && (
						<>
							<Pages
								page={value}
								pages={paginator.start}
								onPage={onPage}
							/>
							<Icon icon={"icon-[tabler--dots]"} />
						</>
					)}
					<Pages
						page={value}
						pages={paginator.pages}
						onPage={onPage}
					/>
					{["both", "end"].includes(paginator.type) && (
						<>
							<Icon icon={"icon-[tabler--dots]"} />
							<Pages
								page={value}
								pages={paginator.end}
								onPage={onPage}
							/>
						</>
					)}
				</div>
			:	null}

			{result.isLoading && (
				<div
					className={cssOf(
						"flex items-center gap-2",
						"text-sm text-slate-600",
						"opacity-50",
					)}
				>
					<div>{text?.total || tx()`Total number of items`}</div>
					<div>
						<Loader size={"xs"} />
					</div>
				</div>
			)}
			{result.isSuccess && (
				<div
					className={cssOf(
						"flex items-center gap-2",
						"text-sm",
						"opacity-70",
						result.isFetching && "opacity-25",
					)}
				>
					<div>{text?.total || tx()`Total number of items`}</div>
					<div className={cssOf("font-bold")}>{result.data.count}</div>
					{result.data.count !== result.data.where && (
						<>
							<div>/</div>
							<div className={cssOf("font-semibold")}>{result.data.where}</div>
						</>
					)}
				</div>
			)}
			<SizeSelect
				disabled={result.isFetching}
				withQueryStore={withQueryStore}
			/>
		</div>
	);
};
