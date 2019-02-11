import { html, LitElement, property, TemplateResult } from "lit-element";
import { IArgsKeeperCommand } from "../../models/argsKeeperCommand";

export class CommandElement extends LitElement {
    public static elName: string = "argsk-command";

    @property({type: Boolean})
    public saving: boolean = false;

    @property({type: Number})
    public key: number;

    @property({type: Object})
    public command: IArgsKeeperCommand;

    constructor() {
        super();
    }

    // implement this method and return this to remove shadow dom and use global style
    protected createRenderRoot(): any {
        return this;
    }

    protected render(): TemplateResult {
        return html`
        <div>
            <p class="is-size-5" style="text-decoration: underline">
                ${this.command.name}
            </p>

            <div class="field has-addons">
                <div class="control is-expanded">
                    <input class="input" readonly .value=${this.command.exec} />
                </div>
                <div class="control">
                    <a class="button">COPY</a>
                </div>
            </div>

            ${this.command.args.map((val) =>
                html`
                <div class="field has-addons">
                    <div class="control">
                        <a class="button is-small is-dark" disabled>${val.name}</a>
                    </div>
                    <div class="control is-expanded">
                        <input class="input is-small" .value=${val.default} />
                    </div>
                </div>
                `
            )}
        </div>
        `;
    }
}

customElements.define(CommandElement.elName, CommandElement);
