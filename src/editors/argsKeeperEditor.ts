import { IArgsKeeper } from "../models/argsKeeper";
import { IArgsKeeperGroup } from "../models/argsKeeperGroup";

export class ArgsKeeperEditor {
    private argsKeeper: IArgsKeeper;
    constructor(argsKeeper: IArgsKeeper) {
        this.argsKeeper = argsKeeper;
    }

    private doesNameKeyHaveWhitespace(nameKey: string): boolean {
        if (nameKey.indexOf(" ") >= 0) {
            return true;
        } else {
            return false;
        }
    }

    private doesNameKeyHavePeriod(nameKey: string): boolean {
        if(nameKey.indexOf(".") >= 0) {
            return true;
        } else {
            return false;
        }
    }

    public addGroup(newGroup: IArgsKeeperGroup): void {
        const groupsWithThisNameCount: number = this.argsKeeper.groups.filter(x => x.name === newGroup.name).length;
        if(groupsWithThisNameCount > 0) {
            throw new ArgskGroupNameAlreadyExistsError(newGroup.name);
        }
        if(this.doesNameKeyHaveWhitespace(newGroup.name)) {
            throw new ArgskWhiteSpaceInNameError(newGroup.name);
        }
        if(this.doesNameKeyHavePeriod(newGroup.name)) {
            throw new ArgskPeriodInNameError(newGroup.name);
        }
        this.argsKeeper.groups.push(newGroup);
    }

    public removeGroupByName(groupName: string): void {
        this.argsKeeper.groups = this.argsKeeper.groups.filter(x => x.name !== groupName);
    }
}

export class ArgskGroupNameAlreadyExistsError extends Error {
    constructor(groupName: string) {
        super(`Group with name ${groupName} already exists in groups. Group names must be unique.`);
        this.name = "ArgskGroupNameAlreadyExistsError";
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
