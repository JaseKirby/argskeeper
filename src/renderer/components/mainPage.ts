import { html, LitElement, property } from "@polymer/lit-element";
import { TemplateResult } from "lit-html";
import "./loadingSpinner";

export class MainPageElement extends LitElement {
    public static elName: string = "argsk-main";

    @property({type : Boolean})
    public loading: boolean = true;

    constructor() {
        super();
    }

    // implement this method and return this to remove shadow dom and use global style
    protected createRenderRoot(): any {
        return this;
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
                html`<p>done loading</p>`
            }
            </div>
        `;
    }
}

customElements.define(MainPageElement.elName, MainPageElement);
