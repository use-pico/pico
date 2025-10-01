import { render } from "@testing-library/react";
import type { FC } from "react";
import { describe, expect, it } from "vitest";
import { contract, TokenProvider, useCls, withCls } from "../../../src";
import type { Cls } from "../../../src/types/Cls";

// Simplified FadeCls for testing
const FadeCls = contract()
	.tokens([
		"fade.from",
		"fade.via",
		"fade.to",
		"fade.gradient",
	])
	.slots([
		"top",
		"bottom",
	])
	.variant("theme", [
		"light",
		"dark",
	])
	.def()
	.token({
		"fade.from": {
			class: [
				"from-default",
			],
		},
		"fade.via": {
			class: [
				"via-default",
			],
		},
		"fade.to": {
			class: [
				"to-default",
			],
		},
		"fade.gradient": {
			token: [
				"fade.from",
				"fade.via",
				"fade.to",
			],
		},
	})
	.root({
		top: {
			class: [
				"fade-top-base",
				"absolute",
				"top-0",
			],
			token: [
				"fade.gradient",
			],
		},
		bottom: {
			class: [
				"fade-bottom-base",
				"absolute",
				"bottom-0",
			],
			token: [
				"fade.gradient",
			],
		},
	})
	.tokens.match("theme", "light", {
		"fade.from": {
			class: [
				"from-white/0",
			],
		},
		"fade.to": {
			class: [
				"to-white/80",
			],
		},
	})
	.tokens.match("theme", "dark", {
		"fade.from": {
			class: [
				"from-black/0",
			],
		},
		"fade.to": {
			class: [
				"to-black/80",
			],
		},
	})
	.defaults({
		theme: "dark",
	})
	.cls();

// Theme provider with different token values
const ThemeCls = contract()
	.tokens([
		"fade.from",
		"fade.via",
		"fade.to",
		"fade.gradient",
	])
	.def()
	.token({
		"fade.from": {
			class: [
				"theme-from-color",
			],
		},
		"fade.via": {
			class: [
				"theme-via-color",
			],
		},
		"fade.to": {
			class: [
				"theme-to-color",
			],
		},
		"fade.gradient": {
			token: [
				"fade.from",
				"fade.via",
				"fade.to",
			],
		},
	})
	.cls();

export type FadeCls = typeof FadeCls;

export namespace FadeCls {
	export type Props<P = unknown> = Cls.Props<FadeCls, P>;
}

interface FadeProps extends FadeCls.Props {}

const BaseFade: FC<FadeProps> = ({ cls = FadeCls, tweak }) => {
	const { slots } = useCls(cls, tweak);

	return (
		<div data-testid="fade-container">
			<div
				data-ui="Fade-top"
				className={slots.top()}
			/>
			<div
				data-ui="Fade-bottom"
				className={slots.bottom()}
			/>
		</div>
	);
};

const Fade = withCls(BaseFade, FadeCls);

