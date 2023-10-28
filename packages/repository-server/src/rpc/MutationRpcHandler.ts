import {type IRepository}     from "@use-pico/repository";
import {RepositoryRpcHandler} from "./RepositoryRpcHandler";

export abstract class MutationRpcHandler<
    TRepository extends IRepository<any>,
> extends RepositoryRpcHandler<
    TRepository extends IRepository<infer TSourceSchema> ? TSourceSchema["shape"]["mutation"] : never,
    TRepository extends IRepository<infer TSourceSchema> ? TSourceSchema["shape"]["entity"] : never,
    TRepository
> {
    protected constructor(
        repository: TRepository,
    ) {
        super(
            repository,
            repository.schema.shape.mutation,
            repository.schema.shape.entity
        );
    }
}
