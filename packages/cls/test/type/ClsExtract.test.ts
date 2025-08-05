import { expectTypeOf } from "expect-type";
import type { ClassName } from "../../src/types/ClassName";
import type { ClsFn } from "../../src/types/fn/ClsFn";
import type { ClsExtract } from "../../src/types/utils/ClsExtract";
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

// Test ClsExtract utility type
expectTypeOf<ClsExtract<MockClsProps>>().not.toBeAny();

// Test that utility types work correctly
expectTypeOf<ClsExtract<MockClsProps>>().not.toBeAny();
