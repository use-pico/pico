export namespace TranslationSource {
	export interface Jsx {
		name: string;
		attr: string;
	}

	export interface Function {
		name: string;
	}

	export interface Object {
		object: string;
		name: string;
	}

	export interface Sources {
		jsx: Jsx[];
		functions: Function[];
		objects: Object[];
	}
}
