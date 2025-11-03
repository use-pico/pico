/** biome-ignore-all lint/style/useComponentExportOnlyModules: Ssst */
import { render } from "@testing-library/react";
import type { FC } from "react";
import { describe, expect, it } from "vitest";
import { type Cls, contract, useCls } from "../../../src";

// Simplified IconCls (only size and disabled, no external deps)
const SimpleIconCls = contract()
	.slot("root")
	.variant("size", [
		"xs",
		"sm",
		"md",
		"lg",
		"xl",
	])
	.bool("disabled")
	.def()
	.root({
		root: {
			class: [
				"Icon-root",
			],
		},
	})
	// Size rules
	.match("size", "xs", {
		root: {
			class: [
				"w-4",
				"h-4",
			],
		},
	})
	.match("size", "sm", {
		root: {
			class: [
				"w-6",
				"h-6",
			],
		},
	})
	.match("size", "md", {
		root: {
			class: [
				"w-8",
				"h-8",
			],
		},
	})
	.match("size", "lg", {
		root: {
			class: [
				"w-10",
				"h-10",
			],
		},
	})
	.match("size", "xl", {
		root: {
			class: [
				"w-14",
				"h-14",
			],
		},
	})
	// Disabled
	.match("disabled", true, {
		root: {
			class: [
				"pointer-events-none",
				"opacity-50",
			],
		},
	})
	.defaults({
		size: "md",
		disabled: false,
	})
	.cls();

type SimpleIconCls = typeof SimpleIconCls;

namespace SimpleIconCls {
	export type Props<P = unknown> = Cls.Props<SimpleIconCls, P>;
}

// Simplified Icon component
interface SimpleIconProps extends SimpleIconCls.Props {
	icon: string;
	size?: Cls.VariantOf<SimpleIconCls, "size">;
	disabled?: boolean;
}

const SimpleIcon: FC<SimpleIconProps> = ({
	icon,
	size,
	disabled,
	cls = SimpleIconCls,
	tweak,
}) => {
	const { slots } = useCls(cls, tweak, {
		variant: {
			size,
			disabled,
		},
		slot: {
			root: {
				class: [
					icon,
				],
			},
		},
	});

	return (
		<div
			data-ui="Icon-root"
			className={slots.root()}
		/>
	);
};

describe("react/02-component/icon-renders-basic-classes", () => {
	it("renders with Icon-root and provided icon class", () => {
		const ICON = "icon-[rivet-icons--check]";
		const { container } = render(<SimpleIcon icon={ICON} />);
		const root = container.querySelector(
			'[data-ui="Icon-root"]',
		) as HTMLElement;
		expect(root).toBeTruthy();
		expect(root.className).toBe(
			"Icon-root w-8 h-8 icon-[rivet-icons--check]",
		);
	});
});
