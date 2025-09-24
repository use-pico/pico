#!/usr/bin/env bun
import { performance } from "node:perf_hooks";
import { contract } from "./src";

// Memory measurement utility
function measureMemory() {
	if (global.gc) {
		global.gc();
	}
	const memUsage = process.memoryUsage();
	return {
		rss: Math.round(memUsage.rss / 1024 / 1024), // MB
		heapUsed: Math.round(memUsage.heapUsed / 1024 / 1024), // MB
		heapTotal: Math.round(memUsage.heapTotal / 1024 / 1024), // MB
	};
}

// Benchmark runner
async function runBenchmark<T>(
	name: string,
	setup: () => T,
	test: (instance: T) => void,
	iterations: number = 10000,
) {
	console.log(`\n🧪 Benchmarking: ${name}`);
	console.log(`📊 Iterations: ${iterations.toLocaleString()}`);

	// Setup
	const instance = setup();

	// Warmup
	for (let i = 0; i < 100; i++) {
		test(instance);
	}

	// Memory before
	const memBefore = measureMemory();

	// Benchmark
	const start = performance.now();
	for (let i = 0; i < iterations; i++) {
		test(instance);
	}
	const end = performance.now();

	// Memory after
	const memAfter = measureMemory();

	const duration = end - start;
	const opsPerSec = Math.round((iterations / duration) * 1000);
	const memDelta = {
		rss: memAfter.rss - memBefore.rss,
		heapUsed: memAfter.heapUsed - memBefore.heapUsed,
		heapTotal: memAfter.heapTotal - memBefore.heapTotal,
	};

	console.log(`⚡ Performance: ${opsPerSec.toLocaleString()} ops/sec`);
	console.log(`⏱️  Duration: ${duration.toFixed(2)}ms`);
	console.log(
		`🧠 Memory Delta: RSS=${memDelta.rss}MB, Heap=${memDelta.heapUsed}MB`,
	);

	return {
		name,
		iterations,
		opsPerSec,
		duration,
		memory: memDelta,
	};
}

// Very Simple: Slots only
function createVerySimple() {
	return contract()
		.slots([
			"root",
		])
		.def()
		.root({
			root: {
				class: [
					"base",
					"px-4",
					"py-2",
					"rounded",
				],
			},
		})
		.cls();
}

// Intermediate: Slots + Variants
function createIntermediate() {
	return contract()
		.slots([
			"root",
			"label",
		])
		.variant("size", [
			"sm",
			"md",
			"lg",
		])
		.variant("tone", [
			"default",
			"primary",
			"danger",
		])
		.bool("disabled")
		.def()
		.root({
			root: {
				class: [
					"flex",
					"items-center",
					"gap-2",
				],
			},
			label: {
				class: [
					"font-medium",
				],
			},
		})
		.match("size", "sm", {
			root: {
				class: [
					"px-3",
					"py-1",
					"text-sm",
				],
			},
		})
		.match("size", "md", {
			root: {
				class: [
					"px-4",
					"py-2",
					"text-base",
				],
			},
		})
		.match("size", "lg", {
			root: {
				class: [
					"px-6",
					"py-3",
					"text-lg",
				],
			},
		})
		.match("tone", "primary", {
			root: {
				class: [
					"bg-blue-600",
					"text-white",
				],
			},
		})
		.match("tone", "danger", {
			root: {
				class: [
					"bg-red-600",
					"text-white",
				],
			},
		})
		.match("disabled", true, {
			root: {
				class: [
					"opacity-50",
					"cursor-not-allowed",
				],
			},
		})
		.defaults({
			size: "md",
			tone: "default",
			disabled: false,
		})
		.cls();
}

