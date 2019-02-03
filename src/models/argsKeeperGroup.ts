import { IArgsKeeperCommand, ArgsKeeperCommand } from "./argsKeeperCommand";

export interface IArgsKeeperGroup {
    name: string;
    desc?: string;
    tags?: string[];
    commands?: IArgsKeeperCommand[];
}

export class ArgsKeeperGroup implements IArgsKeeperGroup {
    public name: string;
    public desc?: string;
    public tags?: string[];
    public commands?: ArgsKeeperCommand[];
}
