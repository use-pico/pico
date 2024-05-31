"use client";

import {
	type QuerySchema,
	type ResponseSchema,
	WithEntity
}                        from "@use-pico/common";
import {type FC}         from "react";
import {z}               from "zod";
import {useParam}        from "../router/useParam";
import {Loader}          from "../ui/Loader";
import {type IWithQuery} from "./IWithQuery";
import {QueryResult}     from "./QueryResult";
import {useQueryEx}      from "./useQueryEx";

export namespace Fetch {
	export interface Props<
		TQuerySchema extends QuerySchema<any, any>,
		TResponseSchema extends ResponseSchema,
	> {
		/**
		 * Parameter name from "useParam"; optional
		 */
		param?: string;
		/**
		 * Override "useParam" and use provided identity
		 */
		id?: string;
		query?: z.infer<TQuerySchema> | null;
		loader?: FC;
		/**
		 * Query to fetch entity
		 */
		withQuery: IWithQuery<TQuerySchema, z.ZodArray<TResponseSchema>>;

		/**
		 * Error renderer
		 */
		error?: FC<WithErrorProps>;

		/**
		 * Success renderer
		 */
		success?: FC<WithSuccessProps<TResponseSchema>>;
		response?: FC<WithResponseProps<TResponseSchema>>;
		enabled?: boolean;
		options?: IWithQuery.QueryOptions<TResponseSchema>;
	}

	export interface WithErrorProps {
		error: any;
	}

	export interface WithSuccessProps<
		TResponseSchema extends ResponseSchema,
	> extends WithEntity<NonNullable<z.infer<TResponseSchema>>> {
	}

	export interface WithResponseProps<
		TResponseSchema extends ResponseSchema,
	> extends WithEntity.Schema<TResponseSchema> {
	}
}

export const Fetch = <
	TQuerySchema extends QuerySchema<any, any>,
	TResponseSchema extends ResponseSchema,
>(
	{
		param = "id",
		id,
		query,
		loader,
		withQuery,
		error = () => null,
		success:  Success = () => null,
		response: Response = () => null,
		enabled = true,
		options,
	}: Fetch.Props<TQuerySchema, TResponseSchema>
) => {
	const $id = useParam(param, query ? "-" : id);

	const result = useQueryEx({
		withQuery,
		request: query || {
			where: {
				id: $id,
			}
		},
		options: {
			...options,
			enabled,
		},
	});

	return <QueryResult
		result={result}
		loader={loader || Loader}
		error={error}
		success={({entity}) => entity.length > 0 ? <Success
			entity={entity[0]}
		/> : null}
		response={({entity}) => <Response
			entity={entity?.[0]}
		/>}
	/>;
};
