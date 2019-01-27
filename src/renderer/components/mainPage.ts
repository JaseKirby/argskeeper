import { html, LitElement, property } from "@polymer/lit-element";
import { TemplateResult } from "lit-html";
import { IArgsKeeper } from "../../models/argsKeeper";
import "./loadingSpinner";
import "./displayPage";
import "./notifier";

export class MainPageElement extends LitElement {
    public static elName: string = "argsk-main";

    @property({type : Boolean})
    public loading: boolean = true;

    @property({type: Boolean})
    public saving: boolean = false;

    @property({type: Object})
    public argsKeeper: IArgsKeeper;

    @property({type: Array})
    public errors: string[] = [];

    @property({type: Object})
    public onArgsKeeperChange: (newArgsKeeper: IArgsKeeper) => void;

    constructor() {
        super();
    }

    // implement this method and return this to remove shadow dom and use global style
    protected createRenderRoot(): any {
        return this;
    }

    private handleArgsKeeperChange(newArgsKeeper: IArgsKeeper): void {
        this.onArgsKeeperChange(newArgsKeeper);
    }

    private handleErrors(errors: string[]): void {
        this.errors = this.errors.concat(errors);
    }

    private handleClearErrors(): void {
        this.errors = [];
    }

    protected render(): TemplateResult {
        return html`
            <nav class="navbar is-primary">
                <div class="navbar-brand">
                    <div class="navbar-item is-size-4">
                        ArgsKeeper
                    </div>
                </div>
            </nav>
            </br>
            <div class="container">
            ${this.loading?
                html`<argsk-loading-spinner></argsk-loading-spinner>`:
                html`
                <argsk-display
                    .argsKeeper=${this.argsKeeper}
                    .onArgsKeeperChange=${this.handleArgsKeeperChange.bind(this)}
                    ?saving="${this.saving}"
                    .onErrors="${this.handleErrors.bind(this)}">
                </argsk-display>
                `
            }
            </div>
            <argsk-notifier
                .errors="${this.errors}"
                .onClearErrors="${this.handleClearErrors.bind(this)}">
            </argsk-notifier>
        `;
    }
}

customElements.define(MainPageElement.elName, MainPageElement);
