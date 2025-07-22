import { useMutation, useQueryClient } from "@tanstack/react-query";
import { type FC, type ReactNode, useContext } from "react";
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
		textContent: ReactNode;
		textToast: string;
		callback(): Promise<any>;
		onCancel?(): void;
		invalidate?: withInvalidator.Invalidate[];
	}
}

export const DeleteControl: FC<DeleteControl.Props> = ({
	textContent,
	textToast,
	callback,
	onCancel,
	invalidate: $invalidate = [],
	variant,
	tva = DeleteControlCls,
	cls,
}) => {
	const { slots } = tva(variant, cls);
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
		<div className={slots.base()}>
			<div className={slots.content()}>{textContent}</div>
			<div className={slots.footer()}>
				<Button
					variant={{
						variant: "light",
						borderless: true,
						size: "md",
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
					variant={{
						variant: "danger",
						size: "md",
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
