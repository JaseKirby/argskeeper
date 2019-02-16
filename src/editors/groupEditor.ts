import { IArgsKeeperGroup } from "../models/argsKeeperGroup";
import { IArgsKeeperCommand } from "../models/argsKeeperCommand";
import { NameKeyValidator } from "../validators/nameKeyValidator";

export class GroupEditor {
    private group: IArgsKeeperGroup;

    constructor(group: IArgsKeeperGroup) {
        this.group = group;
        if(this.group.commands === undefined) {
            this.group.commands = [];
        }
    }

    public addCommand(newCommand: IArgsKeeperCommand) {
        const nameKeyValidator: NameKeyValidator = new NameKeyValidator(newCommand.name);
        nameKeyValidator.isNameKeyValid(); // throws errors if invalid
        const commandsWithThisNameCount: number = this.group.commands.filter(x => x.name === newCommand.name).length;
        if(commandsWithThisNameCount > 0) {
            throw new ArgskCommandNameAlreadyExistsError(newCommand.name);
        }
        this.group.commands.push(newCommand);
    }

    public removeCommandByName(commandName: string) {
        this.group.commands = this.group.commands.filter(x => x.name !== commandName);
    }
}

export class ArgskCommandNameAlreadyExistsError extends Error {
    constructor(commandName: string) {
        super(`Command with name ${commandName} already exists in group commands. Command names must be unique.`);
        this.name = "ArgskCommandNameAlreadyExistsError";
    }
}
