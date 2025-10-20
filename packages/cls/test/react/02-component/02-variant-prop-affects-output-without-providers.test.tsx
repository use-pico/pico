import { render } from "@testing-library/react";
import type { FC } from "react";
import { describe, expect, it } from "vitest";
import { type Cls, contract, useCls } from "../../../src";

const BadgeCls = contract()
	.slots([
		"root",
	])
	.variant("intent", [
		"info",
		"error",
	])
	.def()
	.root({
		root: {
			class: [
				"badge",
			],
		},
	})
	.match("intent", "info", {
		root: {
			class: [
				"info",
			],
		},
	})
	.match("intent", "error", {
		root: {
			class: [
				"error",
			],
		},
	})
	.defaults({
		intent: "info",
	})
	.cls();

interface BadgeProps extends Cls.Props<typeof BadgeCls> {
	intent?: Cls.VariantOf<typeof BadgeCls, "intent">;
	children?: string;
}

const BaseBadge: FC<BadgeProps> = ({
	intent = "info",
	cls = BadgeCls,
	tweak,
	children,
}) => {
	const { slots } = useCls(
		cls,
		[
			{
				variant: {
					intent,
				},
			},
		],
		tweak,
	);
	return (
		<span
			data-ui="Badge-root"
			className={slots.root()}
		>
			{children}
		</span>
	);
};

const Badge = BaseBadge;

describe("react/02-component/variant-prop-affects-output-without-providers", () => {
	it("switches classes based on intent prop without providers", () => {
		const { container, rerender } = render(<Badge>hi</Badge>);
		const root = () =>
			container.querySelector('[data-ui="Badge-root"]') as HTMLElement;
		expect(root().className).toBe("badge info");

		rerender(<Badge intent="error">oops</Badge>);
		expect(root().className).toBe("badge error");
	});
});
