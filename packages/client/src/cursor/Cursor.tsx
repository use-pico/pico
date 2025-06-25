import type { ReactNode } from "@tanstack/react-router";
import {
	type CountSchema,
	type CursorSchema,
	cursorOf,
} from "@use-pico/common";
import { type FC, useMemo } from "react";
import { DotsIcon } from "../icon/DotsIcon";
import { Icon } from "../icon/Icon";
import { CursorCls } from "./CursorCls";
import { Pages } from "./Pages";
import { SizeSelect } from "./SizeSelect";

export namespace Cursor {
	export type OnPage = Pages.Props["onPage"];
	export type OnSize = SizeSelect.Props["onSize"];

	export interface Props extends CursorCls.Props {
		cursor: CursorSchema.Type;
		count: CountSchema.Type;
		textTotal: ReactNode;
		onPage: OnPage;
		onSize: OnSize;
	}
}

export const Cursor: FC<Cursor.Props> = ({
	cursor,
	count,
	textTotal,
	onPage,
	onSize,
	variant,
	tva = CursorCls,
	cls,
}) => {
	const $cursor = useMemo(
		() =>
			cursorOf({
				page: cursor.page,
				total: Math.ceil(count.filter / cursor.size),
				siblings: 1,
				boundary: 1,
			}),
		[
			cursor.page,
			count.filter,
			cursor.size,
		],
	);

	const { slots } = tva(variant, cls);

	return (
		<div className={slots.base()}>
			{$cursor.total > 1 ? (
				<div
					className={"flex items-center justify-center gap-2 text-sm"}
				>
					{$cursor.start ? (
						<Pages
							page={cursor.page}
							pages={$cursor.start}
							onPage={onPage}
						/>
					) : null}

					{$cursor.start && $cursor.pages ? (
						<Icon icon={DotsIcon} />
					) : null}

					{$cursor.pages ? (
						<Pages
							page={cursor.page}
							pages={$cursor.pages}
							onPage={onPage}
						/>
					) : null}

					{($cursor.pages && $cursor.end) ||
					($cursor.start && $cursor.end) ? (
						<Icon icon={DotsIcon} />
					) : null}

					{$cursor.end ? (
						<Pages
							page={cursor.page}
							pages={$cursor.end}
							onPage={onPage}
						/>
					) : null}
				</div>
			) : null}
			<div className={slots.sums()}>
				<div>{textTotal}</div>
				<div className={"font-bold"}>{count.filter}</div>
				{count.filter !== count.where && (
					<>
						<div>/</div>
						<div className={"font-semibold"}>{count.where}</div>
					</>
				)}
			</div>
			<SizeSelect
				size={cursor.size}
				onSize={onSize}
			/>
		</div>
	);
};
