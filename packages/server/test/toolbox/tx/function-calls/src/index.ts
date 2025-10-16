const t = (text: string) => text;
const literal = "test";

export const test1 = () => {
	t("Simple function call");
};

export const test2 = () => {
	t(`Template ${literal} call`);
};

export const test3 = () => {
	t(`Template literal`);
};

export const test4 = () => {
	const mode = "any";
	return t(mode === "any" ? "Nested in ternary" : "Alternative branch");
};

const justCall = (_: string) => {
	return null;
};

justCall("foo");
