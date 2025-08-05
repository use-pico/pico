import { expectTypeOf } from "expect-type";
import type { ClassName } from "../../src/types/ClassName";
import type { ClsFn } from "../../src/types/fn/ClsFn";
import type { ClsSlots } from "../../src/types/utils/ClsSlots";

// Test utility types with proper constraints
type MockClsFn = ClsFn<
	{
		base: string;
	},
	{
		size: Record<string, ClassName>;
	}
>;

// Test basic ClsSlots
expectTypeOf<ClsSlots<MockClsFn>>().not.toBeAny();

// Test that ClsSlots is an object
expectTypeOf<ClsSlots<MockClsFn>>().toBeObject();

// Test more complex scenarios
type ComplexClsFn = ClsFn<
	{
		base: string;
		header: string;
		content: string;
	},
	{
		size: Record<string, ClassName>;
		variant: Record<string, ClassName>;
		state: Record<string, ClassName>;
	}
>;

expectTypeOf<ClsSlots<ComplexClsFn>>().not.toBeAny();

// Test different slot configurations
type ButtonClsFn = ClsFn<
	{
		base: string;
		icon: string;
	},
	{
		variant: Record<string, ClassName>;
		size: Record<string, ClassName>;
	}
>;

expectTypeOf<ClsSlots<ButtonClsFn>>().not.toBeAny();
