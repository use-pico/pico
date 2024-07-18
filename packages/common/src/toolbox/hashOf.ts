import hash from "object-hash";

/**
 * Generates a hash from the given input (could be even object or function).
 *
 * Useful when you want to listen on "useEffect" with an object as a dependency. Be careful as this method
 * could be quite slow, even it's somehow optimized.
 *
 * @group toolbox
 */
export const hashOf = (value: any) => {
	try {
		return JSON.stringify(value);
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
	} catch (e) {
		return hash(value, {
			algorithm:                 "sha1",
			encoding:                  "hex",
			ignoreUnknown:             true,
			respectType:               false,
			respectFunctionProperties: false,
			unorderedArrays:           true,
		});
	}
};
