/**
 * Marker interface for components internally using suspense.
 *
 * There is no other clever way to let user's know a component is suspending,
 * so we're using this way.
 */
export namespace MarkSuspense {
	export interface Props {
		_suspense: "I know";
	}
}
