import { type FC } from "react";
import { Land } from "~/app/derivean/map/Land";

export namespace Lands {
	export interface Land {
		id: string;
		position: number;
		image?: string | null;
	}

	export interface Props {
		land: Land[];
	}
}

export const Lands: FC<Lands.Props> = ({ land }) => {
	return (
		<group>
			{land.map((land) => {
				return (
					<Land
						key={land.id}
						land={land}
					/>
				);
			})}
		</group>
	);
};
