import {
    cn,
    type IHrefProps
}                    from "@use-pico/common";
import {
    type FC,
    type ReactNode
}                    from "react";
import {LinkTo}      from "../i18n/LinkTo";
import {DividerIcon} from "../icon/DividerIcon";
import {Icon}        from "../ui/Icon";

/**
 * Good old breadcrumbs.
 *
 * @group ui
 *
 * @example
 * ```tsx
 * import {Breadcrumbs} from "@use-pico/client";
 *
 * export const MyComponent = () => {
 *      return <Breadcrumbs
 *          items={[
 *              {
 *                  id: "home",
 *                  type: "link",
 *                  label: "Home",
 *                  icon: "...",
 *                  href: "/home",
 *              },
 *          ]}
 *      />
 * }
 *
 * ```
 */
export namespace Breadcrumbs {
    export interface Item {
        /**
         * ID is used as array key for React.
         */
        id: string;
        /**
         * Type of the breadcrumb used to determine what to render.
         */
        type: string;
    }

    /**
     * Rendered only as a label.
     *
     * @internal
     */
    export type Label =
        ({
             type: "label";
             icon: string;
             label: ReactNode;
         } & Item)
        | ({
               type: "label";
               icon?: undefined;
               label: ReactNode;
           } & Item)
        | ({
               type: "label";
               icon: string;
               label?: undefined;
           } & Item)

    /**
     * Rendered as a LinkTo.
     *
     * @internal
     */
    export type Link =
        ({
             type: "link";
             label: ReactNode;
             icon: string;
             href: IHrefProps | string;
         } & Item)
        | ({
               type: "link";
               label: ReactNode;
               icon?: undefined;
               href: IHrefProps | string;
           } & Item)
        | ({
               type: "link";
               label?: undefined;
               icon: string;
               href: IHrefProps | string;
           } & Item)

    export type Breadcrumb =
        | Label
        | Link;

    /**
     * Props for Breadcrumbs component.
     */
    export interface Props {
        /**
         * List of breadcrumbs; usually base section path (e.g. home / customer).
         *
         * Optional, because active may be for example only "home" breadcrumb, thus
         * items are not needed.
         */
        items?: Breadcrumb[];
        /**
         * Active breadcrumb; usually current page (e.g. [home / customer ] / edit).
         *
         * Reason for separation is to keep the base path in a standalone component (like
         * CustomerBreadcrumbs) and active piece as a standalone, simply overridable piece.
         */
        active?: Breadcrumb;
        /**
         * If true, breadcrumb renders last separator.
         */
        prefix?: boolean;
    }
}

export const Breadcrumbs: FC<Breadcrumbs.Props> = (
    {
        items = [],
        active,
        prefix = false,
    }
) => {
    active && items.push(active);
    const length = (items.length - (prefix ? 0 : 1));

    return <div
        className={cn(
            "flex flex-row",
        )}
    >
        {items?.map((item, index) => {
            switch (item.type) {
                case "label":
                    return <div
                        key={`breadcrumb-${item.id}`}
                        className={cn(
                            "flex items-center",
                        )}
                    >
                        <div
                            className={cn(
                                "flex items-center",
                            )}
                        >
                            {item.icon && <Icon
                                icon={item.icon}
                                size={"xl"}
                            />}
                            {item.label}
                        </div>
                        {index < length && <Icon
                            icon={DividerIcon}
                            size={"xl"}
                            cx={[
                                "text-slate-300",
                            ]}
                        />}
                    </div>;
                case "link":
                    return <div
                        key={`breadcrumb-${item.id}`}
                        className={cn(
                            "flex items-center",
                        )}
                    >
                        <LinkTo
                            icon={item.icon ? {
                                icon: item.icon,
                                size: "xl",
                            } : undefined}
                            href={item.href}
                            label={item.label}
                        />
                        {index < length && <Icon
                            icon={DividerIcon}
                            size={"xl"}
                            cx={[
                                "text-slate-300",
                            ]}
                        />}
                    </div>;
                default:
                    return null;
            }
        })}
    </div>;
};
