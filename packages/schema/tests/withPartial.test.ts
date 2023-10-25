import {
    describe,
    expect,
    test
}                        from "vitest";
import {type PicoSchema} from "../src/api/PicoSchema";
import {withNullish}     from "../src/schema/nullish/withNullish";
import {withObject}      from "../src/schema/object/withObject";
import {parse}           from "../src/schema/parse";
import {withPartial}     from "../src/schema/partial/withPartial";
import {withString}      from "../src/schema/string/withString";

const JustSchema = withObject({
    required:                withString(),
    anotherPieceButNullable: withNullish(withString()),
    innerPartial:            withPartial(
        withObject({
            foo:      withString(),
            bar:      withString(),
            required: withObject({
                a: withString(),
                b: withString(),
            }),
        })
    )
});

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
