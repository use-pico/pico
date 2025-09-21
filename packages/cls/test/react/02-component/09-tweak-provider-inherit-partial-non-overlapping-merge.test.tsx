import { render } from "@testing-library/react";
import type { FC } from "react";
import { describe, expect, it } from "vitest";
import {
	type Cls,
	contract,
	TweakProvider,
	useCls,
	withCls,
} from "../../../src";

const BadgeCls = contract()
	.slots([
		"root",
		"icon",
	])
	.variant("tone", [
		"neutral",
		"success",
	])
	.def()
	.root({
		root: {
			class: [
				"badge",
			],
		},
		icon: {
			class: [
				"i",
			],
		},
	})
	.match("tone", "success", {
		root: {
			class: [
				"OK",
			],
		},
	})
	.defaults({
		tone: "neutral",
	})
	.cls();

interface BadgeProps extends Cls.Props<typeof BadgeCls> {
	children?: string;
}

const BaseBadge: FC<BadgeProps> = ({ cls = BadgeCls, tweak, children }) => {
	const { slots } = useCls(cls, tweak);
	return (
		<span
			data-ui="Badge-root"
			className={slots.root()}
		>
			<i
				data-ui="Badge-icon"
				className={slots.icon()}
			/>
			{children}
		</span>
	);
};

const Badge = withCls(BaseBadge, BadgeCls);

describe("react/02-component/tweak-provider-inherit-partial-non-overlapping-merge", () => {
	it("merges parent and child non-overlapping tweaks: variant + different slot keys", () => {
		const { container } = render(
			<TweakProvider
				cls={BadgeCls}
				tweak={{
					variant: {
						tone: "success",
					},
					slot: {
						root: {
							class: [
								"P",
							],
						},
					},
				}}
			>
				<TweakProvider
					cls={BadgeCls}
					inherit
					tweak={{
						slot: {
							icon: {
								class: [
									"C-i",
								],
							},
						},
					}}
				>
					<Badge>content</Badge>
				</TweakProvider>
			</TweakProvider>,
		);

		const root = container.querySelector(
			'[data-ui="Badge-root"]',
		) as HTMLElement;
		const icon = container.querySelector(
			'[data-ui="Badge-icon"]',
		) as HTMLElement;

		// Parent variant applies (success) + parent root append + child icon append
		expect(root?.className).toBe("badge OK P");
		expect(icon?.className).toBe("i C-i");
	});
});
