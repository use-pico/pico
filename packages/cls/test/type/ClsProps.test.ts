import { expectTypeOf } from "expect-type";
import type { ClassName } from "../../src/types/ClassName";
import type { ClsFn } from "../../src/types/fn/ClsFn";
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

// Test basic ClsProps
expectTypeOf<ClsProps<MockClsFn>>().not.toBeAny();

// Test with additional props
expectTypeOf<
	ClsProps<
		MockClsFn,
		{
			id: string;
			disabled?: boolean;
		}
	>
>().not.toBeAny();

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

expectTypeOf<ClsProps<ComplexClsFn>>().not.toBeAny();

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

expectTypeOf<ClsProps<ButtonClsFn>>().not.toBeAny();