// Advanced: Slots + Variants + Tokens
function createAdvanced() {
	return contract()
		.tokens([
			"color.bg.primary",
			"color.bg.danger",
			"color.text.primary",
			"color.text.danger",
			"spacing.padding.sm",
			"spacing.padding.md",
			"spacing.padding.lg",
			"typography.size.sm",
			"typography.size.md",
			"typography.size.lg",
		])
		.slots([
			"root",
			"label",
			"icon",
		])
		.variant("size", [
			"sm",
			"md",
			"lg",
		])
		.variant("tone", [
			"default",
			"primary",
			"danger",
		])
		.bool("disabled")
		.def()
		.token({
			"color.bg.primary": {
				class: [
					"bg-blue-600",
				],
			},
			"color.bg.danger": {
				class: [
					"bg-red-600",
				],
			},
			"color.text.primary": {
				class: [
					"text-white",
				],
			},
			"color.text.danger": {
				class: [
					"text-white",
				],
			},
			"spacing.padding.sm": {
				class: [
					"px-3",
					"py-1",
				],
			},
			"spacing.padding.md": {
				class: [
					"px-4",
					"py-2",
				],
			},
			"spacing.padding.lg": {
				class: [
					"px-6",
					"py-3",
				],
			},
			"typography.size.sm": {
				class: [
					"text-sm",
				],
			},
			"typography.size.md": {
				class: [
					"text-base",
				],
			},
			"typography.size.lg": {
				class: [
					"text-lg",
				],
			},
		})
		.tokens.rule(
			{
				tone: "primary",
			},
			{
				"color.bg.primary": {
					class: [
						"bg-blue-700",
					],
				},
			},
		)
		.tokens.rule(
			{
				tone: "danger",
			},
			{
				"color.bg.danger": {
					class: [
						"bg-red-700",
					],
				},
			},
		)
		.tokens.rule(
			{
				disabled: true,
			},
			{
				"color.bg.primary": {
					class: [
						"bg-gray-400",
					],
				},
				"color.bg.danger": {
					class: [
						"bg-gray-400",
					],
				},
			},
		)
		.root({
			root: {
				class: [
					"flex",
					"items-center",
					"gap-2",
				],
				token: [
					"spacing.padding.md",
					"typography.size.md",
				],
			},
			label: {
				class: [
					"font-medium",
				],
			},
			icon: {
				class: [
					"w-4",
					"h-4",
				],
			},
		})
		.match("size", "sm", {
			root: {
				token: [
					"spacing.padding.sm",
					"typography.size.sm",
				],
			},
		})
		.match("size", "lg", {
			root: {
				token: [
					"spacing.padding.lg",
					"typography.size.lg",
				],
			},
		})
		.match("tone", "primary", {
			root: {
				token: [
					"color.bg.primary",
					"color.text.primary",
				],
			},
		})
		.match("tone", "danger", {
			root: {
				token: [
					"color.bg.danger",
					"color.text.danger",
				],
			},
		})
		.match("disabled", true, {
			root: {
				class: [
					"opacity-50",
					"cursor-not-allowed",
				],
			},
		})
		.defaults({
			size: "md",
			tone: "default",
			disabled: false,
		})
		.cls();
}

