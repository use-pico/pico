import type { FC, PropsWithChildren, ReactNode } from "react";

export namespace ModalContent {
	export interface Props extends PropsWithChildren {
		footer?: ReactNode;
	}
}

export const ModalContent: FC<ModalContent.Props> = ({ children, footer }) => {
	return (
		<>
			<div className={"flex-grow overflow-y-auto"}>{children}</div>
			{footer ? <div>{footer}</div> : null}
		</>
	);
};
