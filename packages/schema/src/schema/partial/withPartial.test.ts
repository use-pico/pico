import {
    describe,
    expect,
    test
}                        from "vitest";
import {type PicoSchema} from "../../api/PicoSchema";
import {withNullish}     from "../nullish/withNullish";
import {withObject}      from "../object/withObject";
import {parse}           from "../parse";
import {withString}      from "../string/withString";
import {withPartial}     from "./withPartial";

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
