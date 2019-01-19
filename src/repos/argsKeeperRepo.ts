import { IArgsKeeper } from "../models/argsKeeper";

export interface IArgsKeeperRepo {
    init(): Promise<void>;
    get(): Promise<IArgsKeeper>;
    put(newArgsKeeper: IArgsKeeper): Promise<void>;
}
