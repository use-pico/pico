"use client";

/**
 * Credits goes to Mantine:
 * https://github.com/mantinedev/mantine/blob/master/packages/%40mantine/hooks/src/use-hotkeys/use-hotkeys.ts
 */

import {useEffect} from "react";
import {
	matcher,
	withHandler
}                  from "./parse";

function isEvent(
	event: KeyboardEvent,
	tagsToIgnore: string[],
	triggerOnContentEditable = false
) {
	if (event.target instanceof HTMLElement) {
		if (triggerOnContentEditable) {
			return !tagsToIgnore.includes(event.target.tagName);
		}

		return !event.target.isContentEditable && !tagsToIgnore.includes(event.target.tagName);
	}

	return true;
}

export namespace useHotkeys {
	export type Item = [string, (event: KeyboardEvent) => void, withHandler.Options?];
}

export function useHotkeys(
	hotkeys: useHotkeys.Item[],
	tagsToIgnore: string[] = ["INPUT", "TEXTAREA", "SELECT"],
	triggerOnContentEditable = false
) {
	useEffect(() => {
		const keydownListener = (event: KeyboardEvent) => {
			hotkeys.forEach(([hotkey, handler, options = {preventDefault: true}]) => {
				if (
					matcher(hotkey)(event) &&
					isEvent(event, tagsToIgnore, triggerOnContentEditable)
				) {
					if (options.preventDefault) {
						event.preventDefault();
					}

					handler(event);
				}
			});
		};
		document.documentElement.addEventListener("keydown", keydownListener);
		return () => document.documentElement.removeEventListener("keydown", keydownListener);
	}, [hotkeys]);
}
