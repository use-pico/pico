export type RequiredKeys<T> = { [K in keyof T]-?: Record<string, unknown> extends { [P in K]: T[K] } ? never : K }[keyof T];
