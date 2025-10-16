/** biome-ignore-all lint/correctness/noUnusedFunctionParameters: test */
const t = (text: string) => text;

// This should NOT be extracted - object literal argument
export const test1 = () => {
	const foo = (opts: { message: string }) => opts;
	foo({
		message: "should not extract",
	});
};

// This should NOT be extracted - second argument
export const test2 = () => {
	const bar = (id: number, text: string) => text;
	bar(1, "should not extract second arg");
};

// This should NOT be extracted - empty string in object
export const test3 = () => {
	const baz = (config: { bla: string }) => config;
	baz({
		bla: "",
	});
};

// This SHOULD be extracted - first argument is string
export const test4 = () => {
	t("Should extract this");
};

// This SHOULD be extracted - first argument is template
export const test5 = () => {
	t(`Should extract template`);
};

// This should NOT be extracted - string in array
export const test6 = () => {
	const qux = (items: string[]) => items;
	qux([
		"should not extract from array",
	]);
};

interface Translator {
	text: (text: string) => string;
}

// This should NOT be extracted - object method with object argument
export const test7 = (translator: Translator) => {
	const process = (obj: { data: string }) => obj;
	process({
		data: "should not extract",
	});
};

// This SHOULD be extracted - object method with string argument
export const test8 = (translator: Translator) => {
	translator.text("Should extract from translator");
};
