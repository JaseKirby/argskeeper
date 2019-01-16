import { html, LitElement, property } from "@polymer/lit-element";
import { TemplateResult } from "lit-html";

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
            <h1>ArgsKeeper Main Page</h1>
        `;
    }
}

customElements.define(MainPageElement.elName, MainPageElement);