import { IArgsKeeper, ArgsKeeper } from "../../src/models/argsKeeper";
import { IArgsKeeperGroup } from "../../src/models/argsKeeperGroup";
import { ArgsKeeperEditor, ArgskGroupNameAlreadyExistsError} from "../../src/editors/argsKeeperEditor";
import { ArgskWhiteSpaceInNameError, ArgskPeriodInNameError } from "../../src/validators/nameKeyValidator";
import * as assert from "assert";

describe("ArgsKeeperEditor", () => {

    it("can add group", () => {
        const argsKeeper: IArgsKeeper = new ArgsKeeper();
        const linuxGroup: IArgsKeeperGroup = {name: "linux"};
        const editor: ArgsKeeperEditor = new ArgsKeeperEditor(argsKeeper);
        editor.addGroup(linuxGroup);

        assert.equal(argsKeeper.groups.length, 1);
        assert.equal(argsKeeper.groups[0].name, linuxGroup.name);
    });

    it("adding a group where a group with the same name exists throws ArgskGroupNameAlreadyExistsError", () => {
        const argsKeeper: IArgsKeeper = new ArgsKeeper();
        const linuxGroup: IArgsKeeperGroup = {name: "linux"};
        const editor: ArgsKeeperEditor = new ArgsKeeperEditor(argsKeeper);
        editor.addGroup(linuxGroup);

        const addingGroupWithSameName: Function = () => editor.addGroup(linuxGroup);

        assert.throws(addingGroupWithSameName, ArgskGroupNameAlreadyExistsError);
        assert.equal(argsKeeper.groups.length, 1);
    });

    it("adding a group with whitespace in the name throws ArgskWhiteSpaceInNameError", () => {
        const argsKeeper: IArgsKeeper = new ArgsKeeper();
        const windowsSpaceGroup: IArgsKeeperGroup = {name: "Windows Group "};
        const editor: ArgsKeeperEditor = new ArgsKeeperEditor(argsKeeper);

        const addGroupWithWhiteSpaceName: Function = () => editor.addGroup(windowsSpaceGroup);

        assert.throws(addGroupWithWhiteSpaceName, ArgskWhiteSpaceInNameError);
        assert.equal(argsKeeper.groups.length, 0);
    });

    it("adding a group with period in the name throws ArgskPeriodInNameError", () => {
        const argsKeeper: IArgsKeeper = new ArgsKeeper();
        const windowsPeriodGroup: IArgsKeeperGroup = {name: "windows.bad"};
        const editor: ArgsKeeperEditor = new ArgsKeeperEditor(argsKeeper);

        const addGroupWithPeriod: Function = () => editor.addGroup(windowsPeriodGroup);

        assert.throws(addGroupWithPeriod, ArgskPeriodInNameError);
        assert.equal(argsKeeper.groups.length, 0);
    });

    it("can remove group by name", () => {
        const argsKeeper: IArgsKeeper = new ArgsKeeper();
        const linuxGroup: IArgsKeeperGroup = {name: "linux"};
        const windowsGroup: IArgsKeeperGroup = {name: "windows"};
        const editor: ArgsKeeperEditor = new ArgsKeeperEditor(argsKeeper);
        editor.addGroup(linuxGroup);
        editor.addGroup(windowsGroup);
        editor.removeGroupByName(linuxGroup.name);

        assert.equal(argsKeeper.groups.length, 1);
        assert.equal(argsKeeper.groups[0].name, windowsGroup.name);
    });
});