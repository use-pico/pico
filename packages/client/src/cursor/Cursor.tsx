import { tvc } from "@use-pico/cls";
import {
	type CountSchema,
	type CursorSchema,
	cursorOf,
	type StateType,
} from "@use-pico/common";
import { type FC, type ReactNode, useMemo } from "react";
import { DotsIcon } from "../icon/DotsIcon";
import { Icon } from "../icon/Icon";
import { Tx } from "../tx/Tx";
import { CursorCls } from "./CursorCls";
import { Pages } from "./Pages";
import { SizeSelect } from "./SizeSelect";

export namespace Cursor {
	export type State = StateType<CursorSchema.Type>;

	export interface Props extends CursorCls.Props {
		state: State;
		count: CountSchema.Type;
		textTotal?: ReactNode;
	}
}

export const Cursor: FC<Cursor.Props> = ({
	state,
	count,
	textTotal = <Tx label={"Number of items"} />,
	tva = CursorCls,
	cls,
}) => {
	const $cursor = useMemo(
		() =>
			cursorOf({
				page: state.value.page,
				total: Math.ceil(count.filter / state.value.size),
				siblings: 1,
				boundary: 1,
			}),
		[
			state.value.page,
			state.value.size,
			count.filter,
		],
	);

	const classes = tva.create(cls);

	return (
		<div className={classes.base}>
			{$cursor.total > 1 ? (
				<div
					className={tvc(
						"flex",
						"items-center",
						"justify-center",
						"gap-2",
						"text-sm",
					)}
				>
					{$cursor.start ? (
						<Pages
							page={state.value.page}
							pages={$cursor.start}
							onPage={(page) =>
								state.set({
									...state.value,
									page,
								})
							}
						/>
					) : null}

					{$cursor.start && $cursor.pages ? (
						<Icon icon={DotsIcon} />
					) : null}

					{$cursor.pages ? (
						<Pages
							page={state.value.page}
							pages={$cursor.pages}
							onPage={(page) =>
								state.set({
									...state.value,
									page,
								})
							}
						/>
					) : null}

					{($cursor.pages && $cursor.end) ||
					($cursor.start && $cursor.end) ? (
						<Icon icon={DotsIcon} />
					) : null}

					{$cursor.end ? (
						<Pages
							page={state.value.page}
							pages={$cursor.end}
							onPage={(page) =>
								state.set({
									...state.value,
									page,
								})
							}
						/>
					) : null}
				</div>
			) : null}
			<div className={classes.sums}>
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
				size={state.value.size}
				onSize={(size) =>
					state.set({
						page: 0,
						size,
					})
				}
			/>
		</div>
	);
};
