export namespace TokenType {
	export type Tokens = [
		string,
		...string[],
	];

	export type Mode = "required" | "any";

	export type Result =
		| {
				success: true;
		  }
		| {
				success: false;
				missing: string[];
		  };
}
