import {type IContainer} from "../api/IContainer";
import {withService}     from "../service/withService";

export const withContainer = withService<IContainer.Type>("@use-pico/container/Container");
