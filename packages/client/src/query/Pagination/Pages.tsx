import {cn}      from "@use-pico2/common";
import {type FC} from "react";

export namespace Pages {
    export interface Props {
        pages: number[];
        page: number;

        onPage(page: number): void;
    }
}

export const Pages: FC<Pages.Props> = (
    {
        pages,
        page,
        onPage,
    }
) => {
    return <nav
        className={cn(
            "select-none",
        )}
    >
        <ul
            className={cn(
                "flex items-center -space-x-px text-xs",
            )}
        >
            {pages.map((current, index) => {
                return <li
                    key={`page-${current}-${index}`}
                    className={cn(
                        "flex items-center justify-center w-12 px-2 py-1",
                        "border border-slate-200",
                        "hover:bg-blue-100",
                        "cursor-pointer",
                        "transition-colors",
                        "duration-200",
                        {
                            "bg-blue-500 hover:bg-blue-500 text-white font-bold": page === (current - 1),
                        },
                    )}
                    onClick={() => onPage(current - 1)}
                >
                    {current}
                </li>;
            })}
        </ul>
    </nav>;
};
