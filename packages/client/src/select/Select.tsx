import {
	autoUpdate,
	FloatingFocusManager,
	FloatingPortal,
	flip,
	offset,
	size,
	useClick,
	useDismiss,
	useFloating,
	useInteractions,
	useListNavigation,
	useTransitionStyles,
} from "@floating-ui/react";
import { type Entity, type EntitySchema, translator } from "@use-pico/common";
import { type FC, type ReactNode, useEffect, useRef, useState } from "react";
import { Action } from "../action/Action";
import { CloseIcon } from "../icon/CloseIcon";
import { Icon } from "../icon/Icon";
import { SelectCls } from "./SelectCls";

export namespace Select {
	export interface Props<TItem extends EntitySchema.Type>
		extends SelectCls.Props {
		items: TItem[];
		icon?: string;
		defaultValue?: string;
		value?: string | null;
		render: FC<Entity.Type<TItem>>;
		textSelect?: ReactNode;
		disabled?: boolean;
		allowClear?: boolean;
		/**
		 * Called only when an item is actually selected
		 */
		onItem?(item: TItem): void;
		/**
		 * Called, when anything is selected, including "unselecting" an item.
		 */
		onSelect?(item?: TItem): void;
		/**
		 * Called with an ID only.
		 */
		onChange?(e: any): void;
	}

	export type PropsEx<TItem extends EntitySchema.Type> = Partial<
		Props<TItem>
	>;
}

/**
 * Simple select using static data (for simple enums).
 */
export const Select = <TItem extends EntitySchema.Type>({
	items,
	icon,
	defaultValue,
	render: Render,
	textSelect,
	disabled = false,
	allowClear = false,
	onItem,
	onSelect,
	onChange,
	value,
	tva = SelectCls,
	cls,
}: Select.Props<TItem>) => {
	const [isOpen, setIsOpen] = useState(false);
	const [activeIndex, setActiveIndex] = useState<number | null>(null);
	const [selectedIndex, setSelectedIndex] = useState<number | null>(
		items.findIndex((item) => item.id === defaultValue),
	);

	useEffect(() => {
		setSelectedIndex(items.findIndex((item) => item.id === value));
	}, [
		items,
		value,
	]);

	const { refs, floatingStyles, context } = useFloating<HTMLElement>({
		placement: "bottom-start",
		open: isOpen,
		onOpenChange: setIsOpen,
		whileElementsMounted: autoUpdate,
		middleware: [
			offset(5),
			flip({
				padding: 10,
			}),
			size({
				apply({ rects, elements, availableHeight }) {
					Object.assign(elements.floating.style, {
						maxHeight: `${availableHeight}px`,
						minWidth: `${rects.reference.width}px`,
					});
				},
				padding: 10,
			}),
		],
	});

	const listRef = useRef<(HTMLElement | null)[]>([]);
	const isTypingRef = useRef(false);

	const click = useClick(context, {
		event: "mousedown",
	});
	const dismiss = useDismiss(context);
	const listNav = useListNavigation(context, {
		listRef,
		activeIndex,
		selectedIndex,
		onNavigate: setActiveIndex,
		loop: true,
	});

	const { getReferenceProps, getFloatingProps, getItemProps } =
		useInteractions([
			dismiss,
			listNav,
			click,
		]);
	const { isMounted, styles } = useTransitionStyles(context);

	const handleSelect = (index: number) => {
		setSelectedIndex(index);
		setIsOpen(false);
		const item = items[index];
		if (item) {
			onItem?.(item);
		}
		onSelect?.(item);
		onChange?.(item?.id);
	};

	const item = selectedIndex === null ? undefined : items[selectedIndex];

	const classes = tva.create(cls, {
		variant: {
			disabled,
		},
	});

	return (
		<>
			<div
				tabIndex={disabled ? -1 : 0}
				ref={disabled ? undefined : refs.setReference}
				{...(disabled ? {} : getReferenceProps())}
				className={classes.base}
			>
				<div className={classes.input}>
					{icon ? (
						<Icon
							icon={icon}
							cls={{
								variant: {
									size: "xl",
								},
								slot: {
									base: {
										class: [
											"text-slate-400",
											"group-hover:text-slate-600",
										],
									},
								},
							}}
						/>
					) : null}
					{item ? (
						<Render entity={item} />
					) : (
						textSelect || translator.rich("Select item")
					)}
					<div className={"flex flex-row gap-2 items-center"}>
						{allowClear ? (
							<Action
								iconEnabled={CloseIcon}
								onClick={(e) => {
									e.stopPropagation();
									e.preventDefault();
									handleSelect(-1);
								}}
								onMouseDown={(e) => {
									e.stopPropagation();
									e.preventDefault();
								}}
								cls={{
									variant: {
										borderless: true,
										variant: "light",
									},
								}}
							/>
						) : null}
						<Icon
							icon={"icon-[gg--select]"}
							cls={{
								variant: {
									size: "xl",
								},
								slot: {
									base: {
										class: [
											!isOpen && "text-slate-400",
											isOpen && "text-slate-600",
											"group-hover:text-slate-600",
										].filter(Boolean),
									},
								},
							}}
						/>
					</div>
				</div>
			</div>
			{isMounted && (
				<FloatingPortal>
					<FloatingFocusManager
						context={context}
						modal={false}
					>
						<div
							ref={refs.setFloating}
							style={{
								...floatingStyles,
								...styles,
							}}
							className={classes.popup}
							{...getFloatingProps()}
						>
							{items.map((value, i) => (
								<div
									key={value.id}
									ref={(node) => {
										listRef.current[i] = node;
									}}
									tabIndex={i === activeIndex ? 0 : -1}
									className={
										tva.create(undefined, {
											variant: {
												selected: i === selectedIndex,
												active: i === activeIndex,
											},
										}).item
									}
									{...getItemProps({
										onClick() {
											handleSelect(i);
										},
										onKeyDown(event) {
											if (event.key === "Enter") {
												event.preventDefault();
												handleSelect(i);
											}

											if (
												event.key === " " &&
												!isTypingRef.current
											) {
												event.preventDefault();
												handleSelect(i);
											}
										},
									})}
								>
									<Render entity={value} />
									{i === selectedIndex && (
										<Icon
											icon={"icon-[basil--check-outline]"}
											cls={{
												variant: {
													size: "xl",
												},
											}}
										/>
									)}
								</div>
							))}
						</div>
					</FloatingFocusManager>
				</FloatingPortal>
			)}
		</>
	);
};
