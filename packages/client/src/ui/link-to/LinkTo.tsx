import { createLink, type LinkComponent } from "@tanstack/react-router";
import type { ComponentProps, FC } from "react";
import { Icon } from "../../icon/Icon";
import { uiLinkTo } from "./uiLinkTo";

interface BaseLinkToProps extends uiLinkTo.Component<ComponentProps<"a">> {
	/**
	 * Icon to display in the link.
	 */
	icon?: Icon.Type;
	/**
	 * Additional props to pass to the icon component.
	 */
	iconProps?: Icon.PropsEx;
	/**
	 * Position of the icon relative to the content.
	 * @default "left"
	 */
	iconPosition?: "left" | "right";
}

const BaseLinkTo: FC<BaseLinkToProps> = ({
	icon,
	iconProps,
	iconPosition = "left",
	children,
	ui,
	className,
	...props
}) => {
	return (
		<a
			data-root={"LinkTo"}
			{...uiLinkTo({
				ui,
				className,
			})}
			{...props}
		>
			{iconPosition === "left" && (
				<Icon
					data-ui="LinkTo-[Icon.left]"
					icon={icon}
					{...iconProps}
				/>
			)}

			{children}

			{iconPosition === "right" && (
				<Icon
					data-ui="LinkTo-[Icon.right]"
					icon={icon}
					{...iconProps}
				/>
			)}
		</a>
	);
};

const CreateLinkTo = createLink(BaseLinkTo);

export namespace LinkTo {
	export type Props = ComponentProps<typeof LinkTo>;
}

export const LinkTo: LinkComponent<typeof BaseLinkTo> = (props) => {
	return <CreateLinkTo {...props} />;
};
