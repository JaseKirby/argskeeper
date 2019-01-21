import { IState } from "./state";
import { Subject } from "rxjs";
import { ArgsKeeper } from "../../models/argsKeeper";

export class StateManager {
    private state: IState;
    private subj: Subject<IState>;

    constructor(state: IState, subj: Subject<IState>) {
        this.state = state;
        this.subj = subj;
    }

    public updateArgsKeeper(argsKeeper: ArgsKeeper): void {
        this.state.argsKeeper = argsKeeper;
        this.state.loading = false;
        this.subj.next(this.state);
    }

    public isSaving(saving: boolean): void {
        this.state.saving = saving;
        this.subj.next(this.state);
    }
}