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

// Theme tokens provided via TokenContext
const ThemeTokens = contract()
	.tokens([
		"brand",
		"accent",
	])
	.def()
	.token({
		brand: {
			class: [
				"BRAND",
			],
		},
		accent: {
			class: [
				"ACCENT",
			],
		},
	})
	.cls();

// Badge component consuming tokens and variants
const BadgeCls = contract()
	.tokens([
		"brand",
	]) // references brand
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
		brand: {
			class: [
				"BR",
			],
		},
	})
	.root({
		root: {
			class: [
				"badge",
			],
			token: [
				"brand",
			],
		},
		icon: {
			class: [
				"b-i",
			],
		},
	})
	.match("size", "sm", {
		root: {
			class: [
				"B-SM",
			],
		},
	})
	.match("size", "md", {
		root: {
			class: [
				"B-MD",
			],
		},
		icon: {
			class: [
				"B-MD-i",
			],
		},
	})
	.defaults({
		size: "sm",
	})
	.cls();

interface BadgeProps extends Cls.Props<typeof BadgeCls>, PropsWithChildren {}

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

// Pill component consuming accent token; will also receive providers and user tweaks
const PillCls = contract()
	.tokens([
		"accent",
	]) // references accent
	.slots([
		"root",
		"icon",
	])
	.variant("tone", [
		"neutral",
		"success",
	])
	.def()
	.token({
		accent: {
			class: [
				"AC",
			],
		},
	})
	.root({
		root: {
			class: [
				"pill",
			],
			token: [
				"accent",
			],
		},
		icon: {
			class: [
				"p-i",
			],
		},
	})
	.match("tone", "success", {
		root: {
			class: [
				"OK",
			],
		},
		icon: {
			class: [
				"OK-i",
			],
		},
	})
	.defaults({
		tone: "neutral",
	})
	.cls();

interface PillProps extends Cls.Props<typeof PillCls> {}

const BasePill: FC<PillProps> = ({ cls = PillCls, tweak }) => {
	const { slots } = useCls(cls, tweak);
	return (
		<span
			data-ui="Pill-root"
			className={slots.root()}
		>
			<i
				data-ui="Pill-icon"
				className={slots.icon()}
			/>
		</span>
	);
};

const Pill = withCls(BasePill, PillCls);

describe("react/04-complex/multi-component-shared-tokens-and-nested-providers", () => {
	it("applies TokenContext tokens, merges nested TweakProviders, and user tweaks per component", () => {
		const { container } = render(
			<TokenContext value={ThemeTokens}>
				{/* Badge inside its own provider */}
				<TweakProvider
					cls={BadgeCls}
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
					<Badge>one</Badge>
				</TweakProvider>

				{/* Pill inside its own provider */}
				<TweakProvider
					cls={PillCls}
					tweak={{
						variant: {
							tone: "success",
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
					<Pill
						tweak={{
							variant: {
								tone: "neutral",
							},
							slot: {
								root: {
									class: [
										"U",
									],
								},
								icon: {
									class: [
										"U-i",
									],
								},
							},
						}}
					/>
				</TweakProvider>
			</TokenContext>,
		);

		const badgeRoot = container.querySelector(
			'[data-ui="Badge-root"]',
		) as HTMLElement;
		const badgeIcon = container.querySelector(
			'[data-ui="Badge-icon"]',
		) as HTMLElement;
		const pillRoot = container.querySelector(
			'[data-ui="Pill-root"]',
		) as HTMLElement;
		const pillIcon = container.querySelector(
			'[data-ui="Pill-icon"]',
		) as HTMLElement;

		// Badge: TokenContext token BRAND, base badge, provider P1, variant md, and variant adds B-MD-i to icon
		expect(badgeRoot.className).toBe("BRAND badge P1 B-MD");
		expect(badgeIcon.className).toBe("b-i P1-i B-MD-i");

		// Pill: TokenContext token ACCENT, provider sets success -> OK/OK-i, provider appends P2/P2-i, user overrides variant to neutral and appends U/U-i
		expect(pillRoot.className).toBe("ACCENT pill P2 U");
		expect(pillIcon.className).toBe("p-i P2-i U-i");
	});
});
