import {
	Css,
	cssOf
}                    from "@use-pico/common";
import type {
	FC,
	PropsWithChildren,
	ReactNode
}                    from "react";
import {Breadcrumbs} from "../breadcrumb/Breadcrumbs";
import {Icon}        from "./Icon";
import {Unblock}     from "./Unblock";

export namespace Page {
	export interface Props extends PropsWithChildren, Css.Style {
		/**
		 * Customize texts used in a page itself.
		 */
		text?: {
			/**
			 * Page title (tab).
			 */
			title?: string;
			/**
			 * Page header (shown at the top of the page).
			 */
			header?: ReactNode;
		};
		icon?: string;
		breadcrumbs?: Breadcrumbs.Props;
		/**
		 * Page subheader (shown below the header and above the content).
		 */
		sub?: ReactNode;
		right?: ReactNode;
	}
}

export const Page: FC<Page.Props> = (
	{
		text,
		icon,
		breadcrumbs,
		sub,
		right,
		children,
		css,
	}) => {
	return <div
		className={cssOf(
			css,
		)}
	>
		<Unblock/>
		{breadcrumbs || icon || text?.header || right ? <div
			className={cssOf(
				"mb-2",
			)}
		>
			<div
				className={cssOf(
					"flex flex-row items-center justify-between gap-1",
					"text-slate-600 min-h-10",
				)}
			>
				<div
					className={cssOf(
						"flex items-center gap-2",
					)}
				>
					{breadcrumbs && <div
						className={cssOf(
							"flex",
						)}
					>
						<Breadcrumbs
							prefix
							{...breadcrumbs}
						/>
					</div>}
					{icon ? <Icon
						icon={icon}
						size={"xl"}
					/> : null}
					<span
						className={cssOf(
							"text-lg font-semibold",
						)}
					>
						{text?.header}
					</span>
				</div>
				{right}
			</div>
		</div> : null}
		<div>
			{sub}
		</div>
		{children}
	</div>;
};
