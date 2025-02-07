import { useEffect, useRef, useState, useTransition } from "react";

export namespace useLoop {
	export namespace onStart {
		export interface Props {
			total: number;
		}
	}

	export namespace onTick {
		export interface Props {
			current: number;
			total: number;
			percent: number;
		}
	}

	export namespace onFinish {
		export interface Props {}
	}

	export interface Props {
		total: number;
		/**
		 * Number of ms to throttle the loop; using setTimeout at the end.
		 */
		throttle?: number;

		onStart?(props: onStart.Props): Promise<void>;

		onTick(props: onTick.Props): Promise<void>;

		onError?(e: unknown): void;

		onFinish?(props: onFinish.Props): Promise<void>;
	}
}

/**
 * Cool hook used to execute loop in renders to do something (for example file upload in chunks), so
 * the component stays responsive but one can still do the job.
 *
 * @group hooks
 */
export const useLoop = ({
	total,
	throttle = 0,
	onStart = () => Promise.resolve(),
	onTick,
	onError = () => Promise.resolve(),
	onFinish = () => Promise.resolve(),
}: useLoop.Props) => {
	const isMountedRef = useRef(false);
	const [isRunning, setIsRunning] = useState(false);
	const [isDone, setIsDone] = useState(false);
	const [isError, setIsError] = useState(false);
	const [isSuccess, setIsSuccess] = useState(false);
	const [current, setCurrent] = useState(0);
	const [, startTransition] = useTransition();

	useEffect(() => {
		if (isMountedRef.current || isRunning) {
			return;
		}
		isMountedRef.current = true;
		startTransition(() => {
			setIsRunning(true);
		});
		(async () => {
			try {
				await onStart({ total });
			} catch (e) {
				console.error(e);
			}
		})();
	}, []);

	useEffect(() => {
		if (!isRunning) {
			return;
		}
		if (current === total) {
			onFinish?.({})
				.then(() => {
					startTransition(() => {
						setIsDone(true);
						setIsRunning(false);
						setIsSuccess(true);
						setIsError(false);
					});
				})
				.catch((e) => {
					console.error(e);
					startTransition(() => {
						setIsDone(true);
						setIsRunning(false);
						setIsSuccess(false);
						setIsError(true);
					});
					onError(e);
				});
			return;
		}
		setTimeout(() => {
			onTick({
				current,
				total,
				percent: (100 * current) / total,
			})
				.then(() => {
					setCurrent((current) => current + 1);
				})
				.catch((e) => {
					console.error(e);
					startTransition(() => {
						setIsDone(true);
						setIsRunning(false);
						setIsSuccess(false);
						setIsError(true);
					});
					onError(e);
				});
		}, throttle);
	}, [isRunning, current]);

	return {
		isDone,
		isRunning,
		isSuccess,
		isError,
		percent: () => (100 * current) / total,
	};
};
