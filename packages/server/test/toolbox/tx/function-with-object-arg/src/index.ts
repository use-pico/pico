// Function that accepts object - should NOT extract from object properties
const fooWithObject = (opts: { bla: string }) => opts;

fooWithObject({
	bla: "",
});
fooWithObject({
	bla: "should not extract",
});

// Function that accepts string - SHOULD extract
const foo = (text: string) => text;

foo("This should be extracted");