// Extreme: Previous + 2 levels of inheritance
function createExtreme() {
	// Base level
	const BaseButtonCls = contract()
		.tokens([
			"color.bg.base",
			"color.text.base",
			"spacing.padding.base",
			"typography.size.base",
		])
		.slots([
			"root",
		])
		.variant("size", [
			"sm",
			"md",
			"lg",
		])
		.def()
		.token({
			"color.bg.base": {
				class: [
					"bg-gray-100",
				],
			},
			"color.text.base": {
				class: [
					"text-gray-900",
				],
			},
			"spacing.padding.base": {
				class: [
					"px-4",
					"py-2",
				],
			},
			"typography.size.base": {
				class: [
					"text-base",
				],
			},
		})
		.root({
			root: {
				class: [
					"border",
					"rounded",
					"font-medium",
				],
				token: [
					"color.bg.base",
					"color.text.base",
					"spacing.padding.base",
					"typography.size.base",
				],
			},
		})
		.match("size", "sm", {
			root: {
				class: [
					"px-3",
					"py-1",
					"text-sm",
				],
			},
		})
		.match("size", "lg", {
			root: {
				class: [
					"px-6",
					"py-3",
					"text-lg",
				],
			},
		})
		.defaults({
			size: "md",
		})
		.cls();

	// First inheritance level
	const PrimaryButtonCls = contract(BaseButtonCls.contract)
		.tokens([
			"color.bg.primary",
			"color.text.primary",
		])
		.variant("tone", [
			"default",
			"primary",
		])
		.bool("disabled")
		.def()
		.token({
			"color.bg.primary": {
				class: [
					"bg-blue-600",
				],
			},
			"color.text.primary": {
				class: [
					"text-white",
				],
			},
		})
		.tokens.rule(
			{
				tone: "primary",
			},
			{
				"color.bg.base": {
					class: [
						"bg-blue-600",
					],
				},
				"color.text.base": {
					class: [
						"text-white",
					],
				},
			},
		)
		.tokens.rule(
			{
				disabled: true,
			},
			{
				"color.bg.base": {
					class: [
						"bg-gray-300",
					],
				},
				"color.text.base": {
					class: [
						"text-gray-500",
					],
				},
			},
		)
		.match("tone", "primary", {
			root: {
				class: [
					"shadow-md",
				],
			},
		})
		.match("disabled", true, {
			root: {
				class: [
					"opacity-50",
					"cursor-not-allowed",
				],
			},
		})
		.defaults({
			size: "md",
			tone: "default",
			disabled: false,
		})
		.cls();

	// Second inheritance level
	const ExtendedButtonCls = contract(PrimaryButtonCls.contract)
		.tokens([
			"color.bg.accent",
			"color.text.accent",
		])
		.slots([
			"icon",
			"badge",
		])
		.variant("style", [
			"solid",
			"outline",
			"ghost",
		])
		.def()
		.token({
			"color.bg.accent": {
				class: [
					"bg-purple-600",
				],
			},
			"color.text.accent": {
				class: [
					"text-white",
				],
			},
		})
		.tokens.rule(
			{
				style: "outline",
			},
			{
				"color.bg.base": {
					class: [
						"bg-transparent",
						"border-2",
						"border-blue-600",
					],
				},
				"color.text.base": {
					class: [
						"text-blue-600",
					],
				},
			},
		)
		.tokens.rule(
			{
				style: "ghost",
			},
			{
				"color.bg.base": {
					class: [
						"bg-transparent",
						"hover:bg-blue-50",
					],
				},
				"color.text.base": {
					class: [
						"text-blue-600",
					],
				},
			},
		)
		.root({
			icon: {
				class: [
					"w-4",
					"h-4",
				],
			},
			badge: {
				class: [
					"ml-2",
					"px-1",
					"py-0.5",
					"text-xs",
					"rounded-full",
					"bg-blue-100",
					"text-blue-800",
				],
			},
		})
		.match("style", "outline", {
			root: {
				class: [
					"border-blue-600",
				],
			},
		})
		.match("style", "ghost", {
			root: {
				class: [
					"hover:bg-blue-50",
				],
			},
		})
		.defaults({
			size: "md",
			tone: "default",
			disabled: false,
			style: "solid",
		})
		.cls();

	return ExtendedButtonCls;
}

// Test functions for each complexity level
function testVerySimple(cls: ReturnType<typeof createVerySimple>) {
	const { slots } = cls.create();
	slots.root();
}

function testIntermediate(cls: ReturnType<typeof createIntermediate>) {
	const { slots } = cls.create({
		variant: {
			size: "lg",
			tone: "primary",
			disabled: false,
		},
	});
	slots.root();
	slots.label();
}

function testAdvanced(cls: ReturnType<typeof createAdvanced>) {
	const { slots } = cls.create({
		variant: {
			size: "lg",
			tone: "primary",
			disabled: false,
		},
		token: {
			"color.bg.primary": {
				class: [
					"bg-indigo-600",
				],
			},
		},
	});
	slots.root();
	slots.label();
	slots.icon();
}

function testExtreme(cls: ReturnType<typeof createExtreme>) {
	const { slots } = cls.create({
		variant: {
			size: "lg",
			tone: "primary",
			disabled: false,
			style: "outline",
		},
		token: {
			"color.bg.primary": {
				class: [
					"bg-purple-600",
				],
			},
		},
		slot: {
			root: {
				class: [
					"shadow-lg",
				],
			},
		},
	});
	slots.root();
	slots.icon();
	slots.badge();
}

