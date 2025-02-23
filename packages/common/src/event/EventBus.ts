export namespace EventBus {
	export type EventType = string | symbol;
	export type Handler<T = unknown> = (event: T) => void;
	export type WildcardHandler<T = Record<string, unknown>> = (
		type: keyof T,
		event: T[keyof T],
	) => void;

	export type EventHandlerList<T = unknown> = Handler<T>[];
	export type WildCardEventHandlerList<T = Record<string, unknown>> =
		WildcardHandler<T>[];

	export type EventHandlerMap<Events extends Record<EventType, unknown>> = Map<
		keyof Events | "*",
		EventHandlerList<Events[keyof Events]> | WildCardEventHandlerList<Events>
	>;
}

export interface EventBus<Events extends Record<EventBus.EventType, unknown>> {
	/**
	 * A Map of event names to registered handler functions.
	 */
	all: EventBus.EventHandlerMap<Events>;

	/**
	 * Register an event handler for the given type.
	 * @param {string|symbol} type Type of event to listen for, or `'*'` for all events
	 * @param {Function} handler Function to call in response to given event
	 * @memberOf mitt
	 */
	on<Key extends keyof Events>(
		type: Key,
		handler: EventBus.Handler<Events[Key]>,
	): void;
	on(type: "*", handler: EventBus.WildcardHandler<Events>): void;

	/**
	 * Remove an event handler for the given type.
	 * If `handler` is omitted, all handlers of the given type are removed.
	 * @param {string|symbol} type Type of event to unregister `handler` from (`'*'` to remove a wildcard handler)
	 * @param {Function} [handler] Handler function to remove
	 * @memberOf mitt
	 */
	off<Key extends keyof Events>(
		type: Key,
		handler?: EventBus.Handler<Events[Key]>,
	): void;
	off(type: "*", handler: EventBus.WildcardHandler<Events>): void;

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
	emit<Key extends keyof Events>(type: Key, event: Events[Key]): void;
	emit<Key extends keyof Events>(
		type: undefined extends Events[Key] ? Key : never,
	): void;
}

export default function EventBus<
	Events extends Record<EventBus.EventType, unknown>,
>(all?: EventBus.EventHandlerMap<Events>): EventBus<Events> {
	type GenericEventHandler =
		| EventBus.Handler<Events[keyof Events]>
		| EventBus.WildcardHandler<Events>;
	all ||= new Map();

	return {
		all,
		on<Key extends keyof Events>(type: Key, handler: GenericEventHandler) {
			const handlers: GenericEventHandler[] | undefined = all!.get(type);
			if (handlers) {
				handlers.push(handler);
			} else {
				all!.set(type, [handler] as EventBus.EventHandlerList<
					Events[keyof Events]
				>);
			}
		},

		off<Key extends keyof Events>(type: Key, handler?: GenericEventHandler) {
			const handlers: GenericEventHandler[] | undefined = all!.get(type);
			if (handlers) {
				if (handler) {
					handlers.splice(handlers.indexOf(handler) >>> 0, 1);
				} else {
					all!.set(type, []);
				}
			}
		},

		emit<Key extends keyof Events>(type: Key, evt?: Events[Key]) {
			let handlers = all!.get(type);
			if (handlers) {
				(handlers as EventBus.EventHandlerList<Events[keyof Events]>)
					.slice()
					.forEach((handler) => {
						handler(evt!);
					});
			}

			handlers = all!.get("*");
			if (handlers) {
				(handlers as EventBus.WildCardEventHandlerList<Events>)
					.slice()
					.forEach((handler) => {
						handler(type, evt!);
					});
			}
		},
	};
}
