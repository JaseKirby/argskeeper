import { html, LitElement, property, TemplateResult } from "lit-element";
import { IArgsKeeper } from "../../models/argsKeeper";
import { IArgsKeeperGroup } from "../../models/argsKeeperGroup";
import { ArgsKeeperEditor } from "../../editors/argsKeeperEditor";
import "./search";
import "./groupForm";
import "./groupList";
import "./group";
import "./tooltip";

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
    private commandFilter: string;

    constructor() {
        super();
        this.handleGroupSearch = this.handleGroupSearch.bind(this);
        this.handleCommandSearch = this.handleCommandSearch.bind(this);
        this.handleAddGroup = this.handleAddGroup.bind(this);
        this.handleGroupRemove = this.handleGroupRemove.bind(this);
        this.handleGroupsChange = this.handleGroupsChange.bind(this);
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
    
    private handleGroupsChange(newGroups: IArgsKeeperGroup[]): void {
        this.argsKeeper.groups = newGroups;
        this.onArgsKeeperChange(this.argsKeeper);
    }

    private handleGroupSearch(groupSearchKey: string): void {
        this.groupFilter = groupSearchKey;
        this.commandFilter = "";
        this.requestUpdate();
    }

    private handleCommandSearch(commandSearchKey: string): void {
        this.commandFilter = commandSearchKey;
        this.requestUpdate();
    }

    protected render(): TemplateResult {
        return html`
            <style>
                .argsk-groups-title {
                    margin-bottom:2px;
                }
                .argsk-create-group-btn {
                    height: 20px;
                }
            </style>
            <h1 class="title is-1">${this.argsKeeper.title}</h1>
            <p>${this.argsKeeper.desc}</p>

            <br>

            <argsk-search
                .onGroupSearch=${this.handleGroupSearch}
                .onCommandSearch=${this.handleCommandSearch}>
            </argsk-search>

            <br>

            <div>
                <h3 class="title is-3 argsk-groups-title">
                    GROUPS
                    <argsk-tooltip text="Create new group">
                        <a class="button is-success is-small argsk-create-group-btn"
                            @click=${this.handleAddGroupClick}>+</a>
                    </argsk-tooltip>
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
                    .onGroupsChange=${this.handleGroupsChange}
                    .groupFilter=${this.groupFilter}
                    .commandFilter=${this.commandFilter}
                    .onErrors=${this.onErrors}>
                </argsk-group-list>
            </div>
        `;
    }
}

customElements.define(DisplayPageElement.elName, DisplayPageElement);
