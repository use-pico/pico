import type { FilterSchema } from "@use-pico/common";
import { useContext, type ReactNode } from "react";
import { Button } from "../button/Button";
import { BackIcon } from "../icon/BackIcon";
import { TrashIcon } from "../icon/TrashIcon";
import { ModalContext } from "../modal/ModalContext";
import { Tx } from "../tx/Tx";
import { DeleteControlCss } from "./DeleteControlCss";

export namespace DeleteControl {
	export interface Props<TFilter extends FilterSchema.Type>
		extends DeleteControlCss.Props {
		textContent: ReactNode;
		filter: TFilter;
		onCancel?(): void;
		invalidator?(): Promise<void>;
	}
}

export const DeleteControl = <TFilter extends FilterSchema.Type>({
	textContent,
	filter,
	onCancel,
	invalidator,
	variant,
	tva = DeleteControlCss,
	css,
}: DeleteControl.Props<TFilter>) => {
	const tv = tva({ ...variant, css }).slots;
	const modalContext = useContext(ModalContext);
	// const mutation = useRemoveMutation({
	// 	source: null as any,
	// 	async wrap(callback) {
	// 		return toast.promise(callback(), {
	// 			loading: <Tx label={"Deleting... (label)"} />,
	// 			success: <Tx label={"Items deleted (label)"} />,
	// 			error: <Tx label={"Items cannot be removed (label)"} />,
	// 		});
	// 	},
	// 	options: {
	// 		async onSuccess() {
	// 			await invalidator?.();
	// 			modalContext?.close();
	// 		},
	// 	},
	// });

	return (
		<div className={tv.base()}>
			<div className={tv.content()}>{textContent}</div>
			<div className={tv.footer()}>
				<Button
					variant={{ variant: "subtle", size: "sm" }}
					iconEnabled={BackIcon}
					onClick={() => {
						modalContext?.close();
						onCancel?.();
					}}
				>
					<Tx label={"Cancel (button)"} />
				</Button>

				<Button
					variant={{ variant: "danger", size: "md" }}
					iconEnabled={TrashIcon}
					onClick={() => {
						// mutation.mutate({
						// 	filter,
						// })
					}}
				>
					<Tx label={"Delete (button)"} />
				</Button>
			</div>
		</div>
	);
};
