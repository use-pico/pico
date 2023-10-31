import {type IContainer} from "@use-pico/container";
import {
    type NextRequest,
    NextResponse
}                        from "next/server";
import {withRpcService}  from "../container/withRpcService";

export namespace withRpcEndpoint {
    export interface Props {
        container: IContainer.Type;
    }
}

export const withRpcEndpoint = (
    {
        container,
    }: withRpcEndpoint.Props,
) => {
    const rpcService = withRpcService.use(container);

    return async (request: NextRequest, response: NextResponse) => rpcService.handle({
        request,
        response,
    });
};
