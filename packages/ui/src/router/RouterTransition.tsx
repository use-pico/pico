"use client";

import {NavigationProgress} from "@mantine/nprogress";

export function RouterTransition() {
    // const router = useRouter();
    // const asPath = usePathname();

    // useEffect(() => {
    // const handleStart = (url: string) => url !== asPath && startNavigationProgress();
    // const handleComplete = () => completeNavigationProgress();

    // router.events.on("routeChangeStart", handleStart);
    // router.events.on("routeChangeComplete", handleComplete);
    // router.events.on("routeChangeError", handleComplete);
    //
    // return () => {
    //     router.events.off("routeChangeStart", handleStart);
    //     router.events.off("routeChangeComplete", handleComplete);
    //     router.events.off("routeChangeError", handleComplete);
    // };
    // }, [asPath]);

    return <NavigationProgress/>;
}
