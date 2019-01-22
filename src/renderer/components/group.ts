import { html, LitElement, property } from "@polymer/lit-element";
import { TemplateResult } from "lit-html";
import { IArgsKeeperGroup } from "../../models/argsKeeperGroup";

export class GroupElement extends LitElement {
    public static elName: string = "argsk-group";

    @property({type: Boolean})
    public saving: boolean = false;

    @property({type: Object})
    public group: IArgsKeeperGroup;

    @property({type: Object})
    public onGroupRemove: (groupName: string) => void;

    private showGroupDetails: boolean;

    constructor() {
        super();
    }

    // implement this method and return this to remove shadow dom and use global style
    protected createRenderRoot(): any {
        return this;
    }

    private handleGroupBoxClick(e: MouseEvent): void {
        this.showGroupDetails = !this.showGroupDetails;
        // todo collapse box to just title and description
        console.log(this.showGroupDetails);
    }

    private handleGroupRemoveButtonClick(e: MouseEvent): void {
        const el: HTMLLinkElement = e.target as HTMLLinkElement;
        this.onGroupRemove(el.id);
        e.stopPropagation();
    }

    protected render(): TemplateResult {
        return html`
        <style>
            :host[hidden] { display: none; }
            :host { display: block; }
            .argsk-group {
                margin-bottom: 5px;
            }
            .argsk-group:hover {
                cursor: pointer;
                background-color: hsl(0, 0%, 96%);
            }
        </style>
        <div class="box argsk-group" @click="${this.handleGroupBoxClick}">
            <h3 class="title is-3">
                ${this.group.name}
                <a id="${this.group.name}" class="button is-danger"
                    class="${this.determineRemoveButtonClass()}"
                    ?disabled="${this.saving}"
                    @click="${this.handleGroupRemoveButtonClick}">-</a>
            </h3>
            <h5 class="subtitle is-5">${this.group.desc}</h5>
        </div>
        `;
    }

    private determineRemoveButtonClass(): string {
        const baseClass: string = "button is-danger";
        if(this.saving) {
            return baseClass + " is-loading";
        } else {
            return baseClass;
        }
    }
}

customElements.define(GroupElement.elName, GroupElement);
