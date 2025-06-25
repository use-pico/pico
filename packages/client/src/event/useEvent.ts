import type { EventBus } from "@use-pico/common";
import { type DependencyList, useEffect } from "react";

export namespace useEvent {
	export interface Props<TEvents extends object> {
		eventBus: EventBus<TEvents>;
		event: keyof TEvents;
		callback(event: TEvents[keyof TEvents]): void;
		deps?: DependencyList[];
	}
}

export const useEvent = <TEvents extends object>({
	eventBus,
	event,
	callback,
	deps = [],
}: useEvent.Props<TEvents>) => {
	useEffect(() => {
		console.info(`[useEvent]\tSubscribing event [${event as string}]`);
		eventBus.on(event, callback);

		return () => {
			console.info(
				`[useEvent]\tUnsubscribing from event [${event as string}]`,
			);
			eventBus.off(event, callback);
		};
	}, [
		eventBus,
		event,
		callback,
		...deps,
	]);
};
