import { Icon } from "../../icon/Icon";
import { SpinnerIcon } from "../../icon/SpinnerIcon";

export namespace Spinner {
	export interface Props extends Icon.PropsEx {
		icon?: Icon.Type;
	}
}

export const Spinner = ({ icon = SpinnerIcon, ...props }: Spinner.Props) => {
	return (
		<div className="Spinner-root grid place-content-center">
			<Icon
				icon={icon}
				size="xl"
				tone="primary"
				theme={"light"}
				{...props}
			/>
		</div>
	);
};
