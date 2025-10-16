const foo = (opts: { bla: string }) => opts;

// When foo is in sources, this should NOT extract the object literal property
foo({
	bla: "",
});
foo({
	bla: "should not extract",
});

// This SHOULD extract - first argument is a string
foo("This should be extracted" as any);
