import { IConfig, Config } from "./config";

export class ConfigBuilder {
    private config: Config = new Config();

    build(): IConfig {
        return this.config;
    }

    addEnvironmentVariables(): ConfigBuilder {
        const c: Config = this.config;
        c.env = process.env.NODE_ENV || "production";
        c.filePath = process.env.ARGSK_FILE_PATH || c.filePath;
        return this;
    }
}