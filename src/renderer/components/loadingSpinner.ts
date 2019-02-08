import { html, LitElement, TemplateResult } from "lit-element";

export class LoadingSpinnerElement extends LitElement {
    public static elName: string = "argsk-loading-spinner";

    constructor() {
        super();
    }

    protected render(): TemplateResult {
        return html`
        <style>
            :host[hidden] { display: none; }
            :host { display: block; }
            .loader {
                margin: auto;
                border: 16px solid #f3f3f3; /* Light grey */
                border-top: 16px solid #3f51b5; /* Blue */
                border-radius: 50%;
                width: 120px;
                height: 120px;
                animation: spin 2s linear infinite;
            }
            @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
            }
        </style>
        <div class="loader"></div>
        `;
    }
}

customElements.define(LoadingSpinnerElement.elName, LoadingSpinnerElement);
