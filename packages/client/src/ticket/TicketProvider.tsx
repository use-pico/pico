"use client";

import type {TicketSchema} from "@use-pico/common";
import {
	type FC,
	type PropsWithChildren,
	useEffect,
	useState
}                          from "react";
import {z}                 from "zod";
import {IWithQuery}        from "../query/IWithQuery";
import {QueryResult}       from "../query/QueryResult";
import {useQuery}          from "../query/useQuery";
import {BlockOverlay}      from "../ui/BlockOverlay";
import {TicketStore}       from "./TicketStore";

export namespace TicketProvider {
	/**
	 * Props for `TicketProvider`.
	 */
	export interface Props extends PropsWithChildren {
		/**
		 * Query to fetch ticket.
		 */
		withQuery: IWithQuery<
			z.ZodOptional<z.ZodNullable<z.ZodAny>>,
			z.ZodOptional<z.ZodNullable<TicketSchema>>
		>;
		/**
		 * Interval to refetch ticket.
		 */
		interval?: number;
		/**
		 * Render, when there is no ticket.
		 */
		empty?: FC;
	}
}

/**
 * Uses query to fetch ticket and provides it to children.
 *
 * @category ticket
 */
export const TicketProvider: FC<TicketProvider.Props> = (
	{
		withQuery,
		interval = 5000,
		empty: Empty = () => "no user id",
		children,
	}
) => {
	const [enabled, setEnabled] = useState(false);
	const result = useQuery({
		withQuery,
		refetchInterval: interval,
		staleTime:       0,
		enabled,
	});

	useEffect(() => {
		/**
		 * Force ticket refresh
		 */
		result.refetch();
		setTimeout(() => {
			/**
			 * Now it's possible to enable the query to prevent early check & empty response.
			 *
			 * Delay is here to keep UI somehow "fluent", so user can notice what's happening.
			 */
			setEnabled(true);
		}, 500);
	}, []);

	return !enabled ? <BlockOverlay/> : <QueryResult<TicketSchema>
		result={result}
		loader={BlockOverlay}
		success={({entity}) => <TicketStore.Provider
			values={entity}
		>
			{children}
		</TicketStore.Provider>}
		// The condition here is redundat, because WithSuccess takes precedence over WithResponse; it's called only when a result is nullish.
		response={({entity}) => entity ? children : <Empty/>}
	/>;
};
