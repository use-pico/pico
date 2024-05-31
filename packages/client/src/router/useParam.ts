"use client";

import {useSearchParams} from "next/navigation";

/**
 * Simple wrapper around Next router to extract params from route.
 *
 * If override is provided, this value is returned instead
 */
export const useParam = (name: string, override?: string) => {
	const param = useSearchParams()?.get(name);
	if (override) {
		return override;
	}
	if (!param) {
		throw new Error(`Parameter [${name}] is not present in query path :(.`);
	}
	return param;
};
