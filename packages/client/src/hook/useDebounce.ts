"use client";

import {
    type SetStateAction,
    useCallback,
    useEffect,
    useRef,
    useState
} from "react";

// eslint-disable-next-line max-params
export function useDebounce<T = any>(
    defaultValue: T,
    callback: (value: T) => void,
    wait: number,
    options = {leading: false}
) {
    const [debounced, setDebounced] = useState(defaultValue);
    const [value, setValue] = useState(defaultValue);
    const timeoutRef = useRef<number | null>(null);
    const leadingRef = useRef(true);

    const clearTimeout = () => window.clearTimeout(timeoutRef.current || undefined);
    useEffect(() => clearTimeout, []);

    useEffect(() => {
        callback(debounced);
    }, [debounced]);
    useEffect(() => {
        setValue(defaultValue);
        setDebounced(defaultValue);
    }, [defaultValue]);

    const debouncedSetValue = useCallback(
        (newValue: SetStateAction<T>) => {
            setValue(newValue);
            clearTimeout();
            if (leadingRef.current && options.leading) {
                setDebounced(newValue);
            } else {
                timeoutRef.current = window.setTimeout(() => {
                    leadingRef.current = true;
                    setDebounced(newValue);
                }, wait);
            }
            leadingRef.current = false;
        },
        [options.leading]
    );

    return [
        value,
        debouncedSetValue,
    ] as const;
}
