"use client";

import {useSearchParams} from "next/navigation";

export const useParam$ = (name: string): string | null => {
    return useSearchParams()?.get(name);
};
