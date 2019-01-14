import { IArgsKeeper } from "../models/argsKeeper";

export interface IArgsKeeperRepo {
    get(): Promise<IArgsKeeper>;
    put(newArgsKeeper: IArgsKeeper): Promise<void>;
}
