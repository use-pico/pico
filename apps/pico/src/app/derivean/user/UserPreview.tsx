import { useParams } from "@tanstack/react-router";
import {
    LinkTo,
    ListIcon,
    Preview,
    TitlePreview,
    Tx,
    UserIcon,
} from "@use-pico/client";
import type { FC } from "react";
import type { UserSchema } from "~/app/user/UserSchema";

export namespace UserPreview {
	export interface Props extends Preview.PropsEx<UserSchema["~output"]> {
		//
	}
}

export const UserPreview: FC<UserPreview.Props> = (props) => {
	const { locale } = useParams({ from: "/$locale" });

	return (
		<Preview
			title={({ entity }) => (
				<TitlePreview
					icon={UserIcon}
					title={entity.name}
				/>
			)}
			actions={() => (
				<>
					<LinkTo
						icon={ListIcon}
						to={"/$locale/apps/derivean/root/user/list"}
						params={{ locale }}
					>
						<Tx label={"User list (label)"} />
					</LinkTo>
				</>
			)}
			{...props}
		/>
	);
};
