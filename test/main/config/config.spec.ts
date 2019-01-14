import { Config } from "../../../src/main/config/config";
import * as assert from "assert";

describe("Config", () => {
    it("can intialize with defaults", () => {
        const c: Config = new Config();
        assert.equal(c.filePath, "argsk.yml");
    });
});