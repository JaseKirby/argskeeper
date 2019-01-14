export interface IArgsKeeperArg {
    name: string;
    desc?: string;
    default?: string;
}

export class ArgsKeeperArg implements IArgsKeeperArg {
    public name: string;
    public desc?: string;
    public default?: string;
}