import {MantineProvider} from "@mantine/core";
import {render}          from "@testing-library/react";
import {
    describe,
    expect,
    test
}                        from "vitest";
import {BoolInline}      from "../src/inline/BoolInline";

describe("BoolInline", () => {
    test("Render with true", () => {
        const result = render(<MantineProvider>
            <BoolInline bool={true}/>
        </MantineProvider>);
        expect(result).toMatchSnapshot();
    });

    test("Render with false", () => {
        const result = render(<MantineProvider>
            <BoolInline bool={false}/>
        </MantineProvider>);
        expect(result).toMatchSnapshot();
    });

    test("Render with undefined", () => {
        const result = render(<MantineProvider>
            <BoolInline bool={undefined}/>
        </MantineProvider>);
        expect(result).toMatchSnapshot();
    });
});
