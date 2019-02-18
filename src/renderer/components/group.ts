import { html, LitElement, property, TemplateResult } from "lit-element";
import { IArgsKeeperGroup } from "../../models/argsKeeperGroup";
import { IArgsKeeperCommand } from "../../models/argsKeeperCommand";
import { GroupEditor } from "../../editors/groupEditor";
import "./commandForm";
import "./command";

export class GroupElement extends LitElement {
    public static elName: string = "argsk-group";

    @property({type: Boolean})
    public saving: boolean = false;

    @property({type: Number})
    public key: number;

    @property({type: Object})
    public group: IArgsKeeperGroup;

    @property({type: String})
    public commandFilter: string;

    @property({type: Object})
    public onGroupRemove: (groupName: string) => void;

    @property({type: Object})
    public onGroupChange: (index: number, newGroup: IArgsKeeperGroup) => void;

    @property({type: Object})
    public onErrors: (errors: string[]) => void;

    @property({type: Boolean})
    public showGroupDetails: boolean;

    private showNewCommandForm: boolean;

    constructor() {
        super();
        this.handleAddCommand = this.handleAddCommand.bind(this);
        this.handleCommandRemove = this.handleCommandRemove.bind(this);
    }

    // implement this method and return this to remove shadow dom and use global style
    protected createRenderRoot(): any {
        return this;
    }

    private handleGroupBoxClick(e: MouseEvent): void {
        this.showGroupDetails = !this.showGroupDetails;
        this.requestUpdate();
    }

    private handleGroupRemoveButtonClick(e: MouseEvent): void {
        const el: HTMLLinkElement = e.target as HTMLLinkElement;
        this.onGroupRemove(el.id);
        e.stopPropagation();
    }

    private handleCreateNewCommandButtonClick(e: MouseEvent): void {
        this.showNewCommandForm = !this.showNewCommandForm;
        this.requestUpdate();
    }

    private handleAddCommand(newCommand: IArgsKeeperCommand): void {
        const groupEditor: GroupEditor = new GroupEditor(this.group);
        try{
            groupEditor.addCommand(newCommand);
            this.onGroupChange(this.key, this.group);
            this.showNewCommandForm = false;
        } catch(err) {
            this.onErrors([err]);
        }
    }

    private handleCommandRemove(commandName: string): void {
        const ge: GroupEditor = new GroupEditor(this.group);
        ge.removeCommandByName(commandName);
        this.onGroupChange(this.key, this.group);
    }

    protected render(): TemplateResult {
        return html`
        <style>
            :host[hidden] { display: none; }
            :host { display: block; }
            .argsk-group {
                margin-bottom: 5px;
            }
            .argsk-group-title:hover {
                cursor: pointer;
                background-color: hsl(0, 0%, 96%);
            }
            .argsk-remove-group-btn {
                height: 20px;
            }
            .argsk-new-cmd-btn {
                height: 15px;
            }
        </style>
        <div class="box argsk-group">
            <div class="argsk-group-title" @click=${this.handleGroupBoxClick}>
                <h3 class="title is-3">
                    ${this.group.name}
                    <argsk-tooltip text="Remove this group">
                        <a name=${this.group.name}
                            class=${this.determineRemoveButtonClass()}
                            ?disabled=${this.saving}
                            @click=${this.handleGroupRemoveButtonClick}>-</a>
                    </argsk-tooltip>
                </h3>
                <h5 class="subtitle is-5">${this.group.desc}</h5>
            </div>
            ${this.determineShowGroupDetails()}
        </div>
        `;
    }

    private determineShowGroupDetails(): TemplateResult {
        if(this.showGroupDetails) {
            let commandsToShow: IArgsKeeperCommand[] = this.group.commands;
            if(this.commandFilter !== undefined) {
                commandsToShow = this.group.commands.filter(x => x.name.startsWith(this.commandFilter));
            }
            return html`
            <hr>
            <h5 class="title is-5">
                COMMANDS
                <argsk-tooltip text="Create new command">
                    <a class="button is-success is-small argsk-new-cmd-btn"
                        @click=${this.handleCreateNewCommandButtonClick}>+</a>
                </argsk-tooltip>
            </h5>

            ${this.showNewCommandForm?
                html`
                <argsk-command-form
                    .saving=${this.saving}
                    .onAddCommand=${this.handleAddCommand}>
                </argsk-command-form>`
                : html``}
            
            ${commandsToShow.map((val, i) =>
                html`
                <argsk-command
                    .saving=${this.saving}
                    .key=${i}
                    .command=${val}
                    .onCommandRemove=${this.handleCommandRemove}>
                </argsk-command>
                `
            )}
            `;
        } else {
            return html``;
        }
    }

    private determineRemoveButtonClass(): string {
        const baseClass: string = "button is-danger is-small argsk-remove-group-btn";
        if(this.saving) {
            return baseClass + " is-loading";
        } else {
            return baseClass;
        }
    }
}

customElements.define(GroupElement.elName, GroupElement);
