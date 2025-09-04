import { useCls } from "@use-pico/cls";
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
import { Typo } from "../typo/Typo";
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

	const slots = useCls(tva, cls);

	return (
		<div className={slots.root()}>
			<div className={slots.sums()}>
				{textTotal}
				<Typo label={count.filter} />
				{count.filter !== count.where && (
					<>
						<Typo label={"/"} />
						<Typo
							font={"bold"}
							label={count.where}
						/>
					</>
				)}
			</div>

			{$cursor.total > 1 ? (
				<div className={slots.pages()}>
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
						<Icon
							icon={DotsIcon}
							size={"xs"}
						/>
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
						<Icon
							icon={DotsIcon}
							size={"xs"}
						/>
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
