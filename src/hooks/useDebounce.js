/**
 * useDebounce — delays updating a value until the user stops changing it.
 *
 * DSA concept: Rate Limiting / Throttling
 * Without debounce, typing "islamic book" fires 12 API calls.
 * With debounce (400ms), it fires only 1 call after the user stops typing.
 *
 * Time complexity: O(1) per call — just sets/clears a timer.
 *
 * @param {any} value - The value to debounce
 * @param {number} delay - Milliseconds to wait (default 400ms)
 * @returns {any} The debounced value
 */
import { useState, useEffect } from 'react';

export default function useDebounce(value, delay = 400) {
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
        // Set a timer to update the debounced value after `delay` ms
        const timer = setTimeout(() => setDebouncedValue(value), delay);

        // Cleanup: if value changes before timer fires, cancel the old timer
        // This is the key to debouncing — only the last call "wins"
        return () => clearTimeout(timer);
    }, [value, delay]);

    return debouncedValue;
}
