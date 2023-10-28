import {CountSchema}          from "@use-pico/query";
import {type IRepository}     from "@use-pico/repository";
import {RepositoryRpcHandler} from "./RepositoryRpcHandler";

export abstract class CountRpcHandler<
    TRepository extends IRepository<any>,
> extends RepositoryRpcHandler<
    TRepository extends IRepository<infer TSourceSchema> ? TSourceSchema["shape"]["query"] : never,
    CountSchema,
    TRepository
> {
    static $responseSchema = CountSchema;

    protected constructor(
        repository: TRepository,
    ) {
        super(
            repository,
            repository.schema.shape.mutation,
            CountSchema
        );
    }
}
