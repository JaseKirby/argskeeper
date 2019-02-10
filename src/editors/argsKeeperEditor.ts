import { IArgsKeeper } from "../models/argsKeeper";
import { IArgsKeeperGroup } from "../models/argsKeeperGroup";
import { NameKeyValidator } from "../validator/nameKeyValidator";

export class ArgsKeeperEditor {
    private argsKeeper: IArgsKeeper;
    constructor(argsKeeper: IArgsKeeper) {
        this.argsKeeper = argsKeeper;
    }

    public addGroup(newGroup: IArgsKeeperGroup): void {
        const nameKeyValidator: NameKeyValidator = new NameKeyValidator(newGroup.name);
        nameKeyValidator.isNameKeyValid(); // throws errors if invalid
        const groupsWithThisNameCount: number = this.argsKeeper.groups.filter(x => x.name === newGroup.name).length;
        if(groupsWithThisNameCount > 0) {
            throw new ArgskGroupNameAlreadyExistsError(newGroup.name);
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
