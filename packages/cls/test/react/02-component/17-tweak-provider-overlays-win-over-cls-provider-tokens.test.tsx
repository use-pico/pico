import { render } from "@testing-library/react";
import type { FC } from "react";
import { describe, expect, it } from "vitest";
import { contract, TokenContext, useCls, withCls, wrap } from "../../../src";

const TagCls = contract()
	.tokens([
		"t1",
		"t2",
	])
	.slots([
		"root",
	])
	.def()
	.token({
		t2: {
			class: [
				"T2",
			],
		},
		t1: {
			token: [
				"t2",
			],
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
				"R",
			],
		},
	})
	.cls();

const TagClsWrap = wrap(TagCls);

const ProviderTokens = contract()
	.tokens([
		"t1",
		"t2",
	])
	.slots([
		"root",
	])
	.def()
	.token({
		t2: {
			class: [
				"CTX2",
			],
		},
		t1: {
			class: [
				"CTX1",
			],
		},
	})
	.root({
		root: {
			class: [
				"CTX",
			],
		},
	})
	.cls();

interface TagProps {
	cls?: typeof TagCls;
}

const BaseTag: FC<TagProps> = ({ cls = TagCls }) => {
	const { slots } = useCls(cls);
	return (
		<span
			data-ui="Tag-root"
			className={slots.root()}
		/>
	);
};

const Tag = withCls(BaseTag, TagCls);

describe("react/02-component/tweak-provider-overlays-win-over-cls-provider-tokens", () => {
	it("TweakProvider token overlays replace ClsProvider tokens for same keys", () => {
		const { container } = render(
			<TokenContext value={ProviderTokens}>
				<TagClsWrap.TweakProvider
					tweak={{
						token: {
							t1: {
								class: [
									"USER1",
								],
							},
							t2: {
								class: [
									"USER2",
								],
							},
						},
					}}
				>
					<Tag />
				</TagClsWrap.TweakProvider>
			</TokenContext>,
		);
		const root = container.querySelector(
			'[data-ui="Tag-root"]',
		) as HTMLElement;
		// USER1 (t1) replaces chain; t2 overlay not surfaced directly
		expect(root?.className).toBe("USER1 R");
	});
});
