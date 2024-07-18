import {
	cssOf,
	type SpotlightItemSchema,
	type SpotlightQuerySchema,
	type SpotlightSchema,
} from "@use-pico/common";
import { type FC } from "react";
import { t } from "../i18n/t";
import { td } from "../i18n/td";
import type { IWithSourceQuery } from "../query/IWithSourceQuery";
import { useSourceQuery } from "../query/useSourceQuery";
import { Icon } from "../ui/Icon";
import { Loader } from "../ui/Loader";
import { SpotlightQueryStore } from "./SpotlightQueryStore";

export namespace Results {
	export interface Handler {
		Header?: FC<Handler.HeaderProps>;
		Item: FC<Handler.ItemProps>;
	}

	export namespace Handler {
		export interface HeaderProps {
			title: string;
		}

		export interface ItemProps {
			item: SpotlightItemSchema.Type;
			onClose: () => void;
		}
	}

	export type Handlers<TTypes extends string = string> = NonNullable<
		Partial<Record<TTypes, Handler>>
	>;

	export interface Props<TTypes extends string = string> {
		withSourceQuery: IWithSourceQuery<SpotlightQuerySchema, SpotlightSchema>;
		handlers: Handlers<TTypes>;
		onClose: () => void;
	}
}

export const Results = <TTypes extends string = string>({
	withSourceQuery,
	handlers,
	onClose,
}: Results.Props<TTypes>) => {
	const query = SpotlightQueryStore.useSelector(
		({ shallowFilter, filter }) => ({
			shallowFilter,
			filter,
		}),
	);
	const isEnabled = Boolean(query.filter?.fulltext);
	const result = useSourceQuery({
		store: SpotlightQueryStore,
		withSourceQuery,
		enabled: isEnabled,
	});
	const isEmpty =
		result.isSuccess &&
		result.data?.reduce((acc, type) => acc + type.items.length, 0) === 0;

	return (
		<div
			className={cssOf(
				"transition-all opacity-0 duration-200",
				"bg-slate-100 p-2 rounded-md",
				isEnabled && "visible opacity-100",
			)}
			onClick={(e) => e.stopPropagation()}
		>
			<div className={cssOf("bg-white rounded border border-slate-300 p-4")}>
				{result.isFetching && (
					<div className={"flex justify-center"}>
						<Loader size={"3xl"} />
					</div>
				)}
				{!result.isFetching && isEmpty && (
					<div
						className={cssOf(
							"flex flex-col items-center justify-center",
							"text-slate-500",
						)}
					>
						<Icon
							icon={"icon-[line-md--emoji-frown]"}
							size={"4xl"}
						/>
						<div className={"text-xl"}>{t()`Spotlight empty`}</div>
					</div>
				)}
				{!result.isFetching &&
					result.isSuccess &&
					result.data?.length !== 0 && (
						<div className={cssOf("flex flex-row gap-4")}>
							{result.data.map((type) => {
								const { Header, Item } = handlers[
									type.type as keyof typeof handlers
								] as Results.Handler;

								return type.items.length ?
										<div
											key={`search-type-${type.id}`}
											className={cssOf("grow")}
										>
											<div
												className={cssOf(
													"text-md",
													"font-semibold",
													"text-slate-500",
													"border-b border-sky-300 mb-2",
												)}
											>
												{Header ?
													<Header title={td()(`Search group [${type.type}]`)} />
												:	td()(`Search group [${type.type}]`)}
											</div>
											<div>
												{type.items.map((item) => (
													<div
														key={`search-result-${type.id}-${item.id}-${item.fulltext}`}
														className={cssOf("px-3 py-1.5 hover:bg-slate-100")}
													>
														<Item
															item={item}
															onClose={onClose}
														/>
													</div>
												))}
											</div>
										</div>
									:	null;
							})}
						</div>
					)}
			</div>
		</div>
	);
};
