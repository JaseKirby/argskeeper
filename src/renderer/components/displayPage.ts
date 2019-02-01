import { html, LitElement, property } from "@polymer/lit-element";
import { TemplateResult } from "lit-html";
import { IArgsKeeper } from "../../models/argsKeeper";
import { IArgsKeeperGroup } from "../../models/argsKeeperGroup";
import "./search";
import "./groupForm";
import "./groupList";
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

    @property({type: Object})
    public onErrors: (errors: string[]) => void;

    private showGroupForm: boolean = false;
    private groupFilter: string;

    constructor() {
        super();
        this.handleGroupSearch = this.handleGroupSearch.bind(this);
        this.handleAddGroup = this.handleAddGroup.bind(this);
        this.handleGroupRemove = this.handleGroupRemove.bind(this);
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
            this.onErrors([err]);
        }
    }

    private handleGroupRemove(groupToRemoveName: string): void {
        const editor: ArgsKeeperEditor = new ArgsKeeperEditor(this.argsKeeper);
        editor.removeGroupByName(groupToRemoveName);
        this.onArgsKeeperChange(this.argsKeeper);
    }

    private handleGroupSearch(groupSearchKey: string): void {
        this.groupFilter = groupSearchKey;
        this.requestUpdate();
    }

    protected render(): TemplateResult {
        return html`
            <h1 class="title is-1">${this.argsKeeper.title}</h1>
            <p>${this.argsKeeper.desc}</p>

            <hr>

            <argsk-search
                .onGroupSearch=${this.handleGroupSearch}>
            </argsk-search>

            <br>

            <div class="box">
                <h3 class="title is-3">
                    GROUPS
                    <a class="button is-success" @click=${this.handleAddGroupClick}>+</a>
                </h3>
                ${this.showGroupForm?
                    html`<argsk-group-form
                            ?saving=${this.saving}
                            .onAddGroup=${this.handleAddGroup}>
                        </argsk-group-form>`:html``
                }
                <br>
                <argsk-group-list
                    ?saving=${this.saving}
                    .groups=${this.argsKeeper.groups}
                    .onGroupRemove=${this.handleGroupRemove}
                    .groupFilter=${this.groupFilter}>
                </argsk-group-list>
            </div>
        `;
    }
}

customElements.define(DisplayPageElement.elName, DisplayPageElement);
