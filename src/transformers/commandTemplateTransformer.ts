import * as Mustache from "mustache";
import { IArgsKeeperCommand } from "../models/argsKeeperCommand";
import { NoValueValidator } from "../validators/noValueValidator";

export class CommandTemplateTransformer {
    private command: IArgsKeeperCommand;

    constructor(command: IArgsKeeperCommand) {
        this.command = command;
    }

    public renderExecutionTemplate(): string {
        const view: {[key: string]: string} = {};
        this.command.args.forEach((arg) => {
            if(NoValueValidator.hasValue(arg.value)) {
                view[arg.name] = arg.value;
            } else {
                if(NoValueValidator.hasValue(arg.default)) {
                    view[arg.name] = arg.default;
                }
            }
        });
        return Mustache.render(this.command.exec, view);
    }
}