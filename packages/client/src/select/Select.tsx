import {
    autoUpdate,
    flip,
    FloatingFocusManager,
    FloatingPortal,
    offset,
    size,
    useClick,
    useDismiss,
    useFloating,
    useInteractions,
    useListNavigation,
    useTransitionStyles,
} from "@floating-ui/react";
import { translator, type Entity, type IdentitySchema } from "@use-pico/common";
import { useEffect, useRef, useState, type FC, type ReactNode } from "react";
import { Icon } from "../icon/Icon";
import { SelectCss } from "./SelectCss";

export namespace Select {
	export interface Props<TItem extends IdentitySchema.Type>
		extends SelectCss.Props {
		items: TItem[];
		icon?: string;
		defaultValue?: string;
		value?: string;
		render: FC<Entity.Type<TItem>>;
		text?: {
			select?: ReactNode;
		};
		disabled?: boolean;
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

	export type PropsEx<TItem extends IdentitySchema.Type> = Partial<
		Props<TItem>
	>;
}

/**
 * Simple select using static data (for simple enums).
 */
export const Select = <TItem extends IdentitySchema.Type>({
	items,
	icon,
	defaultValue,
	render: Render,
	text,
	disabled = false,
	onItem,
	onSelect,
	onChange,
	value,
	variant,
	tva = SelectCss,
	css,
}: Select.Props<TItem>) => {
	const { t } = translator.useRich();
	const [isOpen, setIsOpen] = useState(false);
	const [activeIndex, setActiveIndex] = useState<number | null>(null);
	const [selectedIndex, setSelectedIndex] = useState<number | null>(
		items.findIndex((item) => item.id === defaultValue),
	);

	useEffect(() => {
		setSelectedIndex(items.findIndex((item) => item.id === value));
	}, [value]);

	const { refs, floatingStyles, context } = useFloating<HTMLElement>({
		placement: "bottom-start",
		open: isOpen,
		onOpenChange: setIsOpen,
		whileElementsMounted: autoUpdate,
		middleware: [
			offset(5),
			flip({ padding: 10 }),
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

	const click = useClick(context, { event: "mousedown" });
	const dismiss = useDismiss(context);
	const listNav = useListNavigation(context, {
		listRef,
		activeIndex,
		selectedIndex,
		onNavigate: setActiveIndex,
		loop: true,
	});

	const { getReferenceProps, getFloatingProps, getItemProps } = useInteractions(
		[dismiss, listNav, click],
	);
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

	const tv = tva({ disabled, ...variant, css }).slots;

	return (
		<>
			<div
				tabIndex={disabled ? -1 : 0}
				ref={disabled ? undefined : refs.setReference}
				aria-labelledby={"select-label"}
				aria-autocomplete={"none"}
				{...(disabled ? {} : getReferenceProps())}
				className={tv.base()}
			>
				<div className={tv.input()}>
					{icon ?
						<Icon
							icon={icon}
							variant={{
								size: "xl",
							}}
							css={{
								base: ["text-slate-400", "group-hover:text-slate-600"],
							}}
						/>
					:	null}
					{item ?
						<Render entity={item} />
					:	text?.select || t("Select item")}
					<Icon
						icon={"icon-[gg--select]"}
						variant={{ size: "xl" }}
						css={{
							base: [
								!isOpen && "text-slate-400",
								isOpen && "text-slate-600",
								"group-hover:text-slate-600",
							],
						}}
					/>
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
							className={tv.popup()}
							{...getFloatingProps()}
						>
							{items.map((value, i) => (
								<div
									key={value.id}
									ref={(node) => {
										listRef.current[i] = node;
									}}
									role={"option"}
									tabIndex={i === activeIndex ? 0 : -1}
									aria-selected={i === selectedIndex && i === activeIndex}
									className={tv.item({
										selected: i === selectedIndex,
										active: i === activeIndex,
									})}
									{...getItemProps({
										onClick() {
											handleSelect(i);
										},
										onKeyDown(event) {
											if (event.key === "Enter") {
												event.preventDefault();
												handleSelect(i);
											}

											if (event.key === " " && !isTypingRef.current) {
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
											variant={{ size: "xl" }}
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
