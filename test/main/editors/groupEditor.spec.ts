import { IArgsKeeperGroup, ArgsKeeperGroup } from "../../../src/models/argsKeeperGroup";
import * as assert from "assert";
import { GroupEditor, ArgskCommandNameAlreadyExistsError } from "../../../src/editors/groupEditor";
import { IArgsKeeperCommand } from "../../../src/models/argsKeeperCommand";

describe("GroupEditor", () => {

    it("can add command", () => {
        const linuxGroup: IArgsKeeperGroup = new ArgsKeeperGroup();
        linuxGroup.name = "linux";
        const shutdownCommand: IArgsKeeperCommand = { name: "shutdown", exec: "shutdown -h now" }
        
        const editor: GroupEditor = new GroupEditor(linuxGroup);
        editor.addCommand(shutdownCommand);

        assert.equal(linuxGroup.commands.length, 1);
        assert.equal(linuxGroup.commands[0].name, shutdownCommand.name);
    });

    it("adding a command where a command with the same name exists throws ArgskCommandNameAlreadyExistsError", () => {
        const linuxGroup: IArgsKeeperGroup = new ArgsKeeperGroup();
        linuxGroup.name = "linux";
        const shutdownCommand: IArgsKeeperCommand = { name: "shutdown", exec: "shutdown -h now" };

        const editor: GroupEditor = new GroupEditor(linuxGroup);
        editor.addCommand(shutdownCommand);
        const addComamndWithSameName: Function = () => editor.addCommand(shutdownCommand);

        assert.throws(addComamndWithSameName, ArgskCommandNameAlreadyExistsError);
        assert.equal(linuxGroup.commands.length, 1);
    });

    it("can remove command", () => {
        const linuxGroup: IArgsKeeperGroup = new ArgsKeeperGroup();
        linuxGroup.name = "linux";
        const shutdownCommand: IArgsKeeperCommand = { name: "shutdown", exec: "shutdown -h now" };
        
        const editor: GroupEditor = new GroupEditor(linuxGroup);
        editor.addCommand(shutdownCommand);
        editor.removeCommandByName(shutdownCommand.name);

        assert.equal(linuxGroup.commands.length, 0);
    })
});
