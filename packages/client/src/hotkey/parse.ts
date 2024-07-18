import { type KeyboardEvent as CoolKeyboardEvent } from "react";

interface Modifiers {
	alt: boolean;
	ctrl: boolean;
	meta: boolean;
	mod: boolean;
	shift: boolean;
}

type Hotkey = Modifiers & {
	key?: string;
};

type CheckHotkeyMatch = (event: KeyboardEvent) => boolean;

export function parse(hotkey: string): Hotkey {
	const keys = hotkey
		.toLowerCase()
		.split("+")
		.map((part) => part.trim());
	return {
		...({
			alt: keys.includes("alt"),
			ctrl: keys.includes("ctrl"),
			meta: keys.includes("meta"),
			mod: keys.includes("mod"),
			shift: keys.includes("shift"),
		} satisfies Modifiers),
		key: keys.find(
			(key) => !["alt", "ctrl", "meta", "shift", "mod"].includes(key),
		),
	};
}

function isHotkey(hotkey: Hotkey, event: KeyboardEvent): boolean {
	const { alt, ctrl, meta, mod, shift, key } = hotkey;
	const { altKey, ctrlKey, metaKey, shiftKey, key: pressedKey } = event;

	if (alt !== altKey) {
		return false;
	}

	if (mod) {
		if (!ctrlKey && !metaKey) {
			return false;
		}
	} else {
		if (ctrl !== ctrlKey) {
			return false;
		}
		if (meta !== metaKey) {
			return false;
		}
	}
	if (shift !== shiftKey) {
		return false;
	}

	return Boolean(
		key &&
			(pressedKey.toLowerCase() === key.toLowerCase() ||
				event.code.replace("Key", "").toLowerCase() === key.toLowerCase()),
	);
}

export function matcher(hotkey: string): CheckHotkeyMatch {
	return (event) => isHotkey(parse(hotkey), event);
}

export namespace withHandler {
	export interface Options {
		preventDefault?: boolean;
	}

	export type Item = [string, (event: any) => void, Options?];
}

export function withHandler(hotkeys: withHandler.Item[]) {
	return (event: CoolKeyboardEvent<HTMLElement> | KeyboardEvent) => {
		const $event = "nativeEvent" in event ? event.nativeEvent : event;
		hotkeys.forEach(([hotkey, handler, options = { preventDefault: true }]) => {
			if (matcher(hotkey)($event)) {
				if (options.preventDefault) {
					event.preventDefault();
				}
				handler($event);
			}
		});
	};
}
