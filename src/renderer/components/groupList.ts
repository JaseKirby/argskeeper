import { html, LitElement, property } from "@polymer/lit-element";
import { TemplateResult } from "lit-html";
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

    @property({type: String})
    public groupFilter: string;

    @property({type: Object})
    public commandFilter: string;

    constructor() {
        super();
        this.handleGroupRemove = this.handleGroupRemove.bind(this);
    }

    // implement this method and return this to remove shadow dom and use global style
    protected createRenderRoot(): any {
        return this;
    }

    private handleGroupRemove(groupToRemoveName: string): void {
        this.onGroupRemove(groupToRemoveName);
    }

    protected render(): TemplateResult {
        let groupsToShow: IArgsKeeperGroup[] = this.groups;
        if(this.groupFilter !== undefined) {
            groupsToShow = groupsToShow.filter(g => g.name.startsWith(this.groupFilter));
        }
        return html`
            ${groupsToShow.map((val) =>
                html`
                <argsk-group
                    ?saving=${this.saving}
                    .group=${val}
                    .onGroupRemove=${this.handleGroupRemove}
                    .commandFilter=${this.commandFilter}>
                </argsk-group>`
            )}
        `;
    }
}

customElements.define(GroupListElement.elName, GroupListElement);
