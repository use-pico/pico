import { useMutation } from "@tanstack/react-query";
import { useRouter } from "@tanstack/react-router";
import { type FC, type ReactNode, useContext } from "react";
import toast from "react-hot-toast";
import { Button } from "../button/Button";
import { BackIcon } from "../icon/BackIcon";
import { TrashIcon } from "../icon/TrashIcon";
import type { useInvalidator } from "../invalidator/useInvalidator";
import { ModalContext } from "../modal/ModalContext";
import { withToastPromiseTx } from "../toast/withToastPromiseTx";
import { Tx } from "../tx/Tx";
import { DeleteControlCls } from "./DeleteControlCls";

export namespace DeleteControl {
	export interface Props extends DeleteControlCls.Props {
		textContent: ReactNode;
		textToast: string;
		callback(): Promise<any>;
		onCancel?(): void;
		invalidator?: useInvalidator.Invalidator.Callback;
	}
}

export const DeleteControl: FC<DeleteControl.Props> = ({
	textContent,
	textToast,
	callback,
	onCancel,
	invalidator,
	variant,
	tva = DeleteControlCls,
	css,
}) => {
	const router = useRouter();
	const { slots } = tva({
		...variant,
		css,
	});
	const useModalStore = useContext(ModalContext);
	const close = useModalStore((state) => state.close);
	const mutation = useMutation({
		async mutationFn() {
			return toast.promise(callback(), withToastPromiseTx(textToast));
		},

		async onSuccess() {
			router.invalidate();
			await invalidator?.();
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
