import { tvc, useCls } from "@use-pico/cls";
import type { EntitySchema } from "@use-pico/common";
import type { FC, ReactNode } from "react";
import { Action } from "../action/Action";
import { ArrowRightIcon } from "../icon/ArrowRightIcon";
import { CloseIcon } from "../icon/CloseIcon";
import { Icon } from "../icon/Icon";
import { Tx } from "../tx/Tx";
import { TransferCls } from "./TransferCls";

export namespace Transfer {
	export interface Group<TItem extends EntitySchema.Type> {
		id: string;
		group: ReactNode;
		items: readonly TItem[];
	}

	export interface Props<TItem extends EntitySchema.Type>
		extends TransferCls.Props {
		groups: readonly Group<TItem>[];
		render: FC<{
			item: TItem;
		}>;
		value: string[] | undefined | null;
		onChange?(items: string[]): void;
	}
}

export const Transfer = <TItem extends EntitySchema.Type>({
	groups,
	render: Render,
	value,
	onChange,
	cls = TransferCls,
	tweak,
}: Transfer.Props<TItem>) => {
	const itemMap = new Map<
		string,
		TItem & {
			group: ReactNode;
		}
	>();

	groups.forEach((group) => {
		group.items.forEach((item) => {
			itemMap.set(item.id, {
				...item,
				group: group.group,
			});
		});
	});

	const selected =
		value
			?.map((id) => itemMap.get(id))
			.filter(
				(
					item,
				): item is TItem & {
					group: ReactNode;
				} => Boolean(item),
			) ?? [];

	const source = groups.map((group) => {
		return {
			...group,
			items: group.items.filter((item) => {
				return !selected.some((i) => i.id === item.id);
			}),
		};
	});

	const slots = useCls(cls, tweak);

	const withHandleSelect = (group: ReactNode, item: TItem) => () => {
		onChange?.(
			[
				...selected,
				{
					...item,
					group,
				},
			].map((i) => i.id),
		);
	};
	const withHandleDeselect = (item: TItem) => () => {
		onChange?.(
			[
				...selected.filter((i) => i.id !== item.id),
			].map((i) => i.id),
		);
	};

	return (
		<div className={slots.base()}>
			<div className={slots.panel()}>
				{source.reduce((acc, { items }) => {
					return acc + items.length;
				}, 0) === 0 ? (
					<Tx label={"No more items (label)"} />
				) : null}
				{source.map(({ id, group, items }) => {
					if (items.length === 0) {
						return null;
					}

					return (
						<div
							key={`transfer-source-group-${id}`}
							className={slots.group()}
						>
							<div className={slots.header()}>{group}</div>
							{items.map((item) => {
								return (
									<div
										key={`transfer-source-item-${item.id}`}
										className={slots.item()}
										onDoubleClick={withHandleSelect(
											group,
											item,
										)}
									>
										<Render item={item} />
										<Action
											tweak={({ what }) => ({
												slot: {
													base: what.css([
														"invisible",
														"group-hover:visible",
													]),
													action: what.css([
														"transition-none",
													]),
												},
												variant: what.variant({
													tone: "subtle",
												}),
											})}
											iconEnabled={ArrowRightIcon}
											onClick={withHandleSelect(
												group,
												item,
											)}
										/>
									</div>
								);
							})}
						</div>
					);
				})}
			</div>
			<div className={slots.panel()}>
				{selected.length === 0 ? (
					<Tx label={"Select items (label)"} />
				) : null}
				{selected.map((item) => {
					return (
						<div
							key={`transfer-selected-item-${item.id}`}
							className={slots.item()}
							onDoubleClick={withHandleDeselect(item)}
						>
							<div
								className={tvc([
									"flex",
									"flex-row",
									"gap-2",
									"items-center",
								])}
							>
								<div
									className={tvc([
										"font-bold",
									])}
								>
									{item.group}
								</div>
								<Icon icon={ArrowRightIcon} />
								<Render item={item} />
							</div>
							<Action
								tweak={({ what }) => ({
									slot: {
										base: what.css([
											"invisible",
											"group-hover:visible",
										]),
										action: what.css([
											"transition-none",
										]),
									},
									variant: what.variant({
										tone: "subtle",
									}),
								})}
								iconEnabled={CloseIcon}
								onClick={withHandleDeselect(item)}
							/>
						</div>
					);
				})}
			</div>
		</div>
	);
};
