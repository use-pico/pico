import {Translation}              from "@use-pico/i18n";
import {type IBaseSelectionStore} from "@use-pico/selection";
import {useStore}                 from "@use-pico/store";
import {
    Button,
    CloseIcon,
    ModalStore
}                                 from "@use-pico/ui";
import {type FC}                  from "react";

export namespace CancelButton {
    export interface Props extends Button.Props {
        SelectionStore: IBaseSelectionStore<any, any>;
    }
}

export const CancelButton: FC<CancelButton.Props> = (
    {
        SelectionStore,
        ...props
    }
) => {
    const {close} = useStore(ModalStore, ({close}) => ({close}));
    const {cancel} = useStore(SelectionStore, ({cancel}) => ({cancel}));
    return <Button
        leftSection={<CloseIcon/>}
        variant={"subtle"}
        size={"md"}
        onClick={() => {
            cancel();
            close("query-input");
        }}
        {...props}
    >
        <Translation namespace={"common"} label={"selection"} withLabel={"cancel.button"}/>
    </Button>;
};
