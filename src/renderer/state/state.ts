import { IArgsKeeper } from "../../models/argsKeeper";

export interface IState {
    loading: boolean;
    saving: boolean;
    argsKeeper: IArgsKeeper;
}

export class State implements IState {
    public loading: boolean = true;
    public saving: boolean = false;
    public argsKeeper: IArgsKeeper;
}