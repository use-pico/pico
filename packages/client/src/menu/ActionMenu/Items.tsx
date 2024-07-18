import { cssOf } from "@use-pico/common";
import { type FC } from "react";
import { LinkTo } from "../../i18n/LinkTo";
import { LoaderIcon } from "../../icon/LoaderIcon";
import { Icon } from "../../ui/Icon";
import { Modal } from "../../ui/Modal";
import { ActionMenu } from "../ActionMenu";

export namespace Items {
	export type Props = Pick<ActionMenu.Props, "items">;
}

export const Items: FC<Items.Props> = ({ items }) => {
	const css = [
		"transition-all",
		"flex items-center px-3 py-2 rounded cursor-pointer hover:bg-slate-100 gap-2",
		"text-slate-500 hover:text-slate-700",
		"text-sm",
	];
	return (
		<div
			className={cssOf("p-1 bg-white rounded shadow-lg", "flex flex-col gap-1")}
		>
			{items.map((item) => {
				if (item.type === "click") {
					return (
						<div
							key={item.id}
							className={cssOf(
								css,
								item.disabled &&
									"cursor-not-allowed opacity-50 hover:bg-slate-100",
							)}
							onClick={item.disabled ? undefined : item.onClick}
						>
							{item.icon && (
								<Icon
									icon={item.loading ? LoaderIcon : item.icon}
									size={"xl"}
								/>
							)}
							{item.label}
						</div>
					);
				} else if (item.type === "href") {
					return (
						<div
							key={item.id}
							className={cssOf(
								css,
								item.disabled &&
									"cursor-not-allowed opacity-50 hover:bg-slate-100",
							)}
						>
							{item.icon && (
								<Icon
									icon={item.loading ? LoaderIcon : item.icon}
									size={"xl"}
								/>
							)}
							<LinkTo
								href={item.href}
								label={item.label}
								disabled={item.disabled}
							/>
						</div>
					);
				} else if (item.type === "modal") {
					const Content = item.content;
					return (
						<Modal
							key={item.id}
							disabled={item.disabled}
							target={
								<div
									key={item.id}
									className={cssOf(
										css,
										item.disabled &&
											"cursor-not-allowed opacity-50 hover:bg-slate-100",
									)}
								>
									{item.icon && (
										<Icon
											icon={item.loading ? LoaderIcon : item.icon}
											size={"xl"}
										/>
									)}
									{item.label}
								</div>
							}
							icon={item.icon}
							title={item.title}
							css={{
								root: item.css,
							}}
						>
							<Content />
						</Modal>
					);
				}
				return null;
			})}
		</div>
	);
};
