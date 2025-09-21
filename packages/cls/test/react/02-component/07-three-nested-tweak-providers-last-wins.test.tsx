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
		"icon",
	])
	.variant("size", [
		"sm",
		"md",
	])
	.def()
	.root({
		root: {
			class: [
				"base",
			],
		},
		icon: {
			class: [
				"i-base",
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
		size: "sm",
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
			<i
				data-ui="Chip-icon"
				className={slots.icon()}
			/>
			{children}
		</span>
	);
};

const Chip = withCls(BaseChip, ChipCls);

describe("react/02-component/three-nested-tweak-providers-last-wins", () => {
	it("innermost provider wins for variant and per-slot override; appends order outer -> inner", () => {
		const { container } = render(
			<TweakProvider
				cls={ChipCls}
				tweak={{
					variant: {
						size: "md",
					},
					slot: {
						root: {
							class: [
								"P1",
							],
						},
						icon: {
							class: [
								"P1-i",
							],
						},
					},
				}}
			>
				<TweakProvider
					cls={ChipCls}
					tweak={{
						variant: {
							size: "sm",
						},
						slot: {
							root: {
								class: [
									"P2",
								],
							},
							icon: {
								class: [
									"P2-i",
								],
							},
						},
					}}
				>
					<TweakProvider
						cls={ChipCls}
						tweak={{
							variant: {
								size: "sm",
							},
							slot: {
								root: {
									class: [
										"P3",
									],
								},
								icon: {
									class: [
										"P3-i",
									],
								},
							},
							override: {
								icon: {
									class: [
										"OVR3",
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
		const icon = container.querySelector(
			'[data-ui="Chip-icon"]',
		) as HTMLElement;

		// Innermost provider sets size: "sm" so variant class is SM; appends from innermost only
		expect(root?.className).toBe("base SM P3");
		// Innermost provider overrides icon completely
		expect(icon?.className).toBe("OVR3");
	});
});
