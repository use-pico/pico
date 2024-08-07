import { FloatingTree } from "@floating-ui/react";
import { Css, type IHrefProps } from "@use-pico/common";
import { type FC, type ReactNode } from "react";
import { ActionMenuIcon } from "../icon/ActionMenuIcon";
import { Float } from "../ui/Float";
import { Icon } from "../ui/Icon";
import { Items } from "./ActionMenu/Items";

export namespace ActionMenu {
	export interface Action {
		type: string;
		id: string;
		icon?: string;
		label: ReactNode;
		loading?: boolean;
		disabled?: boolean;
	}

	export interface Click extends Action {
		type: "click";

		onClick(): void;
	}

	export interface Href extends Action {
		type: "href";
		href: IHrefProps;
	}

	export interface Modal extends Action, Css.Style {
		type: "modal";
		title?: ReactNode;
		content: FC;
	}

	export type Item = Click | Href | Modal;

	export interface Props extends Omit<Float.Props, "target"> {
		icon?: string;
		items: Item[];
	}

	export type PropsEx = Omit<Props, "icon" | "items">;
}

export const ActionMenu: FC<ActionMenu.Props> = ({
	icon = ActionMenuIcon,
	items,
	...props
}) => {
	return (
		<FloatingTree>
			<Float
				action={"click"}
				target={
					<Icon
						icon={icon}
						size={"xl"}
					/>
				}
				delay={100}
				float={{
					placement: "bottom-start",
				}}
				closeOnClick
				{...props}
			>
				<Items items={items} />
			</Float>
		</FloatingTree>
	);
};
