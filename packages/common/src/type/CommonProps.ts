export type CommonProps<A, B> = {
	[K in Extract<keyof A, keyof B> as A[K] extends B[K]
		? B[K] extends A[K]
			? K
			: never
		: never]: A[K];
};
