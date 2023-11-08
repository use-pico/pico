import {IconX}                    from "@tabler/icons-react";
import {tx}                       from "@use-pico/i18n";
import {type IBaseSelectionStore} from "@use-pico/selection";
import {useStore}                 from "@use-pico/store";
import {
    Button,
    ModalStore
}                                 from "@use-pico/ui";
import {type FC}                  from "react";

export namespace ClearButton {
    export interface Props extends Button.Props {
        SelectionStore: IBaseSelectionStore<any, any>;
    }
}

export const ClearButton: FC<ClearButton.Props> = (
    {
        SelectionStore,
        ...props
    }
) => {
    const {close} = useStore(ModalStore, ({close}) => ({close}));
    const {clear} = useStore(SelectionStore, ({clear}) => ({clear}));

    return <Button
        leftSection={<IconX/>}
        variant={"subtle"}
        size={"md"}
        onClick={() => {
            clear();
            close("query-input");
        }}
        {...props}
    >
        {tx()`Clear selection`}
    </Button>;
};
