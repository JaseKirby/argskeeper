export interface IConfig {
    readonly env: string;
    readonly filePath: string;
}

export class Config implements IConfig {
    env: string;
    filePath: string = "argsk.yml";
}