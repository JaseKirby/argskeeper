import * as assert from "assert";
import { NoValueValidator } from "../../../src/validators/noValueValidator";

describe("NoValueValidator", () => {
    it("can check for value", () => {
        const t: string = "hello";
        assert.equal(NoValueValidator.hasValue(t), true);
    });

    it("can determine no value", () => {
        const t: string = "";
        assert.equal(NoValueValidator.hasValue(t), false);

        assert.equal(NoValueValidator.hasValue(undefined), false);

        assert.equal(NoValueValidator.hasValue(null), false);
    });
});