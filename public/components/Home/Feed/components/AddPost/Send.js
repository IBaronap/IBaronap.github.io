import { addUser } from "../../../../../services/dbpost.js";
export class Send extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
    }
    connectedCallback() {
        var _a;
        this.render();
        const form = (_a = this.shadowRoot) === null || _a === void 0 ? void 0 : _a.querySelector("app-add");
        form.addEventListener("post-fullfiled", (evt) => {
            const ubication = evt.detail.ubication;
            const post = evt.detail.post;
            const caption = evt.detail.caption;
            const hashtag = evt.detail.hashtag;
            addUser({ ubication, post, caption, hashtag });
        });
    }
    render() {
        if (!this.shadowRoot)
            return;
        this.shadowRoot.innerHTML = `
        <link href="./public/Style.css" rel="stylesheet">
        <section>
            <div class="FormContainer">
                <h3 class="NewPostTitle">Create new post</h3>
                <app-add></app-add>
            </div>
        </section>
        `;
    }
}
customElements.define("app-send", Send);
