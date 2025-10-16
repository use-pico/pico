const foo = (opts: { bla: string }) => opts;

// This should NOT extract the empty string from object literal
foo({
	bla: "",
});

// This should NOT extract "value" from object literal
foo({
	bla: "value",
});

// Only function calls that match the sources should extract
const t = (text: string) => text;

// This SHOULD extract
t("Extract me");
