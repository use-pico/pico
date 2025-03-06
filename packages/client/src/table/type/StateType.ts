export interface StateType<TValue> {
	value: TValue;
	set(value: TValue): void;
}
