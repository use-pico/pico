"use client";

import {type FC, type PropsWithChildren} from "react";
import {StoreProvider} from "../store/StoreProvider";
import {BlockStore} from "./BlockStore";

export namespace BlockProvider {
	export type Props = PropsWithChildren<{
		isBlock?: boolean;
	}>
}

export const BlockProvider: FC<BlockProvider.Props> = (
	{
		isBlock = false,
		...props
	}) => {
	return <StoreProvider
		store={BlockStore}
		values={{isBlock}}
		{...props}
	/>;
};
