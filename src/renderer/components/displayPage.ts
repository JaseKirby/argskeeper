import { html, LitElement, property } from "@polymer/lit-element";
import { TemplateResult } from "lit-html";
import { IArgsKeeper } from "../../models/argsKeeper";
import { IArgsKeeperGroup } from "../../models/argsKeeperGroup";
import "./groupForm";
import "./group";
import { ArgsKeeperEditor } from "../../editors/argsKeeperEditor";

export class DisplayPageElement extends LitElement {
    public static elName: string = "argsk-display";

    @property({type: Boolean})
    public saving: boolean = false;

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
        const editor: ArgsKeeperEditor = new ArgsKeeperEditor(this.argsKeeper);
        try {
            editor.addGroup(newGroup);
            this.onArgsKeeperChange(this.argsKeeper);
            this.showGroupForm = false;
        } catch(err) {
            // todo: send to user error notification well to be implemented in main component
            console.error(err);
        }
    }

    private handleGroupRemove(groupToRemoveName: string): void {
        const editor: ArgsKeeperEditor = new ArgsKeeperEditor(this.argsKeeper);
        editor.removeGroupByName(groupToRemoveName);
        this.onArgsKeeperChange(this.argsKeeper);
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

            <div class="box">
                <h3 class="title is-3">
                    GROUPS
                    <a class="button is-success" @click=${this.handleAddGroupClick}>+</a>
                </h3>
                ${this.showGroupForm?
                    html`<argsk-group-form
                            ?saving="${this.saving}"
                            .onAddGroup=${this.handleAddGroup.bind(this)}>
                        </argsk-group-form>`:html``
                }
                <br>
                ${this.argsKeeper.groups.map((val, i) =>
                    html`<argsk-group
                            ?saving="${this.saving}"
                            .group=${val}
                            .onGroupRemove=${this.handleGroupRemove.bind(this)}>
                         </argsk-group>`
                )}
            </div>
        `;
    }
}

customElements.define(DisplayPageElement.elName, DisplayPageElement);
