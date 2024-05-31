"use client";

import {type localeOf} from "@use-pico/common";
import {useEffect} from "react";
import {useLocaleOf} from "./useLocaleOf";

export namespace useDetectLocale {
	export interface Props {
		locale: localeOf.Props;

		callback(props: localeOf.Props & {
			locale: string
		}): void;
	}
}

export const useDetectLocale = (
	{
		locale,
		callback,
	}: useDetectLocale.Props
) => {
	const $locale = useLocaleOf(locale);
	useEffect(() => {
		callback({
			...locale,
			locale: $locale,
		});
	}, [$locale]);
};
