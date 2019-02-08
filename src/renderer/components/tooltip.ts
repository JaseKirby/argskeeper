import { html, LitElement, property, TemplateResult } from "lit-element";

export class ToolTipElement extends LitElement {
    public static elName: string = "argsk-tooltip";

    @property({type: String})
    public text: string;

    constructor() {
        super();
    }

    protected render(): TemplateResult {
        return html`
        <style>
            :host[hidden] { display: none; }
            /* Tooltip container */
            .tooltip {
                position: relative;
                display: inline-block;
            }

            /* Tooltip text */
            .tooltip .tooltiptext {
                visibility: hidden;
                width: 120px;
                background-color: #555;
                color: #fff;
                font-size: medium;
                text-align: center;
                padding: 5px 0;
                border-radius: 6px;

                /* Position the tooltip text */
                position: absolute;
                z-index: 1;
                bottom: 125%;
                left: 50%;
                margin-left: -60px;

                /* Fade in tooltip */
                opacity: 0;
                transition: opacity 0.3s;
            }

            /* Tooltip arrow */
            .tooltip .tooltiptext::after {
                content: "";
                position: absolute;
                top: 100%;
                left: 50%;
                margin-left: -5px;
                border-width: 5px;
                border-style: solid;
                border-color: #555 transparent transparent transparent;
            }

            /* Show the tooltip text when you mouse over the tooltip container */
            .tooltip:hover .tooltiptext {
                visibility: visible;
                opacity: 1;
            }
        </style>
        <div class="tooltip">
            <slot></slot>
            <span class="tooltiptext">${this.text}</span>
        </div>
        `;
    }
}

customElements.define(ToolTipElement.elName, ToolTipElement);
