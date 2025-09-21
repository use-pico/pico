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

const ChipCls = contract()
	.slots([
		"root",
	])
	.variant("size", [
		"sm",
		"md",
	])
	.def()
	.root({
		root: {
			class: [
				"c",
			],
		},
	})
	.match("size", "sm", {
		root: {
			class: [
				"SM",
			],
		},
	})
	.match("size", "md", {
		root: {
			class: [
				"MD",
			],
		},
	})
	.defaults({
		size: "md",
	})
	.cls();

interface ChipProps extends Cls.Props<typeof ChipCls> {
	children?: string;
}

const BaseChip: FC<ChipProps> = ({ cls = ChipCls, tweak, children }) => {
	const { slots } = useCls(cls, tweak);
	return (
		<span
			data-ui="Chip-root"
			className={slots.root()}
		>
			{children}
		</span>
	);
};

const Chip = withCls(BaseChip, ChipCls);

describe("react/02-component/inherit-multi-level-merge-order-p1-p2-child", () => {
	it("merges P1 then P2 then child; child wins variant, appends order P1->P2->child", () => {
		const { container } = render(
			<TweakProvider
				cls={ChipCls}
				tweak={{
					variant: {
						size: "sm",
					},
					slot: {
						root: {
							class: [
								"P1",
							],
						},
					},
				}}
			>
				<TweakProvider
					cls={ChipCls}
					inherit
					tweak={{
						variant: {
							size: "md",
						},
						slot: {
							root: {
								class: [
									"P2",
								],
							},
						},
					}}
				>
					<TweakProvider
						cls={ChipCls}
						inherit
						tweak={{
							variant: {
								size: "sm",
							},
							slot: {
								root: {
									class: [
										"C",
									],
								},
							},
						}}
					>
						<Chip>chip</Chip>
					</TweakProvider>
				</TweakProvider>
			</TweakProvider>,
		);

		const root = container.querySelector(
			'[data-ui="Chip-root"]',
		) as HTMLElement;
		// Variant from child: sm => SM; append order P1, P2, C after variant
		expect(root?.className).toBe("c SM P1 P2 C");
	});
});
