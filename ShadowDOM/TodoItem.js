const template = document.createElement("template");
template.innerHTML = `
   <style>
    label {
        color: green;
        display: block;
    }

    .description {
        font-size: 0.65rem;
        font-weight: lighter;

    }
   </style>
   <label>
    <input type="checkbox" />
    <slot></slot>
    <span class="description">
        <slot name="description"></slot>
    </span>
   </label>
`

// Changes outside elements as well and outside element generic classes or element css changes affects it too
class TodoItem extends HTMLElement {
    constructor() {
        super();
        const shadow = this.attachShadow({mode: "open"}); // can make modification to the shadow DOM -> this.shadowRoot
        shadow.append(template.content.cloneNode(true));
    }
}

// "-" is required to tell that you are using a custom element and not in-built HTML element.
customElements.define("todo-item", TodoItem);