"use client";

import type {FC, PropsWithChildren} from "react";
import {StoreProvider} from "../store/StoreProvider";
import {DateTimeStore} from "./DateTimeStore";

export namespace DateTimeProvider {
	export type Props = PropsWithChildren<{
		locale: string;
	}>;
}

export const DateTimeProvider: FC<DateTimeProvider.Props> = (
	{
		locale,
		children
	}) => {
	return <StoreProvider
		store={DateTimeStore}
		values={{
			locale,
		}}
	>
		{children}
	</StoreProvider>;
};
