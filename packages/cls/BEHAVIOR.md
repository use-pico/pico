# CLS Behavior Guide

This document summarizes how the cls engine behaves at runtime and what you can rely on when defining contracts and rules.

## Concepts
- Contract: `tokens`, `slot`, `variant` (can extend a parent contract)
- Definition: `token`, `rule`, `defaults`
- Result: `create(config)` returns a lazy Proxy of slot class strings

## Ordering (deterministic)
1) Merge defaults (including inheritance)
2) Apply create-time `token` overrides to the token index
3) Merge create-time `variant` with defaults
4) Evaluate rules in order (all that match contribute)
   - If `override: true`, reset affected slot(s) at that moment
   - Within each step: apply `class` first, then resolve `token`
5) Apply create-time `slot` appends (class → token)
6) Apply create-time `override` replacements (class → token)
7) Merge with tailwind-merge (`tvc`)

## Tokens
- Parent→child layering builds a token index
- If a child contract explicitly re-declares a token group and value, that value REPLACES previous classes
- Otherwise classes APPEND
- Create-time `token` overrides REPLACE for that call only

## Variants
- Values come from merged `defaults` + create-time `variant`
- Special value `"bool"` in a contract becomes a boolean in TS

## Slots (lazy)
- Only computed when accessed on the returned Proxy; cached afterward

## Inheritance
- Parents contribute tokens/slots/variants; children can add/extend
- `rule` arrays concatenate parent-first; `defaults` merge (child overwrites same keys)

## Runtime rules
- Unknown slots/variants are ignored
- Missing tokens resolve to empty classes

## Examples
Minimal
```ts
const C = cls(
  { tokens: {}, slot: ["root"], variant: {} },
  { token: {}, rule: [{ slot: { root: { class: ["inline-flex"] } } }], defaults: {} },
);
C.create({}).root; // "inline-flex"
```

Token + variant
```ts
const B = cls(
  { tokens: { "primary.bg": ["default"] }, slot: ["root"], variant: { size: ["sm","md"] } },
  { token: { "primary.bg": { default: ["bg-blue-600"] } }, rule: [
    { match: { size: "sm" }, slot: { root: { class: ["px-2","py-1"], token: ["primary.bg.default"] } } },
    { match: { size: "md" }, slot: { root: { class: ["px-4","py-2"], token: ["primary.bg.default"] } } },
  ], defaults: { size: "md" } },
);
```
