import {
    merge,
    parse,
    type PicoSchema,
    schema
} from "@use-pico/schema";
import {
    describe,
    expect,
    test
} from "vitest";
import {
    FilterSchema,
    OrderSchema,
    type QuerySchema,
    withQuerySchema
} from "../src";

const FooFilterSchema = merge([
    FilterSchema,
    schema(z => z.object({
        something:    z.string$,
        anotherThing: z.string.optional(),
    })),
]);
const FooOrderBySchema = schema(z => z.record(z.enum(["foo", "bar"]), OrderSchema));
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
