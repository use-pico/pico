import xx from "xxhash-wasm";

export const createHasher = async () => {
	const wasm = await xx();
	return wasm.h64;
};
