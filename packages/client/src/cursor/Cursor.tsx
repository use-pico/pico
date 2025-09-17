import { useCls, withCls } from "@use-pico/cls";
import {
	type CountSchema,
	type CursorSchema,
	cursorOf,
	type StateType,
} from "@use-pico/common";
import { type FC, type Ref, useMemo } from "react";
import { Badge } from "../badge/Badge";
import { DotsIcon } from "../icon/DotsIcon";
import { Icon } from "../icon/Icon";
import { Typo } from "../typo/Typo";
import { CursorCls } from "./CursorCls";
import { Pages } from "./Pages";
import { SizeSelect } from "./SizeSelect";

export namespace Cursor {
	export type State = StateType<CursorSchema.Type>;

	export interface Props extends CursorCls.Props {
		ref?: Ref<HTMLDivElement>;
		state: State;
		count: CountSchema.Type;
	}
}

export const BaseCursor: FC<Cursor.Props> = ({
	ref,
	state,
	count,
	cls = CursorCls,
	tweak,
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

	const slots = useCls(cls, tweak);

	return (
		<div
			data-ui="Cursor-root"
			ref={ref}
			className={slots.root()}
		>
			<Badge
				size={"sm"}
				tone={count.filter === count.where ? "neutral" : "primary"}
			>
				<Typo
					label={count.filter}
					size={"sm"}
				/>
				{count.filter !== count.where && (
					<>
						<Typo label={"/"} />
						<Typo
							font={"bold"}
							size={"sm"}
							label={count.where}
						/>
					</>
				)}
			</Badge>

			{$cursor.total > 1 ? (
				<div
					data-ui="Cursor-pages"
					className={slots.pages()}
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

					{$cursor.start && $cursor.pages && state.value.page >= 3 ? (
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

					{state.value.page < $cursor.total - 3 &&
					(($cursor.pages && $cursor.end) ||
						($cursor.start && $cursor.end)) ? (
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

export const Cursor = withCls(BaseCursor, CursorCls);
