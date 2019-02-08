import { html, LitElement, property, TemplateResult } from "lit-element";
import { IArgsKeeperCommand, ArgsKeeperCommand } from "../../models/argsKeeperCommand";

export class CommandFormElement extends LitElement {
    public static elName: string = "argsk-command-form";

    @property({type: Boolean})
    public saving: boolean = false;

    @property({type: Object})
    public onAddCommand: (newCommand: IArgsKeeperCommand) => void;

    private command: IArgsKeeperCommand = new ArgsKeeperCommand();
    private commandNameValidationMsg: string = "";

    constructor() {
        super();
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

    protected render(): TemplateResult {
        return html`
            <div class="box">
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
                    <label class="label">Command Description</label>
                    <div class="control">
                        <textarea class="textarea" @keyup="${this.handleCommandDescChange}"></textarea>
                    </div>
                </div>
                <div class="field">
                    <label class="label">Execution Template</label>
                    <div class="control">
                        <textarea class="textarea"
                            @keyup="${this.handleExecTemplateChange}"
                            placeholder="executable run --arg=\${arg}"></textarea>
                    </div>
                </div>
                <h5 class="title is-5">Create New Arguments for Command</h5>
                <p>todo: create args form here for and display args already added to this command somewhere</p>
                <div class="field">
                    <div class="control">
                        <button class=${this.determineCreateButtonClass()}
                            ?disabled=${this.saving}
                            @click=${this.handleCreateCommandClick}>Create</button>
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
