import { IArgsKeeper } from "../../models/argsKeeper";

export interface IState {
    loading: boolean;
    argsKeeper: IArgsKeeper;
}

export class State implements IState {
    public loading: boolean = true;
    public argsKeeper: IArgsKeeper;
}