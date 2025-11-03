import { type SyntheticEvent, useCallback } from "react";

export const useStopEvent = () => {
	return useCallback((event: SyntheticEvent) => {
		event.preventDefault();
		event.stopPropagation();
	}, []);
};
