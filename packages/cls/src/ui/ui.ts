import { tvc } from "../utils/tvc";

/**
 * @internal
 */
type KebabCase<S extends string> = S extends `${infer Head}${infer Tail}`
	? Tail extends Uncapitalize<Tail>
		? `${Lowercase<Head>}${KebabCase<Tail>}`
		: `${Lowercase<Head>}-${KebabCase<Uncapitalize<Tail>>}`
	: S;

export namespace ui {
	export type Rest = object;

	/**
	 * @internal
	 */
	export type Data<TProps, T extends keyof TProps> = {
		[K in T as `data-ui-${KebabCase<K & string>}`]?: TProps[K];
	};

	export type Result<TProps> = Record<string, unknown> &
		Data<TProps, keyof TProps> & {
			"data-ui": string;
			className?: string;
		};

	export type Component<
		TProps extends object,
		TRest extends object = object,
	> = Omit<TRest, "className"> & {
		ui?: TProps;
		className?: tvc.ClassName;
	};

	/**
	 * Internal props used for "ui" method; this should not be used outside
	 *
	 * @template TProps - The type of props that can be converted to data attributes
	 */
	export interface Props<TProps extends object> {
		/**
		 * Base component identifier, becomes the `data-ui` attribute value
		 */
		name: string;
		/**
		 * Props to be converted to `data-ui-*` attributes
		 */
		ui?: TProps;
		/**
		 * Optional additional CSS classes to merge with the base `ui` class
		 */
		className: tvc.ClassName;
	}

	export type PropsEx<TProps extends object> = Omit<Props<TProps>, "name">;
}

export const ui = <const TProps extends object>({
	name,
	ui,
	className,
}: ui.Props<TProps>): ui.Result<TProps> => {
	const data: Record<string, unknown> = {};

	for (const [key, value] of Object.entries(ui ?? {})) {
		data[`data-ui-${key.replace(/[A-Z]/g, (m) => `-${m.toLowerCase()}`)}`] =
			value;
	}

	return {
		"data-ui": name,
		...data,
		className: tvc(name, className),
	};
};
