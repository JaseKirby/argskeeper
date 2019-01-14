import { IArgsKeeperCommand, ArgsKeeperCommand } from "./argsKeeperCommand";

export interface IArgsKeeperProgram {
    name: string;
    commands?: IArgsKeeperCommand[];
}

export class ArgsKeeperProgram implements IArgsKeeperProgram {
    public name: string;
    public commands?: ArgsKeeperCommand[];
}
