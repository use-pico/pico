/**
 * Recursive proxy; used to hack the type system.
 * This creates an infinite chain of proxies that allows for complex type manipulation
 * without actually creating real objects at runtime.
 */
export const proxyOf: any = new Proxy(() => proxyOf, {
	get: () => proxyOf,
});
