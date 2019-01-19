import { IArgsKeeperRepo } from "../../repos/argsKeeperRepo";
import { IArgsKeeper, ArgsKeeper } from "../../models/argsKeeper";
import * as yaml from "js-yaml";
import * as fs from "fs";

export class ArgsKeeperYamlRepo implements IArgsKeeperRepo {
    private yamlDataFilePath: string;

    constructor(yamlDataFilePath: string) {
        this.yamlDataFilePath = yamlDataFilePath;
    }

    init(): Promise<void> {
        const p: Promise<void> = new Promise<void>((resolve, reject) => {
            fs.exists(this.yamlDataFilePath, (exists) => {
                if (!exists) {
                    this.put(new ArgsKeeper()).then(() => {
                        resolve();
                    }).catch((reason) => {
                        reject(reason);
                    });
                } else {
                    resolve();
                }
            });
        });
        return p;
    }

    get(): Promise<IArgsKeeper> {
        const p: Promise<IArgsKeeper> = new Promise<IArgsKeeper>((resolve, reject) => {
            fs.readFile(this.yamlDataFilePath, "utf-8", (err, data) => {
                if (err) {
                    reject(err);
                }
                const obj: Object = yaml.load(data);
                let argsKeeper: ArgsKeeper = new ArgsKeeper();
                Object.assign(argsKeeper, obj);
                resolve(argsKeeper);
            });
        });
        return p;
    }

    put(newArgsKeeper: IArgsKeeper): Promise<void> {
        const p: Promise<void> = new Promise<void>((resolve, reject) => {
            const ymlData: string = yaml.safeDump(newArgsKeeper);
            fs.writeFile(this.yamlDataFilePath, ymlData, (err) => {
                if (err) {
                    reject(err);
                }
                resolve();
            });
        });
        return p;
    }
}