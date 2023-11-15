import {type IContainer} from "@use-pico/container";
import {
    type NextRequest,
    type NextResponse
}                        from "next/server";

export interface IRpcService {
    handle(props: IRpcService.HandleProps): Promise<NextResponse>;
}

export namespace IRpcService {
    export interface HandleProps {
        context?: IContainer.Register;
        request: NextRequest;
        response: NextResponse;
    }
}