describe("react/02-component/fade-component-token-override", () => {
	it("uses default component tokens when no provider or override", () => {
		const { container } = render(<Fade />);

		const topElement = container.querySelector(
			'[data-ui="Fade-top"]',
		) as HTMLElement;
		const bottomElement = container.querySelector(
			'[data-ui="Fade-bottom"]',
		) as HTMLElement;

		// Should use default tokens with dark theme variant (token classes first, then slot classes)
		expect(topElement?.className).toBe(
			"from-black/0 via-default to-black/80 fade-top-base absolute top-0",
		);
		expect(bottomElement?.className).toBe(
			"from-black/0 via-default to-black/80 fade-bottom-base absolute bottom-0",
		);
	});

	it("uses theme provider tokens when no component override", () => {
		const { container } = render(
			<TokenProvider cls={ThemeCls}>
				<Fade />
			</TokenProvider>,
		);

		const topElement = container.querySelector(
			'[data-ui="Fade-top"]',
		) as HTMLElement;
		const bottomElement = container.querySelector(
			'[data-ui="Fade-bottom"]',
		) as HTMLElement;

		// Should use theme provider tokens with dark theme variant (token classes first, then slot classes)
		expect(topElement?.className).toBe(
			"theme-from-color theme-via-color theme-to-color fade-top-base absolute top-0",
		);
		expect(bottomElement?.className).toBe(
			"theme-from-color theme-via-color theme-to-color fade-bottom-base absolute bottom-0",
		);
	});

	it("component token tweak appends to theme provider tokens", () => {
		const { container } = render(
			<TokenProvider cls={ThemeCls}>
				<Fade
					tweak={{
						override: true,
						token: {
							"fade.from": {
								class: [
									"component-from-color",
								],
							},
						},
					}}
				/>
			</TokenProvider>,
		);

		const topElement = container.querySelector(
			'[data-ui="Fade-top"]',
		) as HTMLElement;
		const bottomElement = container.querySelector(
			'[data-ui="Fade-bottom"]',
		) as HTMLElement;

		// User token tweak should override component variant rules (token classes first, then slot classes)
		expect(topElement?.className).toBe(
			"component-from-color theme-via-color theme-to-color fade-top-base absolute top-0",
		);
		expect(bottomElement?.className).toBe(
			"component-from-color theme-via-color theme-to-color fade-bottom-base absolute bottom-0",
		);
	});

	it("component token override replaces theme provider tokens", () => {
		const { container } = render(
			<TokenProvider cls={ThemeCls}>
				<Fade
					tweak={{
						override: true,
						variant: {
							theme: "light",
						},
						token: {
							"fade.from": {
								class: [
									"component-override-from",
								],
							},
							"fade.to": {
								class: [
									"component-override-to",
								],
							},
						},
					}}
				/>
			</TokenProvider>,
		);

		const topElement = container.querySelector(
			'[data-ui="Fade-top"]',
		) as HTMLElement;
		const bottomElement = container.querySelector(
			'[data-ui="Fade-bottom"]',
		) as HTMLElement;

		// User token overrides should take precedence over component variant rules
		expect(topElement?.className).toBe(
			"component-override-from theme-via-color component-override-to fade-top-base absolute top-0",
		);
		expect(bottomElement?.className).toBe(
			"component-override-from theme-via-color component-override-to fade-bottom-base absolute bottom-0",
		);
	});

	it("component token override with empty array clears token", () => {
		const { container } = render(
			<TokenProvider cls={ThemeCls}>
				<Fade
					tweak={{
						variant: {
							theme: "light",
						},
						override: true,
						token: {
							"fade.from": {
								class: [],
							},
							"fade.via": {
								class: [],
							},
						},
					}}
				/>
			</TokenProvider>,
		);

		const topElement = container.querySelector(
			'[data-ui="Fade-top"]',
		) as HTMLElement;
		const bottomElement = container.querySelector(
			'[data-ui="Fade-bottom"]',
		) as HTMLElement;

		// Empty token arrays should clear tokens, overriding component variant rules
		expect(topElement?.className).toBe(
			"theme-to-color fade-top-base absolute top-0",
		);
		expect(bottomElement?.className).toBe(
			"theme-to-color fade-bottom-base absolute bottom-0",
		);
	});

	it("mixed token tweaks and overrides work correctly", () => {
		const { container } = render(
			<TokenProvider cls={ThemeCls}>
				<Fade
					tweak={{
						override: true,
						variant: {
							theme: "light",
						},
						token: {
							// Token tweak: overrides theme token
							"fade.from": {
								class: [
									"override-from",
								],
							},
							// Token tweak: overrides theme token
							"fade.via": {
								class: [
									"tweak-via",
								],
							},
							// Token tweak with empty: clears token
							"fade.to": {
								class: [],
							},
						},
					}}
				/>
			</TokenProvider>,
		);

		const topElement = container.querySelector(
			'[data-ui="Fade-top"]',
		) as HTMLElement;
		const bottomElement = container.querySelector(
			'[data-ui="Fade-bottom"]',
		) as HTMLElement;

		// User token overrides should take precedence over component variant rules
		expect(topElement?.className).toBe(
			"override-from tweak-via fade-top-base absolute top-0",
		);
		expect(bottomElement?.className).toBe(
			"override-from tweak-via fade-bottom-base absolute bottom-0",
		);
	});

	it("token overrides work with theme variants", () => {
		const { container } = render(
			<TokenProvider cls={ThemeCls}>
				<Fade
					tweak={{
						override: true,
						variant: {
							theme: "light",
						},
						token: {
							"fade.from": {
								class: [
									"custom-light-from",
								],
							},
						},
					}}
				/>
			</TokenProvider>,
		);

		const topElement = container.querySelector(
			'[data-ui="Fade-top"]',
		) as HTMLElement;
		const bottomElement = container.querySelector(
			'[data-ui="Fade-bottom"]',
		) as HTMLElement;

		// User token overrides should take precedence over component variant rules
		expect(topElement?.className).toBe(
			"custom-light-from theme-via-color theme-to-color fade-top-base absolute top-0",
		);
		expect(bottomElement?.className).toBe(
			"custom-light-from theme-via-color theme-to-color fade-bottom-base absolute bottom-0",
		);
	});

	it("simple token tweaks work without external context providers (component variant rules still active)", () => {
		const { container } = render(
			<Fade
				tweak={{
					override: true,
					token: {
						"fade.from": {
							class: [
								"simple-from-override",
							],
						},
						"fade.via": {
							class: [
								"simple-via-override",
							],
						},
						"fade.to": {
							class: [
								"simple-to-override",
							],
						},
					},
				}}
			/>,
		);

		const topElement = container.querySelector(
			'[data-ui="Fade-top"]',
		) as HTMLElement;
		const bottomElement = container.querySelector(
			'[data-ui="Fade-bottom"]',
		) as HTMLElement;

		// CORRECT BEHAVIOR: User token tweaks should override component variant rules
		// This test should FAIL until the cls precedence bug is fixed
		expect(topElement?.className).toBe(
			"simple-from-override simple-via-override simple-to-override fade-top-base absolute top-0",
		);
		expect(bottomElement?.className).toBe(
			"simple-from-override simple-via-override simple-to-override fade-bottom-base absolute bottom-0",
		);
	});

	it("simple token tweaks work with variant changes", () => {
		const { container } = render(
			<Fade
				tweak={{
					override: true,
					variant: {
						theme: "light",
					},
					token: {
						"fade.from": {
							class: [
								"light-from-tweak",
							],
						},
						"fade.to": {
							class: [
								"light-to-tweak",
							],
						},
					},
				}}
			/>,
		);

		const topElement = container.querySelector(
			'[data-ui="Fade-top"]',
		) as HTMLElement;
		const bottomElement = container.querySelector(
			'[data-ui="Fade-bottom"]',
		) as HTMLElement;

		// User token tweaks should override component variant rules
		expect(topElement?.className).toBe(
			"light-from-tweak via-default light-to-tweak fade-top-base absolute top-0",
		);
		expect(bottomElement?.className).toBe(
			"light-from-tweak via-default light-to-tweak fade-bottom-base absolute bottom-0",
		);
	});

	it("simple token tweaks with empty arrays work", () => {
		const { container } = render(
			<Fade
				tweak={{
					override: true,
					token: {
						"fade.from": {
							class: [],
						},
						"fade.via": {
							class: [],
						},
						"fade.to": {
							class: [],
						},
					},
				}}
			/>,
		);

		const topElement = container.querySelector(
			'[data-ui="Fade-top"]',
		) as HTMLElement;
		const bottomElement = container.querySelector(
			'[data-ui="Fade-bottom"]',
		) as HTMLElement;

		// Empty token arrays should clear tokens, overriding component variant rules
		expect(topElement?.className).toBe("fade-top-base absolute top-0");
		expect(bottomElement?.className).toBe(
			"fade-bottom-base absolute bottom-0",
		);
	});

	it("mixed simple token tweaks and slot tweaks work together", () => {
		const { container } = render(
			<Fade
				tweak={{
					override: true,
					token: {
						"fade.from": {
							class: [
								"token-tweak",
							],
						},
					},
					slot: {
						top: {
							class: [
								"slot-tweak",
							],
						},
					},
				}}
			/>,
		);

		const topElement = container.querySelector(
			'[data-ui="Fade-top"]',
		) as HTMLElement;
		const bottomElement = container.querySelector(
			'[data-ui="Fade-bottom"]',
		) as HTMLElement;

		// User token tweaks should override component variant rules, slot tweaks work
		expect(topElement?.className).toBe(
			"token-tweak via-default to-black/80 fade-top-base absolute top-0 slot-tweak",
		);
		expect(bottomElement?.className).toBe(
			"token-tweak via-default to-black/80 fade-bottom-base absolute bottom-0",
		);
	});
});
