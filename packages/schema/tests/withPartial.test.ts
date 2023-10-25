import {
    describe,
    expect,
    test
}                    from "vitest";
import {
    parse,
    type PicoSchema,
    schema
}                    from "../src";
import {withPartial} from "../src/schema/partial/withPartial";

const JustSchema = schema(z => z.object({
    required:                z.string,
    anotherPieceButNullable: z.string$,
    innerPartial:            z.partial(
        z.object({
            foo:      z.string,
            bar:      z.string,
            required: z.object({
                a: z.string,
                b: z.string,
            }),
        })
    )
}));

const JustSchema$ = withPartial(JustSchema);
type JustSchema$ = PicoSchema.Output<typeof JustSchema$>;

describe("withPartial", () => {
    test("partial do partial thing", () => {
        const partial: JustSchema$ = {
            anotherPieceButNullable: "good one",
            innerPartial:            {
                required: {
                    a: "a",
                    b: "a",
                }
            }
        };
        expect(parse(JustSchema$, partial)).toEqual(partial);
    });
});
