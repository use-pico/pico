import { expectTypeOf } from "expect-type";
import type { ClassName } from "../../src/types/ClassName";
import type { ClsFn } from "../../src/types/fn/ClsFn";
import type { ClsClear } from "../../src/types/utils/ClsClear";
import type { ClsProps } from "../../src/types/utils/ClsProps";

// Test utility types with proper constraints
type MockClsFn = ClsFn<
	{
		base: string;
	},
	{
		size: Record<string, ClassName>;
	}
>;
type MockClsProps = ClsProps<MockClsFn>;

// Test ClsClear utility type
expectTypeOf<ClsClear<MockClsProps>>().not.toBeAny();

// Test that utility types work correctly
expectTypeOf<ClsClear<MockClsProps>>().not.toBeAny();
