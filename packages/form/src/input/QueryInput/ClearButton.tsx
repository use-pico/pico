import {IconX}                    from "@tabler/icons-react";
import {Translation}              from "@use-pico/i18n";
import {type IBaseSelectionStore} from "@use-pico/selection";
import {
    Button,
    ModalStore
}                                 from "@use-pico/ui";
import {type FC}                  from "react";

export namespace ClearButton {
    export interface Props extends Button.Props {
        SelectionStore: IBaseSelectionStore<any>;
    }
}

export const ClearButton: FC<ClearButton.Props> = (
    {
        SelectionStore,
        ...props
    }
) => {
    const {close} = ModalStore.use(({close}) => ({close}));
    const {clear} = SelectionStore.use(({clear}) => ({clear}));
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
        <Translation namespace={"common"} label={"selection"} withLabel={"clear.button"}/>
    </Button>;
};
