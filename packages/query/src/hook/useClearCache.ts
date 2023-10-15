import {useQueryClient} from "@tanstack/react-query";

export const useClearCache = () => {
    const queryClient = useQueryClient();
    return () => {
        queryClient.getQueryCache().clear();
    };
};
