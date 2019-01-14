import * as assert from "assert";
import { IConfig } from "../../../src/main/config/config";
import { ConfigBuilder } from "../../../src/main/config/configBuilder";

describe("ConfigBuilder", () => {
    it("env var ARGSK_FILE_PATH can change configuration file path", () => {
        const changedFilePath: string = "changed-argk.yml";
        process.env.ARGSK_FILE_PATH = changedFilePath;
        const c: IConfig = new ConfigBuilder()
            .addEnvironmentVariables()
            .build();

        assert.equal(changedFilePath, c.filePath);
    });

    afterEach(() => {
        delete process.env.ARGSK_FILE_PATH;
    });
});