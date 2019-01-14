import { IArgsKeeperArg, ArgsKeeperArg } from "./argsKeeperArg";

export interface IArgsKeeperCommand {
    name: string;
    exec: string;
    args?: IArgsKeeperArg[];
}

export class ArgsKeeperCommand implements IArgsKeeperCommand {
    public name: string;
    public exec: string;
    public args?: ArgsKeeperArg[];
}
