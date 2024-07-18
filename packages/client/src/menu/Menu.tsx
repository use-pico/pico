import { Css, cssOf, type ILink } from "@use-pico/common";
import { type FC, type ReactNode } from "react";
import { usePath } from "../router/usePath";
import { MenuClick } from "./MenuClick";
import { MenuGroup } from "./MenuGroup";
import { MenuLabel } from "./MenuLabel";
import { MenuLink } from "./MenuLink";

/**
 * Styled Menu component; it supports various item types and one-level grouping.
 *
 * @group ui
 */
export namespace Menu {
	export interface Label extends Css.Style {
		type: "label";
		label: ReactNode;
		icon?: string;
	}

	export interface Link extends ILink {
		type: "link";
		label?: ReactNode;
		icon?: string;
		catch?: string[];
	}

	export interface Click extends Omit<Label, "type"> {
		type: "click";

		onClick(): void;
	}

	export interface Group {
		type: "group";
		label?: ReactNode;
		icon?: string;
		items: (Label | Link)[];
		catch?: string[];
	}

	export type Item = Link | Group | Label | Click;
	export type Items = (Item | undefined | null | false)[];

	/**
	 * Menu props.
	 */
	export interface Props extends Css.Style {
		/**
		 * Menu items to render.
		 */
		items: Items;
		/**
		 * Explicitly set active items.
		 */
		active?: string[];
	}

	export type PropsEx = Omit<Props, "items">;
}

export const Menu: FC<Menu.Props> = ({ items, active, css }) => {
	const pathname = usePath();
	/**
	 * For whatever reason build does not see a correct type on the filtered array.
	 */
	const $items = items.filter(Boolean) as Menu.Item[];

	return (
		<div className={cssOf("flex flex-row text-md", css)}>
			{/* eslint-disable-next-line array-callback-return */}
			{$items.map((item, index) => {
				switch (item.type) {
					case "link":
						return (
							<MenuLink
								key={`menu-${index}-${item.href}`}
								active={
									active?.includes(item.href) ||
									pathname.includes(item.href) ||
									item.catch?.some((catchHref) => pathname.includes(catchHref))
								}
								{...item}
							/>
						);
					case "group":
						return (
							<MenuGroup
								key={`menu-group-${index}`}
								active={item.catch?.some((catchHref) =>
									pathname.includes(catchHref),
								)}
								{...item}
							/>
						);
					case "label":
						return (
							<MenuLabel
								key={`menu-label-${index}`}
								{...item}
							/>
						);
					case "click":
						return (
							<MenuClick
								key={`menu-label-${index}`}
								{...item}
							/>
						);
				}
			})}
		</div>
	);
};
