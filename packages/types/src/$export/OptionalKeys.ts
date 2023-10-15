export type OptionalKeys<T> = { [K in keyof T]-?: Record<string, unknown> extends { [P in K]: T[K] } ? K : never }[keyof T];
