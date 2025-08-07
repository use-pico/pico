import { describe, expect, it } from "bun:test";
import { cls } from "../src/cls";

// Base PicoCls (shared across tests)
void cls(
	{
		tokens: {
			// Primary
			"primary.textColor": [
				"default",
				"hover",
			],
			"primary.borderColor": [
				"default",
				"hover",
			],
			// Secondary
			"secondary.textColor": [
				"default",
				"hover",
			],
			"secondary.borderColor": [
				"default",
				"hover",
			],
		},
		slot: [],
		variant: {
			theme: [
				"light",
				"dark",
			],
		},
	},
	{
		token: {
			// Primary
			"primary.textColor": {
				default: [
					"text-slate-900",
				],
				hover: [
					"text-slate-950",
				],
			},
			"primary.borderColor": {
				default: [
					"border-blue-600",
				],
				hover: [
					"border-blue-700",
				],
			},
			// Secondary
			"secondary.textColor": {
				default: [
					"text-gray-900",
				],
				hover: [
					"text-gray-950",
				],
			},
			"secondary.borderColor": {
				default: [
					"border-gray-400",
				],
				hover: [
					"border-gray-500",
				],
			},
		},
		rule: [],
		defaults: {
			theme: "light",
		},
	},
);

describe("TDD", () => {
	it("minimal button with two slots applies classes", () => {
		const ButtonCls = cls(
			{
				tokens: {},
				slot: [
					"root",
					"label",
				],
				variant: {},
			},
			{
				token: {},
				rule: [
					{
						slot: {
							root: {
								class: [
									"inline-flex",
									"items-center",
								],
							},
							label: {
								class: [
									"font-medium",
								],
							},
						},
					},
				],
				defaults: {},
			},
		);

		const classes = ButtonCls.create({});
		expect(classes.root).toBe("inline-flex items-center");
		expect(classes.label).toBe("font-medium");
	});

	it("variant rules apply size-specific classes", () => {
		const ButtonCls = cls(
			{
				tokens: {},
				slot: [
					"root",
					"label",
				],
				variant: {
					size: [
						"sm",
						"md",
					],
				},
			},
			{
				token: {},
				rule: [
					{
						slot: {
							root: {
								class: [
									"inline-flex",
									"items-center",
								],
							},
							label: {
								class: [
									"font-medium",
								],
							},
						},
					},
					{
						match: {
							size: "sm",
						},
						slot: {
							root: {
								class: [
									"px-2",
									"py-1",
								],
							},
							label: {
								class: [
									"text-sm",
								],
							},
						},
					},
					{
						match: {
							size: "md",
						},
						slot: {
							root: {
								class: [
									"px-4",
									"py-2",
								],
							},
							label: {
								class: [
									"text-base",
								],
							},
						},
					},
				],
				defaults: {
					size: "md",
				},
			},
		);

		const classesSm = ButtonCls.create({
			variant: {
				size: "sm",
			},
		});
		expect(classesSm.root).toBe("inline-flex items-center px-2 py-1");
		expect(classesSm.label).toBe("font-medium text-sm");

		const classesMd = ButtonCls.create({});
		expect(classesMd.root).toBe("inline-flex items-center px-4 py-2");
		expect(classesMd.label).toBe("font-medium text-base");
	});

	it("token references apply resolved classes alongside variant rules", () => {
		const ButtonCls = cls(
			{
				tokens: {
					"primary.textColor": [
						"default",
					],
					"primary.bgColor": [
						"default",
					],
				},
				slot: [
					"root",
					"label",
				],
				variant: {
					size: [
						"sm",
						"md",
					],
				},
			},
			{
				token: {
					"primary.textColor": {
						default: [
							"text-blue-600",
						],
					},
					"primary.bgColor": {
						default: [
							"bg-blue-600",
						],
					},
				},
				rule: [
					{
						slot: {
							root: {
								token: [
									"primary.bgColor.default",
								],
							},
							label: {
								token: [
									"primary.textColor.default",
								],
							},
						},
					},
					{
						match: {
							size: "sm",
						},
						slot: {
							root: {
								class: [
									"px-2",
									"py-1",
								],
							},
							label: {
								class: [
									"text-sm",
								],
							},
						},
					},
					{
						match: {
							size: "md",
						},
						slot: {
							root: {
								class: [
									"px-4",
									"py-2",
								],
							},
							label: {
								class: [
									"text-base",
								],
							},
						},
					},
				],
				defaults: {
					size: "md",
				},
			},
		);

		const classesSm = ButtonCls.create({
			variant: {
				size: "sm",
			},
		});
		expect(classesSm.root).toBe("bg-blue-600 px-2 py-1");
		expect(classesSm.label).toBe("text-blue-600 text-sm");

		const classesMd = ButtonCls.create({});
		expect(classesMd.root).toBe("bg-blue-600 px-4 py-2");
		expect(classesMd.label).toBe("text-blue-600 text-base");
	});

	it("rules can mix token and class on the same slot", () => {
		const ButtonCls = cls(
			{
				tokens: {
					"primary.textColor": [
						"default",
					],
					"primary.bgColor": [
						"default",
					],
					"primary.shadowColor": [
						"default",
					],
				},
				slot: [
					"root",
					"label",
				],
				variant: {
					size: [
						"sm",
						"md",
					],
				},
			},
			{
				token: {
					"primary.textColor": {
						default: [
							"text-blue-600",
						],
					},
					"primary.bgColor": {
						default: [
							"bg-blue-600",
						],
					},
					"primary.shadowColor": {
						default: [
							"shadow-blue-600",
						],
					},
				},
				rule: [
					{
						slot: {
							root: {
								token: [
									"primary.bgColor.default",
								],
								class: [
									"inline-flex",
									"items-center",
								],
							},
							label: {
								token: [
									"primary.textColor.default",
								],
								class: [
									"font-medium",
								],
							},
						},
					},
					{
						match: {
							size: "sm",
						},
						slot: {
							root: {
								class: [
									"px-2",
									"py-1",
								],
								token: [
									"primary.shadowColor.default",
								],
							},
							label: {
								class: [
									"text-sm",
								],
								token: [
									"primary.textColor.default",
								],
							},
						},
					},
					{
						match: {
							size: "md",
						},
						slot: {
							root: {
								class: [
									"px-4",
									"py-2",
								],
								token: [
									"primary.shadowColor.default",
								],
							},
							label: {
								class: [
									"text-base",
								],
							},
						},
					},
				],
				defaults: {
					size: "md",
				},
			},
		);

		const classesSm = ButtonCls.create({
			variant: {
				size: "sm",
			},
		});
		expect(classesSm.root).toBe(
			"inline-flex items-center bg-blue-600 px-2 py-1 shadow-blue-600",
		);
		expect(classesSm.label).toBe("font-medium text-sm text-blue-600");

		const classesMd = ButtonCls.create({});
		expect(classesMd.root).toBe(
			"inline-flex items-center bg-blue-600 px-4 py-2 shadow-blue-600",
		);
		expect(classesMd.label).toBe("font-medium text-blue-600 text-base");
	});

	it("override rule resets previous slot styles", () => {
		const ButtonCls = cls(
			{
				tokens: {
					"primary.textColor": [
						"default",
					],
					"primary.bgColor": [
						"default",
					],
					"primary.shadowColor": [
						"default",
					],
				},
				slot: [
					"root",
					"label",
				],
				variant: {},
			},
			{
				token: {
					"primary.textColor": {
						default: [
							"text-blue-600",
						],
					},
					"primary.bgColor": {
						default: [
							"bg-blue-600",
						],
					},
					"primary.shadowColor": {
						default: [
							"shadow-blue-600",
						],
					},
				},
				rule: [
					// Base rule without match
					{
						slot: {
							root: {
								class: [
									"inline-flex",
									"items-center",
								],
								token: [
									"primary.bgColor.default",
								],
							},
							label: {
								class: [
									"font-medium",
								],
								token: [
									"primary.textColor.default",
								],
							},
						},
					},
					// Override rule without match
					{
						override: true,
						slot: {
							root: {
								class: [
									"block",
								],
								token: [
									"primary.shadowColor.default",
								],
							},
							label: {
								class: [
									"text-lg",
								],
								token: [
									"primary.textColor.default",
								],
							},
						},
					},
				],
				defaults: {},
			},
		);

		const classes = ButtonCls.create({});
		expect(classes.root).toBe("block shadow-blue-600");
		expect(classes.label).toBe("text-lg text-blue-600");
	});

	it("create-time token overrides replace resolved token classes", () => {
		const ButtonCls = cls(
			{
				tokens: {
					"primary.textColor": [
						"default",
					],
					"primary.bgColor": [
						"default",
					],
					"primary.shadowColor": [
						"default",
					],
				},
				slot: [
					"root",
					"label",
				],
				variant: {
					size: [
						"sm",
						"md",
					],
				},
			},
			{
				token: {
					"primary.textColor": {
						default: [
							"text-blue-600",
						],
					},
					"primary.bgColor": {
						default: [
							"bg-blue-600",
						],
					},
					"primary.shadowColor": {
						default: [
							"shadow-blue-600",
						],
					},
				},
				rule: [
					{
						slot: {
							root: {
								class: [
									"inline-flex",
									"items-center",
								],
								token: [
									"primary.bgColor.default",
								],
							},
							label: {
								class: [
									"font-medium",
								],
								token: [
									"primary.textColor.default",
								],
							},
						},
					},
					{
						match: {
							size: "sm",
						},
						slot: {
							root: {
								class: [
									"px-2",
									"py-1",
								],
								token: [
									"primary.shadowColor.default",
								],
							},
							label: {
								class: [
									"text-sm",
								],
								token: [
									"primary.textColor.default",
								],
							},
						},
					},
					{
						match: {
							size: "md",
						},
						slot: {
							root: {
								class: [
									"px-4",
									"py-2",
								],
								token: [
									"primary.shadowColor.default",
								],
							},
							label: {
								class: [
									"text-base",
								],
							},
						},
					},
				],
				defaults: {
					size: "md",
				},
			},
		);

		const classesSm = ButtonCls.create({
			variant: {
				size: "sm",
			},
			token: {
				"primary.textColor": {
					default: [
						"text-red-600",
					],
				},
				"primary.bgColor": {
					default: [
						"bg-red-600",
					],
				},
				"primary.shadowColor": {
					default: [
						"shadow-red-600",
					],
				},
			},
		});
		expect(classesSm.root).toBe(
			"inline-flex items-center bg-red-600 px-2 py-1 shadow-red-600",
		);
		expect(classesSm.label).toBe("font-medium text-sm text-red-600");

		const classesMd = ButtonCls.create({
			token: {
				"primary.textColor": {
					default: [
						"text-red-600",
					],
				},
				"primary.bgColor": {
					default: [
						"bg-red-600",
					],
				},
				"primary.shadowColor": {
					default: [
						"shadow-red-600",
					],
				},
			},
		});
		expect(classesMd.root).toBe(
			"inline-flex items-center bg-red-600 px-4 py-2 shadow-red-600",
		);
		expect(classesMd.label).toBe("font-medium text-red-600 text-base");
	});
});
