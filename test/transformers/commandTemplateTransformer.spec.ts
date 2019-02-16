import * as assert from "assert";
import { CommandTemplateTransformer } from "../../src/transformers/commandTemplateTransformer";
import { IArgsKeeperCommand, ArgsKeeperCommand } from "../../src/models/argsKeeperCommand";

describe("CommandTemplateTransformer", () => {
    it("can render args with default values", () => {
        const command: IArgsKeeperCommand = new ArgsKeeperCommand();
        command.name = "shutdown";
        command.exec = "shutdown -h {{time}}";
        command.args = [{name: "time", default: "now"}];
        const ctTransformer: CommandTemplateTransformer = new CommandTemplateTransformer(command);

        const actualResult: string = ctTransformer.renderExecutionTemplate();
        const expectedResult: string = "shutdown -h now";

        assert.equal(actualResult, expectedResult);
    });

    it("can render args with dynamic values and defaults", () => {
        const command: IArgsKeeperCommand = new ArgsKeeperCommand();
        command.name = "kubectlRun";
        command.exec = "kubectl run {{podName}} --replicas={{replicas}} --image={{image}}";
        command.args = [
            {name: "podName", value: "nginx"},
            {name: "replicas", default: "1"},
            {name: "image", value: "nginx:v1"}
        ]
        const ctTransformer: CommandTemplateTransformer = new CommandTemplateTransformer(command);

        const actualResult: string = ctTransformer.renderExecutionTemplate();
        const expectedResult: string = "kubectl run nginx --replicas=1 --image=nginx:v1";

        assert.equal(actualResult, expectedResult);
    });
});