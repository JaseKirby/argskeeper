import { html, LitElement, property } from "@polymer/lit-element";
import { TemplateResult } from "lit-html";
import { IArgsKeeper } from "../../models/argsKeeper";
import "./groupForm";
import { IArgsKeeperGroup } from "../../models/argsKeeperGroup";

export class DisplayPageElement extends LitElement {
    public static elName: string = "argsk-display";

    @property({type: Object})
    public argsKeeper: IArgsKeeper;

    private showGroupForm: boolean = false;

    constructor() {
        super();
    }

    // implement this method and return this to remove shadow dom and use global style
    protected createRenderRoot(): any {
        return this;
    }

    private handleAddGroupClick(): void {
        this.showGroupForm = !this.showGroupForm;
        this.requestUpdate();
    }

    private handleAddGroup(newGroup: IArgsKeeperGroup): void {
        console.log(newGroup);
    }

    protected render(): TemplateResult {
        return html`
            <h1 class="title is-1">${this.argsKeeper.title}</h1>
            <p>${this.argsKeeper.desc}</p>

            <hr>

            <div class="field">
                <label class="label">SEARCH</label>
                <div class="control">
                    <input class="input" type="text" placeholder="group.ProgramOrCommand.Command">
                </div>
            </div>

            <h3 class="title is-3">
                GROUPS
                <a class="button is-success" @click=${this.handleAddGroupClick}>+</a>
            </h3>
            ${this.showGroupForm?
                html`<argsk-group-form .onAddGroup=${this.handleAddGroup}></argsk-group-form>`:html``
            }
            ${this.argsKeeper.groups.map((val, i) =>
                html`<div class="box"><h3>${val.name}</h3></div>`
            )}
        `;
    }
}

customElements.define(DisplayPageElement.elName, DisplayPageElement);
