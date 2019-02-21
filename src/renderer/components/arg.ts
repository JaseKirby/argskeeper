import { html, LitElement, property, TemplateResult } from "lit-element";
import { IArgsKeeperArg } from "../../models/argsKeeperArg";

export class ArgElement extends LitElement {
    public static elName: string = "argsk-arg";

    @property({type: Object})
    public arg: IArgsKeeperArg;

    @property({type: Object})
    public onArgChange: () => void;

    constructor() {
        super();
    }

    // implement this method and return this to remove shadow dom and use global style
    protected createRenderRoot(): any {
        return this;
    }

    private handleArgChange(e: KeyboardEvent) {
        const el: HTMLInputElement = e.target as HTMLInputElement;
        this.arg.value = el.value;
        this.onArgChange();
    }

    protected render(): TemplateResult {
        if(this.arg.default === undefined) {
            this.arg.default = "";
        }
        if(this.arg.value === undefined) {
            this.arg.value = "";
        }
        return html`
        <div class="field has-addons">
            <div class="control">
                <a class="button is-small is-dark" disabled>${this.arg.name}</a>
            </div>
            <div class="control is-expanded">
                <input class="input is-small"
                    style="padding-left: 5px"
                    placeholder=${this.arg.default}
                    .value=${this.arg.value}
                    @keyup=${this.handleArgChange}/>
            </div>
        </div>
        `;
    }
}

customElements.define(ArgElement.elName, ArgElement);
