import { IArgsKeeperRepo } from "../../../src/repos/argsKeeperRepo";
import { ArgsKeeperYamlRepo } from "../../../src/main/repos/argsKeeperYamlRepo";
import { IArgsKeeper, ArgsKeeper } from "../../../src/models/argsKeeper";
import { IArgsKeeperGroup } from "../../../src/models/argsKeeperGroup";
import { IArgsKeeperProgram } from "../../../src/models/argsKeeperProgram";
import { IArgsKeeperCommand } from "../../../src/models/argsKeeperCommand";
import * as path from "path";
import * as fs from "fs";
import * as assert from "assert";
import * as os from "os";

describe("ArgsKeeperYamlRepo Get", () => {
    const testYamlFilePath: string = path.join(__dirname, "argsk.test.yml");
    let argsKeeperYamlRepo: IArgsKeeperRepo;
    let argsKeeper: IArgsKeeper;

    it("can read and serialize yaml file to argsKeeper object", async () => {
        argsKeeperYamlRepo = new ArgsKeeperYamlRepo(testYamlFilePath);
        argsKeeper = await argsKeeperYamlRepo.get();
    });

    it("argsKeeper obj should have name key => exmapleArgsKLib", () => {
        assert.equal(argsKeeper.name, "exmapleArgsKLib");
    });

    it("argsKeeper obj should have title => Example Argsk Library", () => {
        assert.equal(argsKeeper.title, "Example Argsk Library");
    });

    it("argsKeeper obj should have description => 'This is an exmple argk lib.'", () => {
        assert.equal(argsKeeper.desc, "This is an exmple argk lib.");
    });

    it("argsKeeper obj should have 3 groups => docker, linux, windows", () => {
        assert.equal(argsKeeper.groups.length, 3);
        const dockerGroup: IArgsKeeperGroup = argsKeeper.groups[0];
        assert.equal(dockerGroup.name, "docker");
        assert.equal(dockerGroup.desc, "docker commands");

        const linuxGroup: IArgsKeeperGroup = argsKeeper.groups[1];
        assert.equal(linuxGroup.name, "linux");
        assert.equal(linuxGroup.desc, "linux commands");

        const windowsGroup: IArgsKeeperGroup = argsKeeper.groups[2];
        assert.equal(windowsGroup.name, "windows");
        assert.equal(windowsGroup.desc, "windows commands");
    });

    it("docker group has two commands => runNginx, runAlpCmd", () => {
        const dockerGroup: IArgsKeeperGroup = argsKeeper.groups[0];
        assert.equal(dockerGroup.commands.length, 2);
        assert.equal(dockerGroup.commands[0].name, "runNginx");
        assert.equal(dockerGroup.commands[1].name, "runAlpCmd");
        // todo: more tests expanding down into commands
    });

    it("linux group has shutdown command", () => {
        const linuxGroup: IArgsKeeperGroup = argsKeeper.groups[1];
        const shutdownCommand: IArgsKeeperCommand = linuxGroup.commands[0];
        assert.equal(shutdownCommand.name, "shutdownNow");
        assert.equal(shutdownCommand.exec, "/sbin/shutdown -h now");
    });
});

describe("ArgsKeeperYamlRepo Put", () => {
    const testYamlFilePath: string = path.join(os.tmpdir(), "argsk.test.yml");
    let argsKeeperYamlRepo: IArgsKeeperRepo;
    let argsKeeper: IArgsKeeper = new ArgsKeeper();

    it("write default argskeeper obj to tmp disk", async () => {
        argsKeeperYamlRepo = new ArgsKeeperYamlRepo(testYamlFilePath);
        await argsKeeperYamlRepo.put(argsKeeper);
        const tmpFileExists: boolean = fs.existsSync(testYamlFilePath);
        assert.equal(tmpFileExists, true);
    });
});

describe("ArgsKeeperYamlRepo Init", () => {
    const defaultNewYamlFilePath: string = path.join(os.tmpdir(), "argsk.default.yml");
    let argsKeeperYamlRepo: IArgsKeeperRepo;

    it("creates default argskeeper yaml file if it does not exist", async () => {
        argsKeeperYamlRepo = new ArgsKeeperYamlRepo(defaultNewYamlFilePath);
        await argsKeeperYamlRepo.init();
        assert(fs.existsSync(defaultNewYamlFilePath));
    });

    after(() => {
        fs.unlinkSync(defaultNewYamlFilePath);
    });
});
