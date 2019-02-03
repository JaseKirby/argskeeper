import { html, LitElement, property } from "@polymer/lit-element";
import { TemplateResult } from "lit-html";

export class NotifierElement extends LitElement {
    public static elName: string = "argsk-notifier";

    @property({type: Array})
    public errors: string[];

    @property({type: Object})
    public onClearErrors: () => void;

    constructor() {
        super();
        this.errors = [];
    }

    // implement this method and return this to remove shadow dom and use global style
    protected createRenderRoot(): any {
        return this;
    }

    private handleClearAlertsClick(): void {
        this.onClearErrors();
    }

    protected render(): TemplateResult {
        return html`
        <style>
            :host[hidden] { display: none; }
            :host { display: block; }
            .notification {
                position:fixed;
                bottom:0;
                width: 100%;
            }
        </style>
        <div class="notification is-danger has-text-centered" ?hidden=${this.errors.length === 0}>
            <button class="delete" @click=${this.handleClearAlertsClick}></button>
            ${this.errors.map((val) =>
                html`<p>${val}</p>`
            )}
        </div>
        `;
    }
}

customElements.define(NotifierElement.elName, NotifierElement);
