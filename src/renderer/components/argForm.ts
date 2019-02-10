import { html, LitElement, property, TemplateResult } from "lit-element";
import { IArgsKeeperArg, ArgsKeeperArg } from "../../models/argsKeeperArg";

export class ArgFormElement extends LitElement {
    public static elName: string = "argsk-arg-form";

    @property({type: Object})
    public onAddArg: (newArg: IArgsKeeperArg) => void;

    private arg: IArgsKeeperArg = new ArgsKeeperArg();

    private argNameValidationMsg: string = "";

    constructor() {
        super();
    }

    // implement this method and return this to remove shadow dom and use global style
    protected createRenderRoot(): any {
        return this;
    }

    private handleArgNameChange(e: KeyboardEvent): void {
        const el: HTMLInputElement = e.target as HTMLInputElement;
        if(el.value.indexOf(" ") >= 0) {
            el.value = el.value.replace(/\s/g, "");
            this.argNameValidationMsg = "No whitespace allowed in group name. Whitespace was removed automatically.";
            this.requestUpdate();
            return;
        }
        this.arg.name = el.value;
    }

    private handleArgChange(e: KeyboardEvent): void {
        const el: HTMLInputElement = e.target as HTMLInputElement;
        const n: (keyof IArgsKeeperArg) = el.name;
        this.arg[n] = el.value;
    }

    private handleCreateArgBtnClick(e: MouseEvent): void {
        this.onAddArg(this.arg);
    }

    protected render(): TemplateResult {
        return html`
            <div class="field is-horizontal">
                <div class="field-body">
                    <div class="field">
                        <label class="label">Argument Name</label>
                        <div class="control">
                            <input class="input" type="text" @keyup=${this.handleArgNameChange}>
                        </div>
                        <p class="help is-info">${this.argNameValidationMsg}</p>
                    </div>
                    <div class="field">
                        <label class="label">Argument Default Value</label>
                        <input class="input" name="default" type="text" @keyup=${this.handleArgChange} >
                    </div>
                </div>
            </div>
            <div class="field">
                <label class="label">Argument Description</label>
                <div class="control">
                    <textarea class="textarea" name="desc" @keyup=${this.handleArgChange}></textarea>
                </div>
            </div>
            <div class="field">
                <div class="control">
                    <button class="button is-success is-small"
                        @click=${this.handleCreateArgBtnClick}>Add Arg</button>
                </div>
            </div>
            <hr>
        `;
    }
}

customElements.define(ArgFormElement.elName, ArgFormElement);
