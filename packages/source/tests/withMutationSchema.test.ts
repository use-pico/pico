import {
    FilterSchema,
    OrderSchema,
    type QuerySchema,
    withQuerySchema
} from "@use-pico/query";
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
    type MutationSchema,
    withMutationSchema
} from "../src";

const FooShapeSchema = schema(z => z.object({
    foo: z.string(),
}));
const FooFilterSchema = merge([
    FilterSchema,
    schema(z => z.object({
        something:    z.string().nullish(),
        anotherThing: z.string().optional(),
    })),
]);
const FooOrderBySchema = schema(z => z.record(z.enum(["foo", "bar"]), OrderSchema));
const FooQuerySchema = withQuerySchema({
    filter:  FooFilterSchema,
    orderBy: FooOrderBySchema,
});
const FooMutationSchema = withMutationSchema({
    shape: FooShapeSchema,
    query: FooQuerySchema,
});
type FooMutationSchema = PicoSchema.Output<typeof FooMutationSchema>;

describe("withMutationSchema", () => {
    test("Schema typehint and parse", () => {
        const shape: FooMutationSchema = {
            create: {
                foo: "1243",
            },
            update: {
                update: {},
                query:  {
                    where: {
                        anotherThing: "123",
                    },
                },
            },
            upsert: {},
            delete: {
                where: {
                    something: "123",
                },
            },
        };
        const typeCheck: PicoSchema.Output<MutationSchema<any, QuerySchema<FilterSchema, any>>> = shape;

        expect(parse(FooMutationSchema, shape)).toEqual(typeCheck);
    });
});
