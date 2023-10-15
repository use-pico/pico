import {createContext as coolCreateContext} from "react";

export const createContext = <T>() => coolCreateContext<T | null>(null);
