export interface IArgsKeeperArg {
    name: string;
    value?: string;
    desc?: string;
    default?: string;
    [key: string]: string;
}

export class ArgsKeeperArg implements IArgsKeeperArg {
    public name: string;
    public value?: string;
    public desc?: string;
    public default?: string;
    [key: string]: string;
}
