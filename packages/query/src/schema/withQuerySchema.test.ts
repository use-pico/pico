import {
    merge,
    parse,
    type PicoSchema,
    withEnum,
    withNullish,
    withObject,
    withOptional,
    withRecord,
    withString
}                         from "@use-pico/schema";
import {
    describe,
    expect,
    test
}                         from "vitest";
import {FilterSchema}     from "./FilterSchema";
import {OrderSchema}      from "./OrderSchema";
import {type QuerySchema} from "./QuerySchema";
import {withQuerySchema}  from "./withQuerySchema";

const FooFilterSchema = merge([
    FilterSchema,
    withObject({
        something:    withNullish(withString()),
        anotherThing: withOptional(withString()),
    }),
]);
const FooOrderBySchema = withRecord(withEnum(["foo", "bar"]), OrderSchema);
const FooQuerySchema = withQuerySchema({
    filter:  FooFilterSchema,
    orderBy: FooOrderBySchema,
});
type FooQuerySchema = PicoSchema.Output<typeof FooQuerySchema>;

interface typeCheckGeneric<
    TFilterSchema extends FilterSchema,
    TQuerySchema extends QuerySchema<TFilterSchema, any> = QuerySchema<TFilterSchema, any>
> {
    query(query: PicoSchema.Output<TQuerySchema>): null;
}

function typeCheckGeneric<
    TFilterSchema extends FilterSchema,
>(
    {
        query,
    }: typeCheckGeneric<TFilterSchema>
) {
    query({});
}

describe("withQuerySchema", () => {
    test("Schema typehint and parse", () => {
        const shape: FooQuerySchema = {
            where:   {
                anotherThing: "123",
            },
            orderBy: {
                "foo": "asc",
            }
        };
        const typeCheck: PicoSchema.Output<QuerySchema<FilterSchema, any>> = shape;

        typeCheckGeneric({
            query: () => null,
        });

        expect(parse(FooQuerySchema, shape)).toEqual(typeCheck);
    });
});
