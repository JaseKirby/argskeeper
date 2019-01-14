export interface IConfig {
    readonly filePath: string;
}

export class Config implements IConfig {
    filePath: string = "argsk.yml";
}