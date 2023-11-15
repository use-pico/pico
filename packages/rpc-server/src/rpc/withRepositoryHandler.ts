import {
    type IContainer,
    withService
}                            from "@use-pico/container";
import {type withDullSchema} from "@use-pico/dull-stuff";
import {
    type CountSchema,
    type IWithMutation,
    type IWithQuery
}                            from "@use-pico/query";
import {withRedisService}    from "@use-pico/redis";
import {type IRepository}    from "@use-pico/repository";
import {type ArraySchema}    from "@use-pico/schema";
import {type IHandler}       from "../api/IHandler";

export namespace withRepositoryHandler {
    export interface Props<
        TSchema extends withDullSchema.Schema<any, any, any, any>,
        TWithRepository extends IRepository<any, TSchema, any>,
        TRepository extends new (...args: any) => TWithRepository,
        TQueryHandler extends IWithQuery<TSchema["query"], ArraySchema<TSchema["entity"]>>,
        TCountHandler extends IWithQuery<TSchema["query"], CountSchema>,
        TMutationHandler extends IWithMutation<TSchema["mutation"], TSchema["entity"]>,
    > {
        container: IContainer.Type;
        withRepository: withService.Service<TWithRepository>;
        repository: TRepository;
        handler: {
            query: TQueryHandler;
            count: TCountHandler;
            mutation: TMutationHandler;
        };
    }
}

export const withRepositoryHandler = <
    TSchema extends withDullSchema.Schema<any, any, any, any>,
    TWithRepository extends IRepository<any, TSchema, any>,
    TRepository extends new (...args: any) => TWithRepository,
    TQueryHandler extends IWithQuery<TSchema["query"], ArraySchema<TSchema["entity"]>>,
    TCountHandler extends IWithQuery<TSchema["query"], CountSchema>,
    TMutationHandler extends IWithMutation<TSchema["mutation"], TSchema["entity"]>,
>(
    {
        container,
        withRepository,
        repository,
        handler: {
                     query,
                     count,
                     mutation,
                 },
    }: withRepositoryHandler.Props<
        TSchema,
        TWithRepository,
        TRepository,
        TQueryHandler,
        TCountHandler,
        TMutationHandler
    >
) => {
    withRepository.bind(container, repository);

    container.useValue<
        IHandler<
            typeof query.schema["request"],
            typeof query.schema["response"]
        >
    >(query.key.join("."), {
        schema: query.schema,
        handle: async ({
                           request,
                           container
                       }) => withRepository.use(container).withQuery.query(request),
    });

    container.useValue<
        IHandler<
            typeof count.schema["request"],
            typeof count.schema["response"]
        >
    >(count.key.join("."), {
        schema: count.schema,
        handle: async ({
                           request,
                           container
                       }) => withRepository.use(container).withQuery.count(request),
    });

    container.useValue<
        IHandler<
            typeof mutation.schema["request"],
            typeof mutation.schema["response"]
        >
    >(mutation.key.join("."), {
        schema: mutation.schema,
        cache:  {
            bypass: true,
        },
        handle: async ({
                           request,
                           container
                       }) => {
            await withRedisService.use(container).clear();
            return withRepository.use(container).withMutation.mutation(request);
        },
    });
};
