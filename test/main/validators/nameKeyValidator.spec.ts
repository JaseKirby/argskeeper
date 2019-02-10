import * as assert from "assert";
import { NameKeyValidator, ArgskWhiteSpaceInNameError, ArgskPeriodInNameError } from "../../../src/validator/nameKeyValidator";

describe("NameKeyValidator", () => {
    it("can check for valid name", () => {
        const validName: string = "theName";
        const nValidator: NameKeyValidator = new NameKeyValidator(validName);
        const isNameKeyValid = nValidator.isNameKeyValid();
        assert.equal(isNameKeyValid, true);
    });

    it("checking a name with whitespace throws ArgskWhiteSpaceInNameError", () => {
        const wSpaceNameKey: string = "the Name";
        const nValidator: NameKeyValidator = new NameKeyValidator(wSpaceNameKey);
        const checkingValid: Function = () => nValidator.isNameKeyValid();
        assert.throws(checkingValid, ArgskWhiteSpaceInNameError);
    })

    it("checking a name with periods throws throws ArgskPeriodInNameError", () => {
        const periodNameKey: string = "the.Name";
        const nValidator: NameKeyValidator = new NameKeyValidator(periodNameKey);
        const checkingValid: Function = () => nValidator.isNameKeyValid();
        assert.throws(checkingValid, ArgskPeriodInNameError);
    })
})
