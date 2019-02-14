import { html, LitElement, property, TemplateResult } from "lit-element";
import { debounceTime } from "rxjs/operators";
import { Subject } from "rxjs";

export class SearchElement extends LitElement {
    public static elName: string = "argsk-search";

    @property({type: Object})
    public onGroupSearch: (groupSearchKey: string) => void;

    @property({type: Object})
    public onCommandSearch: (commandSearchKey: string) => void;

    private searchSubj: Subject<string>;

    constructor() {
        super();
        this.searchSubj = new Subject();
        this.searchSubj.pipe(debounceTime(900)).subscribe((s) => {
            const searches: string[] = s.split(".");
            if(searches.length === 1) {
                this.onGroupSearch(searches[0]);
            }
            if(searches.length === 2) {
                this.onCommandSearch(searches[1]);
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
                    placeholder="group.command"
                    @keyup="${this.handleSearchInput}"/>
            </div>
        </div>
        `;
    }
}

customElements.define(SearchElement.elName, SearchElement);
