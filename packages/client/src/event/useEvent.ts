import type { EventBus } from "@use-pico/common";
import { useEffect } from "react";

export namespace useEvent {
	export interface Props<TEvents extends object> {
		eventBus: EventBus<TEvents>;
		event: keyof TEvents;
		callback(event: TEvents[keyof TEvents]): void;
	}
}

export const useEvent = <TEvents extends object>({
	eventBus,
	event,
	callback,
}: useEvent.Props<TEvents>) => {
	useEffect(() => {
		eventBus.on(event, callback);

		return () => {
			eventBus.off(event, callback);
		};
	}, []);
};
