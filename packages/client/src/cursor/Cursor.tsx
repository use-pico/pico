import type { ReactNode } from "@tanstack/react-router";
import {
    cursorOf,
    type CountSchema,
    type CursorSchema,
} from "@use-pico/common";
import { useMemo, type FC } from "react";
import { DotsIcon } from "../icon/DotsIcon";
import { Icon } from "../icon/Icon";
import { CursorCss } from "./CursorCss";
import { Pages } from "./Pages";
import { SizeSelect } from "./SizeSelect";

export namespace Cursor {
	export type OnPage = Pages.Props["onPage"];
	export type OnSize = SizeSelect.Props["onSize"];

	export interface Props extends CursorCss.Props {
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
	tva = CursorCss,
	css,
}) => {
	const $cursor = useMemo(
		() =>
			cursorOf({
				page: cursor.page,
				total: Math.ceil(count.filter / cursor.size),
				siblings: 2,
				boundaries: 2,
			}),
		[cursor.page, count.filter, cursor.size],
	);

	const tv = tva({ ...variant, css }).slots;

	return (
		<div className={tv.base()}>
			{$cursor.total > 1 ?
				<div className={"flex items-center justify-center gap-2 text-sm"}>
					{["both", "start"].includes($cursor.type) && (
						<>
							<Pages
								page={cursor.page}
								pages={$cursor.start}
								onPage={onPage}
							/>
							<Icon icon={DotsIcon} />
						</>
					)}
					<Pages
						page={cursor.page}
						pages={$cursor.pages}
						onPage={onPage}
					/>
					{["both", "end"].includes($cursor.type) && (
						<>
							<Icon icon={DotsIcon} />
							<Pages
								page={cursor.page}
								pages={$cursor.end}
								onPage={onPage}
							/>
						</>
					)}
				</div>
			:	null}
			<div className={tv.sums()}>
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
