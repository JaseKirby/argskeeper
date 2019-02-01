import { html, LitElement, property } from "@polymer/lit-element";
import { TemplateResult } from "lit-html";
import { debounceTime } from "rxjs/operators";
import { Subject } from "rxjs";

export class SearchElement extends LitElement {
    public static elName: string = "argsk-search";

    @property({type: Object})
    public onGroupSearch: (groupSearchKey: string) => void;

    private programOrCommandSearchKey: string;
    private doExecuteProgramOrCommandSearch: boolean;
    private commandSearchKey: string;
    private doExecuteCommandSearch: boolean;

    private searchSubj: Subject<string>;

    constructor() {
        super();
        this.searchSubj = new Subject();
        this.searchSubj.pipe(debounceTime(1000)).subscribe((s) => {
            const searches: string[] = s.split(".");
            // todo: figure out search or filter in main page
            if(searches.length === 1) {
                this.onGroupSearch(searches[0]);
            }
            if(searches.length === 2) {
                this.programOrCommandSearchKey = searches[1];
                console.log(`program or command search: ${this.programOrCommandSearchKey}`);
            }
            if(searches.length === 3) {
                this.commandSearchKey = searches[2];
                console.log(`command search: ${this.commandSearchKey}`);
            }
        });
    }

    // implement this method and return this to remove shadow dom and use global style
    protected createRenderRoot(): any {
        return this;
    }

    private handleSearchInput(e: KeyboardEvent): void {
        const el: HTMLInputElement = e.target as HTMLInputElement;
        // if period is key pressed or backspaces entered that results in a period at the end of the search
        if(e.keyCode === 190 || el.value.endsWith(".")) {
            return;
        }
        this.searchSubj.next(el.value);
    }

    protected render(): TemplateResult {
        return html`
        <div class="field">
            <label class="label">SEARCH</label>
            <div class="control">
                <input
                    class="input"
                    type="text"
                    placeholder="group.programOrCommand.command"
                    @keyup="${this.handleSearchInput}"/>
            </div>
        </div>
        `;
    }
}

customElements.define(SearchElement.elName, SearchElement);
