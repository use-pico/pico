interface Translator {
	text: (text: string) => string;
	rich: (text: string) => string;
}

export const test1 = (translator: Translator) => {
	translator.text("Object method call");
};

export const test2 = (translator: Translator) => {
	translator.rich("Rich text call");
};

export const test3 = (translator: Translator) => {
	translator.text(`Template ${Math.random()}`);
};
