import {type PrismaClient} from "@use-pico/orm";
import {type IRepository}  from "@use-pico/repository";
import {type SourceSchema} from "@use-pico/source";

export abstract class AbstractRepository<TSourceSchema extends SourceSchema<any, any, any, any>> implements IRepository<TSourceSchema> {
    protected constructor(
        readonly schema: TSourceSchema,
        readonly prisma: PrismaClient,
    ) {
    }
}
