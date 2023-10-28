"use client";

import {IconLogin} from "@tabler/icons-react";
import {
    Translation,
    useLocaleRouter
}                  from "@use-pico/i18n";
import {Button}    from "@use-pico/ui";
import {
    signIn,
    type SignInOptions
}                  from "next-auth/react";
import {type FC}   from "react";

export namespace SignInButton {
    export interface Props {
        loginUrl?: string;
        signInOptions?: SignInOptions;
    }
}

export const SignInButton: FC<SignInButton.Props> = (
    {
        loginUrl,
        signInOptions,
    }
) => {
    const router = useLocaleRouter();

    return <Button
        leftSection={<IconLogin/>}
        onClick={() => loginUrl ? router.push({
            href: loginUrl,
        }) : signIn(undefined, signInOptions)}
    >
        <Translation
            namespace={"public"}
            withLabel={"sign-in.button"}
        />
    </Button>;
};
