import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useCls } from "@use-pico/cls";
import { type FC, type ReactNode, type Ref, useContext } from "react";
import toast from "react-hot-toast";
import { Button } from "../button/Button";
import { BackIcon } from "../icon/BackIcon";
import { TrashIcon } from "../icon/TrashIcon";
import { ModalContext } from "../modal/ModalContext";
import { withToastPromiseTx } from "../toast/withToastPromiseTx";
import { Tx } from "../tx/Tx";
import { DeleteControlCls } from "./DeleteControlCls";
import { withInvalidator } from "./withInvalidator";

export namespace DeleteControl {
	export interface Props extends DeleteControlCls.Props {
		ref?: Ref<HTMLDivElement>;
		textContent: ReactNode;
		textToast: string;
		callback(): Promise<any>;
		onCancel?(): void;
		invalidate?: withInvalidator.Invalidate[];
	}
}

export const DeleteControl: FC<DeleteControl.Props> = ({
	ref,
	textContent,
	textToast,
	callback,
	onCancel,
	invalidate: $invalidate = [],
	cls = DeleteControlCls,
	tweak,
}) => {
	const { slots } = useCls(cls, [
		tweak,
	]);
	const useModalStore = useContext(ModalContext);
	const close = useModalStore((state) => state.close);
	const queryClient = useQueryClient();
	const { invalidate } = withInvalidator({
		invalidate: $invalidate,
	});
	const mutation = useMutation({
		async mutationFn() {
			return toast.promise(callback(), withToastPromiseTx(textToast));
		},

		async onSuccess() {
			await invalidate(queryClient);
			close();
		},
	});

	return (
		<div
			data-ui="DeleteControl-root"
			ref={ref}
			className={slots.root()}
		>
			<div
				data-ui="DeleteControl-content"
				className={slots.content()}
			>
				{textContent}
			</div>
			<div
				data-ui="DeleteControl-footer"
				className={slots.footer()}
			>
				<Button
					tweak={{
						variant: {
							tone: "secondary",
						},
					}}
					iconEnabled={BackIcon}
					onClick={() => {
						close();
						onCancel?.();
					}}
				>
					<Tx label={"Cancel (button)"} />
				</Button>

				<Button
					tweak={{
						variant: {
							tone: "primary",
						},
					}}
					iconEnabled={TrashIcon}
					onClick={() => {
						mutation.mutate();
					}}
				>
					<Tx label={"Delete (button)"} />
				</Button>
			</div>
		</div>
	);
};
