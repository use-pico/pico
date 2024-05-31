export const proxyOf: any = new Proxy(() => proxyOf, {
	get: () => proxyOf,
});
