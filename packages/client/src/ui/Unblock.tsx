import {
	type FC,
	useEffect
}                   from "react";
import {BlockStore} from "../provider/BlockStore";
import {useStore}   from "../store/useStore";

export namespace Unblock {
	export interface Props {
	}
}

export const Unblock: FC<Unblock.Props> = () => {
	const block = useStore(BlockStore, ({unblock}) => ({unblock}));
	useEffect(() => {
		block.unblock();
	}, []);
	return null;
};
