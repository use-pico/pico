import { type withRepository as withCoolRepository } from "@use-pico/common";
import { useContext, type ReactNode } from "react";
import toast from "react-hot-toast";
import { Button } from "../button/Button";
import { BackIcon } from "../icon/BackIcon";
import { TrashIcon } from "../icon/TrashIcon";
import { ModalContext } from "../modal/ModalContext";
import { Tx } from "../tx/Tx";
import { DeleteControlCss } from "./DeleteControlCss";
import type { withRepository } from "./withRepository";

export namespace DeleteControl {
	export interface Props extends DeleteControlCss.Props {
		repository: withRepository.Instance<any, any>;
		textContent: ReactNode;
		filter: withCoolRepository.IdentityFilter;
		onCancel?(): void;
	}
}

export const DeleteControl = ({
	repository,
	textContent,
	filter,
	onCancel,
	variant,
	tva = DeleteControlCss,
	css,
}: DeleteControl.Props) => {
	const tv = tva({ ...variant, css }).slots;
	const modalContext = useContext(ModalContext);
	const mutation = repository.useRemoveMutation({
		async wrap(callback) {
			return toast.promise(callback(), {
				loading: <Tx label={"Deleting... (label)"} />,
				success: <Tx label={"Items deleted (label)"} />,
				error: <Tx label={"Items cannot be removed (label)"} />,
			});
		},
		async onSuccess() {
			modalContext?.close();
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
						modalContext?.close();
						onCancel?.();
					}}
				>
					<Tx label={"Cancel (button)"} />
				</Button>

				<Button
					variant={{ variant: "danger", size: "md" }}
					iconEnabled={TrashIcon}
					onClick={() => mutation.mutate(filter)}
				>
					<Tx label={"Delete (button)"} />
				</Button>
			</div>
		</div>
	);
};
