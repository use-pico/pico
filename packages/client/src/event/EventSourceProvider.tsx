import type {FC, PropsWithChildren} from "react";

export namespace EventSourceProvider {
	export type Props = PropsWithChildren;
}

export const EventSourceProvider: FC<EventSourceProvider.Props> = (
	{
		children,
	}
) => {
	// const eventSource = useRef<EventSource>();
	//
	// useEffect(() => {
	// 	if (eventSource.current) {
	// 		return;
	// 	}
	// 	eventSource.current = new EventSource(process.env.NEXT_PUBLIC_BLACKFOX_URL + "/api/event-source", {withCredentials: true});
	// 	eventSource.current.onopen = () => {
	// 		console.log('EvenSource Connected!');
	// 	};
	// 	eventSource.current.onerror = (e) => {
	// 		console.log('EvenSource Error!', e);
	// 	};
	// 	eventSource.current.addEventListener('ping', (event) => {
	// 		console.log(event);
	// 	});
	// }, []);

	return children;
};
