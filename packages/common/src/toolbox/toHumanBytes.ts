import {filesize} from "filesize";

export const toHumanBytes = (size: number) => filesize(size);
