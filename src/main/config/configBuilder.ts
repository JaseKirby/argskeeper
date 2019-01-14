import { IConfig, Config } from "./config";

export class ConfigBuilder {
    private config: Config = new Config();

    build(): IConfig {
        return this.config;
    }

    addEnvironmentVariables(): ConfigBuilder {
        const c: Config = this.config;
        c.filePath = process.env.ARGSK_FILE_PATH || c.filePath;
        return this;
    }
}