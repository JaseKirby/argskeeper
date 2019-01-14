import { IArgsKeeperGroup, ArgsKeeperGroup } from "./argsKeeperGroup";

export interface IArgsKeeper {
    name: string;
    title: string;
    desc: string;
    groups: IArgsKeeperGroup[];
}

export class ArgsKeeper {
    public name: string = "myArgsKeeper";
    public title: string = "My ArgsKeeper CLI Library";
    public desc: string = "My personal library of commands.";
    public groups: ArgsKeeperGroup[] = [];
}
