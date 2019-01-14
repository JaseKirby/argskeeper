import { app, BrowserWindow, ipcMain, Event } from "electron";
import * as path from "path";
import { IConfig, Config } from "./config/config";
import { ConfigBuilder } from "./config/configBuilder";

const config: IConfig = new ConfigBuilder()
    .addEnvironmentVariables()
    .build();

let mainWindow: Electron.BrowserWindow;

function createWindow(): void {
    mainWindow = new BrowserWindow({
        darkTheme: true,
        webPreferences:{
            nodeIntegration: true
        }
    });

    mainWindow.loadFile(path.join(__dirname, "../renderer/index.html"));

    if (process.env.NODE_ENV !== "production") {
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