// Main benchmark runner
async function main() {
	console.log("🚀 CLS Performance Benchmark Suite");
	console.log("==================================");

	const results: Array<{
		name: string;
		iterations: number;
		opsPerSec: number;
		duration: number;
		memory: {
			rss: number;
			heapUsed: number;
			heapTotal: number;
		};
	}> = [];

	// Very Simple benchmarks
	results.push(
		await runBenchmark(
			"Very Simple (slots only) - 100 iterations",
			createVerySimple,
			testVerySimple,
			100,
		),
	);

	results.push(
		await runBenchmark(
			"Very Simple (slots only) - 1K iterations",
			createVerySimple,
			testVerySimple,
			1000,
		),
	);

	results.push(
		await runBenchmark(
			"Very Simple (slots only) - 100K iterations",
			createVerySimple,
			testVerySimple,
			100000,
		),
	);

	// Intermediate benchmarks
	results.push(
		await runBenchmark(
			"Intermediate (slots + variants) - 100 iterations",
			createIntermediate,
			testIntermediate,
			100,
		),
	);

	results.push(
		await runBenchmark(
			"Intermediate (slots + variants) - 1K iterations",
			createIntermediate,
			testIntermediate,
			1000,
		),
	);

	results.push(
		await runBenchmark(
			"Intermediate (slots + variants) - 100K iterations",
			createIntermediate,
			testIntermediate,
			100000,
		),
	);

	// Advanced benchmarks
	results.push(
		await runBenchmark(
			"Advanced (slots + variants + tokens) - 100 iterations",
			createAdvanced,
			testAdvanced,
			100,
		),
	);

	results.push(
		await runBenchmark(
			"Advanced (slots + variants + tokens) - 1K iterations",
			createAdvanced,
			testAdvanced,
			1000,
		),
	);

	results.push(
		await runBenchmark(
			"Advanced (slots + variants + tokens) - 100K iterations",
			createAdvanced,
			testAdvanced,
			100000,
		),
	);

	// Extreme benchmarks
	results.push(
		await runBenchmark(
			"Extreme (previous + 2 levels inheritance) - 100 iterations",
			createExtreme,
			testExtreme,
			100,
		),
	);

	results.push(
		await runBenchmark(
			"Extreme (previous + 2 levels inheritance) - 1K iterations",
			createExtreme,
			testExtreme,
			1000,
		),
	);

	results.push(
		await runBenchmark(
			"Extreme (previous + 2 levels inheritance) - 100K iterations",
			createExtreme,
			testExtreme,
			100000,
		),
	);

	// Summary
	console.log("\n📊 Benchmark Summary");
	console.log("===================");

	const summary = results.reduce(
		(acc, result) => {
			const key = result.name.split(" - ")[0];
			if (!acc[key]) {
				acc[key] = [];
			}
			acc[key].push(result);
			return acc;
		},
		{} as Record<string, typeof results>,
	);

	Object.entries(summary).forEach(([complexity, tests]) => {
		const hundredIter = tests.find((t) => t.iterations === 100);
		const thousandIter = tests.find((t) => t.iterations === 1000);
		const hundredKIter = tests.find((t) => t.iterations === 100000);

		console.log(`\n${complexity}:`);
		if (hundredIter) {
			console.log(
				`  100 iterations: ${hundredIter.opsPerSec.toLocaleString()} ops/sec`,
			);
		}
		if (thousandIter) {
			console.log(
				`  1K iterations: ${thousandIter.opsPerSec.toLocaleString()} ops/sec`,
			);
		}
		if (hundredKIter) {
			console.log(
				`  100K iterations: ${hundredKIter.opsPerSec.toLocaleString()} ops/sec`,
			);
			console.log(
				`  Memory delta: RSS=${hundredKIter.memory.rss}MB, Heap=${hundredKIter.memory.heapUsed}MB`,
			);
		}
	});

	console.log("\n✅ Benchmark completed!");
}

// Run benchmarks
main().catch(console.error);
