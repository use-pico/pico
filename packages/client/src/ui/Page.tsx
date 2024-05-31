import {cn}          from "@use-pico/common";
import type {
	FC,
	PropsWithChildren,
	ReactNode
}                    from "react";
import {Breadcrumbs} from "../breadcrumb/Breadcrumbs";
import {Icon}        from "./Icon";
import {Unblock}     from "./Unblock";

export namespace Page {
	export type Props = PropsWithChildren<
		{
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
		} & cn.WithClass
	>;
}

export const Page: FC<Page.Props> = (
	{
		text,
		icon,
		breadcrumbs,
		sub,
		right,
		children,
		cx,
	}) => {
	return <div
		className={cn(
			cx,
		)}
	>
		<Unblock/>
		{breadcrumbs || icon || text?.header || right ? <div
			className={cn(
				"mb-2",
			)}
		>
			<div
				className={cn(
					"flex flex-row items-center justify-between gap-1",
					"text-slate-600 min-h-10",
				)}
			>
				<div
					className={cn(
						"flex items-center gap-2",
					)}
				>
					{breadcrumbs && <div
						className={cn(
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
						className={cn(
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
