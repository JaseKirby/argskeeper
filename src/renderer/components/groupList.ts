import { html, LitElement, property, TemplateResult } from "lit-element";
import { IArgsKeeperGroup } from "../../models/argsKeeperGroup";
import "./group";

export class GroupListElement extends LitElement {
    public static elName: string = "argsk-group-list";

    @property({type: Boolean})
    public saving: boolean = false;

    @property({type: Object})
    public groups: IArgsKeeperGroup[];

    @property({type: Object})
    public onGroupRemove: (groupToRemoveName: string) => void;

    @property({type: Object})
    public onGroupsChange: (newGroups: IArgsKeeperGroup[]) => void;

    @property({type: String})
    public groupFilter: string;

    @property({type: Object})
    public commandFilter: string;

    @property({type: Object})
    public onErrors: (errors: string[]) => void;

    constructor() {
        super();
        this.handleGroupRemove = this.handleGroupRemove.bind(this);
        this.handleGroupChange = this.handleGroupChange.bind(this);
    }

    // implement this method and return this to remove shadow dom and use global style
    protected createRenderRoot(): any {
        return this;
    }

    private handleGroupRemove(groupToRemoveName: string): void {
        this.onGroupRemove(groupToRemoveName);
    }

    private handleGroupChange() {
        this.onGroupsChange(this.groups);
    }

    protected render(): TemplateResult {
        let groupsToShow: IArgsKeeperGroup[] = this.groups;
        if(this.groupFilter !== undefined) {
            groupsToShow = groupsToShow.filter(g => g.name.startsWith(this.groupFilter));
        }
        return html`
            ${groupsToShow.map((val, i) =>
                html`
                <argsk-group
                    ?saving=${this.saving}
                    .key=${i}
                    .group=${val}
                    .onGroupRemove=${this.handleGroupRemove}
                    .onGroupChange=${this.handleGroupChange}
                    .commandFilter=${this.commandFilter}
                    .onErrors=${this.onErrors}>
                </argsk-group>`
            )}
        `;
    }
}

customElements.define(GroupListElement.elName, GroupListElement);
