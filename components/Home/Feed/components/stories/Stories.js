export var SAttribute;
(function (SAttribute) {
    SAttribute["username"] = "username";
    SAttribute["profilepic"] = "profilepic";
})(SAttribute || (SAttribute = {}));
export default class MyStories extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }
    static get observedAttributes() {
        const attrs = {
            username: null,
            profilepic: null
        };
        return Object.keys(attrs);
    }
    connectedCallback() {
        this.render();
    }
    attributeChangedCallback(propName, oldValue, newValue) {
        switch (propName) {
            default:
                this[propName] = newValue;
                break;
        }
        this.render();
    }
    render() {
        if (this.shadowRoot) {
            this.shadowRoot.innerHTML = `
            <link href="./Style.css" rel="stylesheet">
            <section class="StoryCard">
                <img class="ProfilePicStory" ${this.profilepic}
                <p class="UserNameStory">${this.username}</p>
            </section>
            `;
        }
    }
}
customElements.define("my-stories", MyStories);