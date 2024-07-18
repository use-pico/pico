import {
	type FC,
	type PropsWithChildren
} from "react";
import { StoreProvider } from "../store/StoreProvider";
import { InlineStore } from "./InlineStore";

export namespace InlineProvider {
	export interface Props extends PropsWithChildren {
		inline: boolean;
	}
}

export const InlineProvider: FC<InlineProvider.Props> = (
	{
		inline,
		...props
	}
) => {
	return <StoreProvider
		store={InlineStore}
		values={{inline}}
		{...props}
	/>;
};
