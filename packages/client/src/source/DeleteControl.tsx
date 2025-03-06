import { useMutation } from "@tanstack/react-query";
import { useContext, type FC, type ReactNode } from "react";
import toast from "react-hot-toast";
import { Button } from "../button/Button";
import { BackIcon } from "../icon/BackIcon";
import { TrashIcon } from "../icon/TrashIcon";
import type { useInvalidator } from "../invalidator/useInvalidator";
import { ModalContext } from "../modal/ModalContext";
import { withToastPromiseTx } from "../toast/withToastPromiseTx";
import { Tx } from "../tx/Tx";
import { DeleteControlCss } from "./DeleteControlCss";

export namespace DeleteControl {
	export interface Props extends DeleteControlCss.Props {
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
	tva = DeleteControlCss,
	css,
}) => {
	const tv = tva({ ...variant, css }).slots;
	const useModalStore = useContext(ModalContext);
	const close = useModalStore((state) => state.close);
	const mutation = useMutation({
		async mutationFn() {
			return toast.promise(callback(), withToastPromiseTx(textToast));
		},

		async onSuccess() {
			await invalidator?.();
			close();
		},
	});

	return (
		<div className={tv.base()}>
			<div className={tv.content()}>{textContent}</div>
			<div className={tv.footer()}>
				<Button
					variant={{ variant: "subtle", size: "sm" }}
					iconEnabled={BackIcon}
					onClick={() => {
						close();
						onCancel?.();
					}}
				>
					<Tx label={"Cancel (button)"} />
				</Button>

				<Button
					variant={{ variant: "danger", size: "md" }}
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
