export namespace EventBus {
	export type Handler<T = unknown> = (event: T) => void;
	export type WildcardHandler<T = Record<string, unknown>> = (
		type: keyof T,
		event: T[keyof T],
	) => void;

	export type EventHandlerList<T = unknown> = Handler<T>[];
	export type WildCardEventHandlerList<T = Record<string, unknown>> =
		WildcardHandler<T>[];

	export type EventHandlerMap<TEvents extends object> = Map<
		keyof TEvents | "*",
		| EventHandlerList<TEvents[keyof TEvents]>
		| WildCardEventHandlerList<TEvents>
	>;
}

export interface EventBus<TEvents extends object> {
	/**
	 * A Map of event names to registered handler functions.
	 */
	all: EventBus.EventHandlerMap<TEvents>;
	/**
	 * Register an event handler for the given type.
	 * @param {string|symbol} type Type of event to listen for, or `'*'` for all events
	 * @param {Function} handler Function to call in response to given event
	 * @memberOf mitt
	 */
	on<Key extends keyof TEvents>(
		type: Key,
		handler: EventBus.Handler<TEvents[Key]>,
	): void;
	on(type: "*", handler: EventBus.WildcardHandler<TEvents>): void;

	/**
	 * Remove an event handler for the given type.
	 * If `handler` is omitted, all handlers of the given type are removed.
	 * @param {string|symbol} type Type of event to unregister `handler` from (`'*'` to remove a wildcard handler)
	 * @param {Function} [handler] Handler function to remove
	 * @memberOf mitt
	 */
	off<Key extends keyof TEvents>(
		type: Key,
		handler?: EventBus.Handler<TEvents[Key]>,
	): void;
	off(type: "*", handler: EventBus.WildcardHandler<TEvents>): void;

	/**
	 * Invoke all handlers for the given type.
	 * If present, `'*'` handlers are invoked after type-matched handlers.
	 *
	 * Note: Manually firing '*' handlers is not supported.
	 *
	 * @param {string|symbol} type The event type to invoke
	 * @param {Any} [evt] Any value (object is recommended and powerful), passed to each handler
	 * @memberOf mitt
	 */
	emit<Key extends keyof TEvents>(type: Key, event: TEvents[Key]): void;
	emit<Key extends keyof TEvents>(
		type: undefined extends TEvents[Key] ? Key : never,
	): void;
}

export function EventBus<TEvents extends object>(
	all?: EventBus.EventHandlerMap<TEvents>,
): EventBus<TEvents> {
	type GenericEventHandler =
		| EventBus.Handler<TEvents[keyof TEvents]>
		| EventBus.WildcardHandler<TEvents>;

	all ||= new Map();

	return {
		all,
		on<Key extends keyof TEvents>(type: Key, handler: GenericEventHandler) {
			const handlers: GenericEventHandler[] | undefined = all.get(type);
			if (handlers) {
				handlers.push(handler);
			} else {
				all.set(type, [
					handler,
				] as EventBus.EventHandlerList<TEvents[keyof TEvents]>);
			}
		},

		off<Key extends keyof TEvents>(
			type: Key,
			handler?: GenericEventHandler,
		) {
			const handlers: GenericEventHandler[] | undefined = all.get(type);
			if (handlers) {
				if (handler) {
					handlers.splice(handlers.indexOf(handler) >>> 0, 1);
				} else {
					all.set(type, []);
				}
			}
		},

		emit<Key extends keyof TEvents>(type: Key, event?: TEvents[Key]) {
			let handlers = all.get(type);
			if (handlers && event) {
				(handlers as EventBus.EventHandlerList<TEvents[keyof TEvents]>)
					.slice()
					.forEach((h) => h(event));
			}
			handlers = all.get("*");
			if (handlers && event) {
				(handlers as EventBus.WildCardEventHandlerList<TEvents>)
					.slice()
					.forEach((h) => h(type, event));
			}
		},
	};
}
