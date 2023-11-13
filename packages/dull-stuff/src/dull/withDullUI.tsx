import {Form}             from "@use-pico/form";
import {type IQueryStore} from "@use-pico/query";
import {
    withCollection,
    withFetch
}                         from "@use-pico/source-ui";
import {type WithEntity}  from "@use-pico/types";
import {Table}            from "@use-pico/ui-extra";
import {withDullRpc}      from "./withDullRpc";
import {withDullSchema}   from "./withDullSchema";

export namespace withDullUI {
    export interface Props<
        TRpc extends withDullRpc.Rpc<withDullSchema.Schema<any, any, any, any>>,
    > {
        rpc: TRpc;
        queryStore: IQueryStore.Store<TRpc["schema"]["query"]>;
    }
}

export const withDullUI = <
    TRpc extends withDullRpc.Rpc<withDullSchema.Schema<any, any, any, any>>,
>(
    {
        rpc,
        queryStore,
    }: withDullUI.Props<TRpc>,
) => {
    return {
        Fetch:        withFetch<TRpc["schema"]["query"], TRpc["schema"]["entity"]>({withQuery: rpc.query}),
        Collection:   withCollection<TRpc["schema"]["query"], TRpc["schema"]["entity"]>({withSourceQuery: rpc.query}),
        MutationForm: (
                          {
                              entity,
                              ...props
                          }: Omit<
                                 Form.Props<
                                     typeof rpc.mutation,
                                     TRpc["schema"]["shape"],
                                     TRpc["mutation"]["schema"]["request"],
                                     TRpc["mutation"]["schema"]["response"]
                                 >,
                                 "withMutation" | "schema"
                             >
                             & WithEntity.Schema.$<TRpc["schema"]["entity"]>,
                      ) => {
            return <Form
                withMutation={rpc.mutation}
                schema={rpc.schema.shape}
                values={entity}
                {...props}
            />;
        },
        Table:        <
                          TColumns extends string,
                      >(
            props: Omit<
                Table.Props<
                    TColumns,
                    TRpc["schema"]["entity"],
                    TRpc["schema"]["query"]
                >,
                "withSourceQuery" | "withQueryStore"
            >
        ) => {
            return <Table
                withSourceQuery={rpc.query}
                withQueryStore={queryStore}
                {...props}
            />;
        },
    };
};
