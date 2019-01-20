import { html, LitElement, property } from "@polymer/lit-element";
import { TemplateResult } from "lit-html";
import { IArgsKeeper } from "../../models/argsKeeper";
import { IArgsKeeperGroup } from "../../models/argsKeeperGroup";
import "./groupForm";

export class DisplayPageElement extends LitElement {
    public static elName: string = "argsk-display";

    @property({type: Object})
    public argsKeeper: IArgsKeeper;

    @property({type: Object})
    public onArgsKeeperChange: (newArgsKeeper: IArgsKeeper) => void;

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
        this.argsKeeper.groups.push(newGroup);
        this.onArgsKeeperChange(this.argsKeeper);
        this.showGroupForm = false;
    }

    protected render(): TemplateResult {
        return html`
            <h1 class="title is-1">${this.argsKeeper.title}</h1>
            <p>${this.argsKeeper.desc}</p>

            <hr>

            <div class="field">
                <label class="label">SEARCH</label>
                <div class="control">
                    <input class="input" type="text" placeholder="group.programOrCommand.command">
                </div>
            </div>

            <br>

            <h3 class="title is-3">
                GROUPS
                <a class="button is-success" @click=${this.handleAddGroupClick}>+</a>
            </h3>
            ${this.showGroupForm?
                html`<argsk-group-form .onAddGroup=${this.handleAddGroup.bind(this)}></argsk-group-form>`:html``
            }
            <br>
            ${this.argsKeeper.groups.map((val, i) =>
                html`<div class="box"><h3>${val.name}</h3></div>`
            )}
        `;
    }
}

customElements.define(DisplayPageElement.elName, DisplayPageElement);
