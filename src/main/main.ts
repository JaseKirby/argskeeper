import { app, BrowserWindow, ipcMain, Event } from "electron";
import { IConfig } from "./config/config";
import { ConfigBuilder } from "./config/configBuilder";
import * as path from "path";
import { ArgsKeeperYamlRepo } from "./repos/argsKeeperYamlRepo";
import { IArgsKeeper } from "../models/argsKeeper";

const config: IConfig = new ConfigBuilder()
    .addEnvironmentVariables()
    .build();

let mainWindow: Electron.BrowserWindow;

function createWindow(): void {
    mainWindow = new BrowserWindow({
        width: 1200,
        height: 600,
        webPreferences:{
            nodeIntegration: true
        }
    });

    mainWindow.loadFile(path.join(__dirname, "../renderer/index.html"));

    if (process.env.NODE_ENV !== "production") {
        // mainWindow.setMenu(null);
        mainWindow.webContents.openDevTools();
    }

    mainWindow.on("closed", () => {
        mainWindow = null;
    });
}

app.on("ready", createWindow);

app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
        app.quit();
    }
});

app.on("activate", () => {
    if(mainWindow ===  null) {
        createWindow();
    }
});

// main start
const argsKeeperYamlRepo: ArgsKeeperYamlRepo = new ArgsKeeperYamlRepo(config.filePath);
const argsKeeperInitPromise: Promise<void> = argsKeeperYamlRepo.init();

ipcMain.on("getArgsKeeperData", (event: Event) => {
    argsKeeperInitPromise.then(() => {
        argsKeeperYamlRepo.get().then((argsKeeper) => {
            event.sender.send("recieveArgsKeeperData", argsKeeper);
        }).catch((err) => {
            console.error(err);
        });
    });
});

ipcMain.on("putArgsKeeperData", (event: Event, arg: IArgsKeeper) => {
    argsKeeperYamlRepo.put(arg).then(() => {
        event.sender.send("writeArgsKeeperDataDone");
    }).catch((err) => {
        console.error(err);
    });
});