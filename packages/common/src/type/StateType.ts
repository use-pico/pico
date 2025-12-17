export namespace StateType {
	/**
	 * State type is a simple wrapper around a value and a setter function.
	 */
	export interface State<TValue> {
		value: TValue;
		set(value: TValue | ((prev: TValue) => TValue)): void;
	}

	export interface Simple<TValue> {
		value: TValue;
		set(value: TValue): void;
	}
}
