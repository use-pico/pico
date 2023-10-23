import {
    FilterSchema,
    OrderSchema,
    withQuerySchema
}                           from "@use-pico/query";
import {
    merge,
    parse,
    type PicoSchema,
    withEnum,
    withNullish,
    withObject,
    withRecord,
    withString
}                           from "@use-pico/schema";
import {
    describe,
    expect,
    test
}                           from "vitest";
import {withMutationSchema} from "./withMutationSchema";

const FooShapeSchema = withObject({
    foo: withString(),
});
const FooFilterSchema = merge([
    FilterSchema,
    withObject({
        something:    withNullish(withString()),
        anotherThing: withNullish(withString()),
    }),
]);
const FooOrderBySchema = withRecord(withEnum(["foo", "bar"]), OrderSchema);
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
        expect(parse(FooMutationSchema, shape)).toEqual(shape);
    });
});
