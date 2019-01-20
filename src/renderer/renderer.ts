import "./styles/style.scss";
import { ipcRenderer, Event } from "electron";
import { IArgsKeeper } from "../models/argsKeeper";
import { IState, State } from "./state/state";
import { BehaviorSubject } from "rxjs";
import { StateManager } from "./state/stateManager";
import { MainPageElement } from "./components/mainPage";

const state: IState = new State();
const subj: BehaviorSubject<IState> = new BehaviorSubject(state);
const stateManager: StateManager = new StateManager(state, subj);

ipcRenderer.on("recieveArgsKeeperData", (event: Event, arg: IArgsKeeper) => {
    stateManager.updateArgsKeeper(arg);
});
ipcRenderer.send("getArgsKeeperData");
ipcRenderer.on("writeArgsKeeperDataDone", (event: Event) => {
    console.log("wrote new argskeeper file to disk");
    stateManager.isSaving();
});
ipcRenderer.on("recieveErrors", (errMessages: string[], errors: Error[]) => {
    console.error("got errors");
});

const rootElement: HTMLDivElement = document.getElementById("root") as HTMLDivElement;

const mainPageElement: MainPageElement = document.createElement(MainPageElement.elName) as MainPageElement;
subj.subscribe({
    next: (x) => {
        mainPageElement.argsKeeper = x.argsKeeper;
        mainPageElement.loading = x.loading;
        mainPageElement.saving = x.saving;
        mainPageElement.requestUpdate();
    },
    error: (err) => console.error(err)
});
mainPageElement.onArgsKeeperChange = (newArgsKeeper: IArgsKeeper) => {
    stateManager.isSaving();
    stateManager.updateArgsKeeper(newArgsKeeper);
    ipcRenderer.send("putArgsKeeperData", newArgsKeeper);
};
rootElement.appendChild(mainPageElement);
