export type OptionalId<T> = Omit<T, "id"> & {
	id?: string | undefined;
};
