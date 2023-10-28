import {type PrismaClient} from "@use-pico/orm";
import {type SourceSchema} from "@use-pico/source";
import {type IRepository}  from "../api/IRepository";

export abstract class AbstractRepository<TSourceSchema extends SourceSchema<any, any, any, any>> implements IRepository<TSourceSchema> {
    protected constructor(
        readonly schema: TSourceSchema,
        readonly prisma: PrismaClient,
    ) {
    }
}
