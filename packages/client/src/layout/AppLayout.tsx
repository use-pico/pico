import { cssOf } from "@use-pico/common";
import { type FC, type PropsWithChildren, type ReactNode } from "react";
import { Toaster } from "sonner";
import { LocaleLink } from "../i18n/LocaleLink";
import { Footer } from "../ui/Footer";

export namespace AppLayout {
	export type Props = PropsWithChildren<{
		logo: any;
		homeUrl?: string;
		center?: ReactNode;
		right?: ReactNode;
	}>;
}

export const AppLayout: FC<AppLayout.Props> = ({
	logo,
	homeUrl = "/root",
	center,
	right,
	children,
}) => {
	return (
		<div>
			<Toaster
				position={"top-center"}
				closeButton
				richColors
			/>
			<div
				className={cssOf(
					"flex flex-row items-center",
					"bg-slate-50 shadow-sm border-b border-b-slate-200",
					"w-full",
					"gap-4",
					"p-4",
				)}
			>
				<div>
					<LocaleLink href={homeUrl}>
						<img
							alt={"logo"}
							className={"h-6"}
							src={logo}
						/>
					</LocaleLink>
				</div>
				<div className={cssOf("flex-grow")}>{center}</div>
				<div>{right}</div>
			</div>
			<div
				className={cssOf(
					"min-h-screen",
					"border-b border-b-slate-200",
					"mb-4",
					"p-2",
				)}
			>
				{children}
			</div>
			<Footer />
		</div>
	);
};
