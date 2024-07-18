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
import {
	cssOf,
	WithEntity,
	type Css,
	type WithIdentitySchema,
} from "@use-pico/common";
import { useEffect, useRef, useState, type FC, type ReactNode } from "react";
import { z } from "zod";
import { t } from "../../i18n/t";
import { Icon } from "../../ui/Icon";

export namespace Select {
	export interface Props<TItemSchema extends WithIdentitySchema>
		extends Css<"root" | "item"> {
		items: z.infer<TItemSchema>[];
		icon?: string;
		defaultValue?: string;
		value?: string;
		render: FC<WithEntity.Schema<TItemSchema>>;
		text?: {
			select?: ReactNode;
		};
		disabled?: boolean;

		onItem?(item: z.infer<TItemSchema>): void;

		onSelect?(item?: z.infer<TItemSchema>): void;
	}

	export type PropsEx<TItemSchema extends WithIdentitySchema> = Partial<
		Props<TItemSchema>
	>;
}

/**
 * Simple select using static data (for simple enums).
 */
export const Select = <TItemSchema extends WithIdentitySchema>({
	items,
	icon,
	defaultValue,
	render,
	text,
	disabled = false,
	onItem,
	onSelect,
	value,
	css,
}: Select.Props<TItemSchema>) => {
	const Render = render;
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
	};

	const item = selectedIndex === null ? undefined : items[selectedIndex];

	return (
		<>
			<div
				tabIndex={disabled ? -1 : 0}
				ref={disabled ? undefined : refs.setReference}
				aria-labelledby={"select-label"}
				aria-autocomplete={"none"}
				{...(disabled ? {} : getReferenceProps())}
				className={cssOf(
					"cursor-pointer",
					"bg-slate-50 text-slate-900 text-sm border border-slate-300 rounded focus:border-sky-400 focus:outline-none p-2.5",
					"hover:shadow-md transition-all",
					"group",
					disabled &&
						"cursor-not-allowed hover:shadow-none focus:border-slate-300 opacity-50",
					css?.root,
				)}
			>
				<div
					className={cssOf("flex flex-row items-center justify-between gap-2")}
				>
					{icon ?
						<Icon
							icon={icon}
							size={"xl"}
							css={["text-slate-400 group-hover:text-slate-600"]}
						/>
					:	null}
					{item ?
						<Render entity={item} />
					:	text?.select || t()`Select item`}
					<Icon
						icon={"icon-[gg--select]"}
						size={"xl"}
						css={[
							!isOpen && "text-slate-400",
							isOpen && "text-slate-600",
							"group-hover:text-slate-600",
						]}
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
							className={cssOf(
								"cursor-pointer focus:outline-none",
								"bg-white border border-slate-300 rounded shadow-lg",
								"overflow-y-auto",
								"z-50",
							)}
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
									className={cssOf(
										"focus:outline-none",
										"py-2 px-2.5",
										"flex items-center justify-between",
										i === selectedIndex && "bg-slate-100",
										i === activeIndex && "bg-slate-200",
										css?.item,
									)}
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
											size={"xl"}
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
