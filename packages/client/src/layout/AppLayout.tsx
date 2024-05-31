import {cn}         from "@use-pico/common";
import Image        from "next/image";
import {
	type ComponentProps,
	type FC,
	type PropsWithChildren,
	type ReactNode
}                   from "react";
import {LocaleLink} from "../i18n/LocaleLink";
import {Footer}     from "../ui/Footer";

export namespace AppLayout {
	export type Props = PropsWithChildren<{
		logo: ComponentProps<typeof Image>["src"];
		homeUrl?: string;
		center?: ReactNode;
		right?: ReactNode;
	}>;
}

export const AppLayout: FC<AppLayout.Props> = (
	{
		logo,
		homeUrl = "/root",
		center,
		right,
		children,
	}
) => {
	return <>
		<div
			className={cn(
			)}
		>
			<div
				className={cn(
					"flex flex-row items-center",
					"bg-slate-50 shadow-sm border-b border-b-slate-200",
					"w-full",
					"gap-4",
					"p-4",
				)}
			>
				<div>
					<LocaleLink
						href={homeUrl}
						style={{
							display: "block",
						}}
					>
						<Image
							priority={true}
							height={32}
							alt={"logo"}
							src={logo}
						/>
					</LocaleLink>
				</div>
				<div
					className={cn(
						"flex-grow",
					)}
				>
					{center}
				</div>
				<div>
					{right}
				</div>
			</div>
			<div
				className={cn(
					"min-h-screen",
					"border-b border-b-slate-200",
					"mb-4",
					"p-2",
				)}
			>
				{children}
			</div>
			<Footer/>
		</div>
	</>;
};
