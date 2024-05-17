import {cn}         from "@use-pico2/common";
import Image        from "next/image";
import {
    type ComponentProps,
    type FC,
    type PropsWithChildren,
    type ReactNode
}                   from "react";
import {LocaleLink} from "../i18n/LocaleLink";
import {Footer}     from "../ui/Footer";
import {Unblock}    from "../ui/Unblock";

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
        <Unblock/>
        <div
            className={cn(
                "p-4",
            )}
        >
            <div
                className={cn(
                    "flex flex-row items-center",
                    "w-full",
                    "gap-4",
                    "mb-4",
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
            <hr className={"mb-2 h-0.5 border-t-0 bg-slate-300 opacity-30"}/>
            <div className={"min-h-screen"}>
                {children}
            </div>
            <hr className={"mb-2 h-0.5 border-t-0 bg-slate-300 opacity-30"}/>
            <Footer/>
        </div>
    </>;
};
