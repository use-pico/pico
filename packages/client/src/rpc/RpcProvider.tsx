import { useRef, type FC, type PropsWithChildren } from "react";
import { StoreProvider } from "../store/StoreProvider";
import { RpcStore } from "./RpcStore";

export namespace RpcProvider {
	export type Props = PropsWithChildren<{
		url?: string;
	}>;
}

export const RpcProvider: FC<RpcProvider.Props> = ({
	url = import.meta.env.VITE_RPC || "/api/rpc",
	...props
}) => {
	return (
		<StoreProvider
			store={RpcStore}
			values={{
				bulkTimerRef: useRef<NodeJS.Timeout>(),
				timeoutRef: useRef<NodeJS.Timeout>(),
				bulkRef: useRef(new Map()),
				url,
			}}
			{...props}
		/>
	);
};
