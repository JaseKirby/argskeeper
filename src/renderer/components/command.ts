import { clipboard } from "electron";
import { html, LitElement, property, TemplateResult } from "lit-element";
import { IArgsKeeperCommand } from "../../models/argsKeeperCommand";
import { CommandTemplateTransformer } from "../../transformers/commandTemplateTransformer";

export class CommandElement extends LitElement {
    public static elName: string = "argsk-command";

    @property({type: Boolean})
    public saving: boolean = false;

    @property({type: Number})
    public key: number;

    @property({type: Object})
    public command: IArgsKeeperCommand;

    @property({type: Object})
    public onCommandRemove: (commandName: string) => void;

    private renderedExecTemplate: string;
    private defaultCopyTooltipMsg: string = "Copy to clipboard";
    private copyTooltipMsg: string = "Copy to clipboard";

    constructor() {
        super();
    }

    // implement this method and return this to remove shadow dom and use global style
    protected createRenderRoot(): any {
        return this;
    }

    private handleCopyClick(e: MouseEvent): void {
        clipboard.writeText(this.renderedExecTemplate);
        this.copyTooltipMsg = `Copied: ${this.renderedExecTemplate}`;
        this.requestUpdate();
    }

    private handleCopyMouseOut(e: MouseEvent): void {
        this.copyTooltipMsg = this.defaultCopyTooltipMsg;
        this.requestUpdate();
    }

    private handleArgChange(e: KeyboardEvent): void {
        const el: HTMLInputElement = e.target as HTMLInputElement;
        const i: number = Number(el.name);
        this.command.args[i].value = el.value;
        this.requestUpdate();
    }

    private handleRemoveCommandBtnClick(e: MouseEvent): void {
        this.onCommandRemove(this.command.name);
    }

    // todo: fix undefined from popping up in value by moving to command list component above
    protected render(): TemplateResult {
        const ctTransformer: CommandTemplateTransformer = new CommandTemplateTransformer(this.command);
        this.renderedExecTemplate = ctTransformer.renderExecutionTemplate();
        return html`
        <style>
            .tooltip {
                position: relative;
                display: inline-block;
            }

            .tooltip .tooltiptext {
                visibility: hidden;
                width: 300px;
                background-color: black;
                color: #fff;
                text-align: center;
                border-radius: 6px;
                padding: 5px 0;
                
                /* Position the tooltip */
                position: absolute;
                z-index: 1;
                top: -5px;
                right: 105%;
            }

            .tooltip:hover .tooltiptext {
                visibility: visible;
            }
        </style>
        <div style="margin-bottom: 5px">
            <p class="is-size-5" style="font-weight: bold">
                ${this.command.name}
                <a name=${this.command.name}
                    class="tag is-delete is-danger"
                    @click=${this.handleRemoveCommandBtnClick}></a>
            </p>

            <div class="field has-addons">
                <div class="control is-expanded">
                    <input class="input" readonly .value=${this.renderedExecTemplate} />
                </div>
                <div class="control tooltip">
                    <button class="button" @click=${this.handleCopyClick} @mouseout=${this.handleCopyMouseOut}>
                        COPY
                    </button>
                    <span class="tooltiptext">${this.copyTooltipMsg}</span>
                </div>
            </div>

            ${this.command.args.map((arg, i) =>
                html`
                <div class="field has-addons">
                    <div class="control">
                        <a class="button is-small is-dark" disabled>${arg.name}</a>
                    </div>
                    <div class="control is-expanded">
                        <input name=${i} class="input is-small"
                            style="padding-left: 5px"
                            placeholder=${arg.default}
                            .value=${arg.value}
                            @keyup=${this.handleArgChange}/>
                    </div>
                </div>
                `
            )}
        </div>
        `;
    }
}

customElements.define(CommandElement.elName, CommandElement);
