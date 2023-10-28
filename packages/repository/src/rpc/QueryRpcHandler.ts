import {
    type ArraySchema,
    schema
}                             from "@use-pico/schema";
import {type IRepository}     from "../api/IRepository";
import {RepositoryRpcHandler} from "./RepositoryRpcHandler";

export abstract class QueryRpcHandler<
    TRepository extends IRepository<any>,
> extends RepositoryRpcHandler<
    TRepository extends IRepository<infer TSourceSchema> ? TSourceSchema["shape"]["query"] : never,
    TRepository extends IRepository<infer TSourceSchema> ? ArraySchema<TSourceSchema["shape"]["entity"]> : never,
    TRepository
> {
    protected constructor(
        repository: TRepository,
    ) {
        super(
            repository,
            repository.schema.shape.mutation,
            schema(z => z.array(repository.schema.shape.entity)) as any,
        );
    }
}
