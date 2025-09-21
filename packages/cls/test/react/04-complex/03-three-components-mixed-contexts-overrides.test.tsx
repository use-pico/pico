import { render } from "@testing-library/react";
import type { FC, PropsWithChildren } from "react";
import { describe, expect, it } from "vitest";
import {
	type Cls,
	contract,
	TokenContext,
	TweakProvider,
	useCls,
	withCls,
} from "../../../src";

// Providers for tokens
const ProviderA = contract()
	.tokens([
		"t1",
		"t2",
	])
	.slots([
		"root",
	])
	.def()
	.token({
		t1: {
			class: [
				"A1",
			],
		},
		t2: {
			class: [
				"A2",
			],
		},
	})
	.root({})
	.cls();

const ProviderB = contract()
	.tokens([
		"t1",
		"t2",
	])
	.slots([
		"root",
	])
	.def()
	.token({
		t1: {
			class: [
				"B1",
			],
		},
		t2: {
			class: [
				"B2",
			],
		},
	})
	.root({})
	.cls();

// Tag uses t1 on root
const TagCls = contract()
	.tokens([
		"t1",
	])
	.slots([
		"root",
		"icon",
	])
	.variant("size", [
		"sm",
		"md",
	])
	.def()
	.token({
		t1: {
			class: [
				"T1",
			],
		},
	})
	.root({
		root: {
			token: [
				"t1",
			],
			class: [
				"tag",
			],
		},
		icon: {
			class: [
				"ti",
			],
		},
	})
	.match("size", "md", {
		root: {
			class: [
				"MD",
			],
		},
		icon: {
			class: [
				"MD-i",
			],
		},
	})
	.defaults({
		size: "sm",
	})
	.cls();

interface TagProps extends Cls.Props<typeof TagCls>, PropsWithChildren {}
const BaseTag: FC<TagProps> = ({ cls = TagCls, tweak, children }) => {
	const { slots } = useCls(cls, tweak);
	return (
		<span
			data-ui="Tag-root"
			className={slots.root()}
		>
			<i
				data-ui="Tag-icon"
				className={slots.icon()}
			/>
			{children}
		</span>
	);
};
const Tag = withCls(BaseTag, TagCls);

// Chip uses t2 on icon
const ChipCls = contract()
	.tokens([
		"t2",
	])
	.slots([
		"root",
		"icon",
	])
	.def()
	.token({
		t2: {
			class: [
				"T2",
			],
		},
	})
	.root({
		root: {
			class: [
				"chip",
			],
		},
		icon: {
			token: [
				"t2",
			],
			class: [
				"ci",
			],
		},
	})
	.cls();

interface ChipProps extends Cls.Props<typeof ChipCls> {}
const BaseChip: FC<ChipProps> = ({ cls = ChipCls, tweak }) => {
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
		</span>
	);
};
const Chip = withCls(BaseChip, ChipCls);

// Label only variants
const LabelCls = contract()
	.slots([
		"root",
	])
	.variant("tone", [
		"neutral",
		"error",
	])
	.def()
	.root({
		root: {
			class: [
				"label",
			],
		},
	})
	.match("tone", "error", {
		root: {
			class: [
				"ERR",
			],
		},
	})
	.defaults({
		tone: "neutral",
	})
	.cls();

interface LabelProps extends Cls.Props<typeof LabelCls>, PropsWithChildren {}
const BaseLabel: FC<LabelProps> = ({ cls = LabelCls, tweak, children }) => {
	const { slots } = useCls(cls, tweak);
	return (
		<span
			data-ui="Label-root"
			className={slots.root()}
		>
			{children}
		</span>
	);
};
const Label = withCls(BaseLabel, LabelCls);

describe("react/04-complex/three-components-mixed-contexts-overrides", () => {
	it("applies outer tokens to Tag, inner tokens to Chip, and user/provider tweaks independently", () => {
		const { container } = render(
			<TokenContext value={ProviderA}>
				{/* Tag under ProviderA with its own provider for variant/slot */}
				<TweakProvider
					cls={TagCls}
					tweak={{
						variant: {
							size: "md",
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
					<Tag>t</Tag>
				</TweakProvider>

				{/* Chip under nested ProviderB and with per-slot override on icon from provider */}
				<TokenContext value={ProviderB}>
					<TweakProvider
						cls={ChipCls}
						tweak={{
							override: {
								icon: {
									class: [
										"OVR",
									],
								},
							},
						}}
					>
						<Chip />
					</TweakProvider>
				</TokenContext>

				{/* Label gets only user tweak and is unaffected by token providers */}
				<Label
					tweak={{
						slot: {
							root: {
								class: [
									"U",
								],
							},
						},
						variant: {
							tone: "error",
						},
					}}
				>
					l
				</Label>
			</TokenContext>,
		);

		const tagRoot = container.querySelector(
			'[data-ui="Tag-root"]',
		) as HTMLElement;
		const tagIcon = container.querySelector(
			'[data-ui="Tag-icon"]',
		) as HTMLElement;
		const chipRoot = container.querySelector(
			'[data-ui="Chip-root"]',
		) as HTMLElement;
		const chipIcon = container.querySelector(
			'[data-ui="Chip-icon"]',
		) as HTMLElement;
		const labelRoot = container.querySelector(
			'[data-ui="Label-root"]',
		) as HTMLElement;

		// Tag: ProviderA.t1 (A1) + base tag + provider P + variant MD; icon gets MD-i
		expect(tagRoot.className).toBe("A1 tag MD P");
		expect(tagIcon.className).toBe("ti MD-i");

		// Chip: nested ProviderB.t2 (B2) replaced by provider override OVR on icon; root base 'chip'
		expect(chipRoot.className).toBe("chip");
		expect(chipIcon.className).toBe("OVR");

		// Label: only user tweak + variant
		expect(labelRoot.className).toBe("label ERR U");
	});
});
