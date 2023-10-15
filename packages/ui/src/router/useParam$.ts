"use client";

import {useSearchParams} from "next/navigation";

export const useParam$ = (name: string) => {
    return useSearchParams()?.get(name);
};
