export class NameKeyValidator {
    private nameKey: string;
    constructor(nameKey: string) {
        this.nameKey = nameKey;
    }

    public isNameKeyValid(): boolean {
        if(this.doesNameKeyHaveWhitespace()) {return false; }
        if(this.doesNameKeyHavePeriod()) { return false; }
        return true;
    }

    private doesNameKeyHaveWhitespace(): boolean {
        if (this.nameKey.indexOf(" ") >= 0) {
            throw new ArgskWhiteSpaceInNameError(this.nameKey);
        } else {
            return false;
        }
    }

    private doesNameKeyHavePeriod(): boolean {
        if(this.nameKey.indexOf(".") >= 0) {
            throw new ArgskPeriodInNameError(this.nameKey);
        } else {
            return false;
        }
    }
}

export class ArgskWhiteSpaceInNameError extends Error {
    constructor(name: string) {
        super(`Whitespace found in name key '${name}'. No whitespace allowed in name keys.`);
        this.name = "ArgskWhiteSpaceInNameError";
    }
}

export class ArgskPeriodInNameError extends Error {
    constructor(name: string) {
        super(`Period found in name key '${name}'. Periods are not allowed in name keys.`);
        this.name = "ArgskPeriodInNameError";
    }
}
