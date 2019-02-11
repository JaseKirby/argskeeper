import { html, LitElement, property, TemplateResult } from "lit-element";
import { IArgsKeeperCommand, ArgsKeeperCommand } from "../../models/argsKeeperCommand";
import "./argForm";
import "./tooltip";
import { IArgsKeeperArg, ArgsKeeperArg } from "../../models/argsKeeperArg";

export class CommandFormElement extends LitElement {
    public static elName: string = "argsk-command-form";

    @property({type: Boolean})
    public saving: boolean = false;

    @property({type: Object})
    public onAddCommand: (newCommand: IArgsKeeperCommand) => void;

    private command: IArgsKeeperCommand = { name: "", desc: "", exec: "", args: [] };
    private commandNameValidationMsg: string = "";
    private showArgForm: boolean = false;

    constructor() {
        super();
        this.handleAddArg = this.handleAddArg.bind(this);
    }

    // implement this method and return this to remove shadow dom and use global style
    protected createRenderRoot(): any {
        return this;
    }

    private handleCommandNameChange(e: KeyboardEvent): void {
        const el: HTMLInputElement = e.target as HTMLInputElement;
        if(el.value.indexOf(" ") >= 0) {
            el.value = el.value.replace(/\s/g, "");
            this.commandNameValidationMsg = "No whitespace allowed in command name. Whitespace was removed automatically.";
            this.requestUpdate();
            return;
        }
        this.command.name = el.value;
    }

    private handleCommandDescChange(e: KeyboardEvent): void {
        const el: HTMLTextAreaElement = e.target as HTMLTextAreaElement;
        this.command.desc = el.value;
    }

    private handleExecTemplateChange(e: KeyboardEvent): void {
        const el: HTMLTextAreaElement = e.target as HTMLTextAreaElement;
        this.command.exec = el.value;
    }

    private handleCreateCommandClick(): void {
        this.onAddCommand(this.command);
    }

    private handleAddNewArgClick(): void {
        this.showArgForm = !this.showArgForm;
        this.requestUpdate();
    }

    private handleAddArg(newArg: IArgsKeeperArg): void {
        this.command.args = [...this.command.args, newArg];
        this.showArgForm = false;
        this.requestUpdate();
    }

    protected render(): TemplateResult {
        return html`
        <div class="box" style="cursor: default">
            <h4 class="title is-4">Create New Command</h4>
            <div class="field">
                <label class="label">Command Name</label>
                <div class="control">
                    <input
                        class="input" type="text"
                        placeholder="executableRunArg"
                        @keyup=${this.handleCommandNameChange}/>
                </div>
                <p class="help is-info">${this.commandNameValidationMsg}</p>
            </div>
            <div class="field">
                <label class="label">Execution Template</label>
                <div class="control">
                    <textarea class="textarea"
                        @keyup="${this.handleExecTemplateChange}"
                        placeholder="executable run --arg=\${arg}"></textarea>
                </div>
            </div>
            <div class="field">
                <label class="label">Command Description</label>
                <div class="control">
                    <textarea class="textarea" @keyup="${this.handleCommandDescChange}"></textarea>
                </div>
            </div>

            <h5 class="title is-5">
                Arguments
                <span class="tag">${this.command.args.length}</span>
            </h5>
            <table class="table is-fullwidth">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Default Value</th>
                        <th>Description</th>
                    </tr>
                </thead>
                <tbody>
                ${this.command.args.map((arg) => html`
                    <tr>
                        <td>${arg.name}</td>
                        <td>${arg.default}</td>
                        <td>${arg.desc}</td>
                    </tr>`)}
                </tbody>
            </table>
            
            <br>

            <h5 class="title is-5">
                Create New Argument
                <argsk-tooltip text="Create new argument">
                    <a class="button is-success is-small argsk-new-cmd-btn"
                        @click=${this.handleAddNewArgClick}>+</a>
                </argsk-tooltip>
            </h5>

            ${this.showArgForm?
                html`<argsk-arg-form .onAddArg=${this.handleAddArg}></argsk-arg-form>`:html``}

            <div class="field">
                <div class="control">
                    <button class=${this.determineCreateButtonClass()}
                        ?disabled=${this.saving}
                        @click=${this.handleCreateCommandClick}>Create Command</button>
                </div>
            </div>
        </div>
        `;
    }

    private determineCreateButtonClass(): string {
        const baseClass: string = "button is-success";
        if(this.saving) {
            return baseClass + " is-loading";
        } else {
            return baseClass;
        }
    }
}

customElements.define(CommandFormElement.elName, CommandFormElement);
