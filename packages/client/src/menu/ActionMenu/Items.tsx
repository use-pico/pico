import {cn}         from "@use-pico/common";
import {type FC}    from "react";
import {LinkTo}     from "../../i18n/LinkTo";
import {Icon}       from "../../ui/Icon";
import {Modal}      from "../../ui/Modal";
import {ActionMenu} from "../ActionMenu";

export namespace Items {
    export type Props = Pick<ActionMenu.Props, "items">;
}

export const Items: FC<Items.Props> = (
    {
        items,
    }
) => {
    const sx = [
        "flex items-center px-2 py-1 rounded cursor-pointer hover:bg-gray-100 gap-2",
        "text-slate-500 hover:text-slate-700",
        "text-sm",
    ];
    return <div
        className={cn(
            "p-2 bg-white rounded shadow",
            "flex flex-col gap-1",
        )}
    >
        {items.map(
            item => {
                if (item.type === "click") {
                    return <div
                        key={item.id}
                        className={cn(
                            sx,
                        )}
                        onClick={item.onClick}
                    >
                        {item.icon && <Icon
                            icon={item.icon}
                            size={"xl"}
                        />}
                        {item.label}
                    </div>;
                } else if (item.type === "href") {
                    return <div
                        key={item.id}
                        className={cn(
                            sx,
                        )}
                    >
                        {item.icon && <Icon
                            icon={item.icon}
                            size={"xl"}
                        />}
                        <LinkTo
                            href={item.href}
                            label={item.label}
                        />
                    </div>;
                } else if (item.type === "modal") {
                    // eslint-disable-next-line no-useless-assignment
                    const Content = item.content;
                    return <Modal
                        key={item.id}
                        target={<div
                            key={item.id}
                            className={cn(
                                sx,
                            )}
                        >
                            {item.icon && <Icon
                                icon={item.icon}
                                size={"xl"}
                            />}
                            {item.label}
                        </div>}
                        icon={item.icon}
                        title={item.title}
                        cx={item.cx}
                    >
                        <Content/>
                    </Modal>;
                }
                return null;
            },
        )}
    </div>;
};
