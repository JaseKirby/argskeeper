import { html, LitElement, property, TemplateResult } from "lit-element";

export class ArgFormElement extends LitElement {
    public static elName: string = "argsk-arg-form";

    constructor() {
        super();
    }

    // implement this method and return this to remove shadow dom and use global style
    protected createRenderRoot(): any {
        return this;
    }

    protected render(): TemplateResult {
        return html`
            <style>
                .argsk-arg-form {
                    margin-bottom: 10px;
                }
            </style>
            <div class="field is-horizontal">
                <div class="field-body">
                    <div class="field">
                        <label class="label">Argument Name</label>
                        <input class="input" type="text" placeholder="Name">
                    </div>
                    <div class="field">
                        <label class="label">Argument Default Value</label>
                        <input class="input" type="email" placeholder="Email" value="Value">
                    </div>
                </div>
            </div>
            <div class="field">
                    <label class="label">Argument Description</label>
                    <div class="control">
                        <textarea class="textarea"></textarea>
                    </div>
            </div>
            <hr>
        `;
    }
}

customElements.define(ArgFormElement.elName, ArgFormElement);
