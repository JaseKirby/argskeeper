import { html, LitElement, property } from "@polymer/lit-element";
import { TemplateResult } from "lit-html";
import { IArgsKeeperGroup, ArgsKeeperGroup } from "../../models/argsKeeperGroup";

export class GroupFormElement extends LitElement {
    public static elName: string = "argsk-group-form";

    @property({type: Boolean})
    public saving: boolean = false;

    @property({type: Object})
    public onAddGroup: (newGroup: IArgsKeeperGroup) => void;

    private group: IArgsKeeperGroup = {name: "", desc: ""};

    constructor() {
        super();
    }

    // implement this method and return this to remove shadow dom and use global style
    protected createRenderRoot(): any {
        return this;
    }

    private handleGroupNameChange(e: KeyboardEvent): void {
        const el: HTMLInputElement = e.target as HTMLInputElement;
        this.group.name = el.value;
    }

    private handleGroupDescChange(e: KeyboardEvent): void {
        const el: HTMLInputElement = e.target as HTMLInputElement;
        this.group.desc = el.value;
    }

    private handleCreateGroupClick(): void {
        this.onAddGroup(this.group);
    }

    protected render(): TemplateResult {
        return html`
            <div class="box">
                <h4 class="title is-4">Create New Command Group</h4>
                <div class="field">
                    <label class="label">Group Name</label>
                    <div class="control">
                        <input class="input" type="text" @keyup="${this.handleGroupNameChange}"/>
                    </div>
                </div>
                <div class="field">
                    <label class="label">Group Description</label>
                    <div class="control">
                        <textarea class="textarea" @keyup="${this.handleGroupDescChange}"></textarea>
                    </div>
                </div>
                <div class="field">
                    <div class="control">
                        <button class="${this.determineCreateButtonClass()}"
                            ?disabled="${this.saving}" @click="${this.handleCreateGroupClick}">Create</button>
                    </div>
                </div>
            </div>
        `;
    }

    private determineCreateButtonClass(): string {
        let baseClass: string = "button is-success";
        if(this.saving) {
            return baseClass + " is-loading";
        } else {
            return baseClass;
        }
    }
}

customElements.define(GroupFormElement.elName, GroupFormElement);
