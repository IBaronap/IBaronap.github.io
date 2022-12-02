export class AddPost extends HTMLElement {
    constructor() {
        super();
        this.ubication = "";
        this.post = "";
        this.caption = "";
        this.hashtag = "";
        this.attachShadow({ mode: "open" });
    }
    connectedCallback() {
        var _a, _b, _c, _d, _e;
        this.render();
        const btn = (_a = this.shadowRoot) === null || _a === void 0 ? void 0 : _a.querySelector("button");
        btn === null || btn === void 0 ? void 0 : btn.addEventListener("click", () => {
            const event = new CustomEvent("post-fullfiled", {
                detail: { ubication: this.ubication, post: this.post, caption: this.caption, hashtag: this.hashtag },
                composed: true
            });
            this.dispatchEvent(event);
            console.log(event);
        });
        const ubicationInput = (_b = this.shadowRoot) === null || _b === void 0 ? void 0 : _b.querySelector('input[type="ubication"]');
        const postInput = (_c = this.shadowRoot) === null || _c === void 0 ? void 0 : _c.querySelector('input[type="post"]');
        const captionInput = (_d = this.shadowRoot) === null || _d === void 0 ? void 0 : _d.querySelector('input[type="caption"]');
        const hashtagInput = (_e = this.shadowRoot) === null || _e === void 0 ? void 0 : _e.querySelector('input[type="hashtag"]');
        ubicationInput === null || ubicationInput === void 0 ? void 0 : ubicationInput.addEventListener("change", (evt) => {
            const value = evt.target.value || "";
            this.ubication = value;
        });
        postInput === null || postInput === void 0 ? void 0 : postInput.addEventListener("change", (evt) => {
            const value = evt.target.value || "";
            this.post = value;
        });
        captionInput === null || captionInput === void 0 ? void 0 : captionInput.addEventListener("change", (evt) => {
            const value = evt.target.value || "";
            this.caption = value;
        });
        hashtagInput === null || hashtagInput === void 0 ? void 0 : hashtagInput.addEventListener("change", (evt) => {
            const value = evt.target.value || "";
            this.hashtag = value;
        });
    }
    render() {
        if (!this.shadowRoot)
            return;
        this.shadowRoot.innerHTML = `
        <article>
        <link href="./public/Style.css" rel="stylesheet">

            <div>
                <input class="AddPostInputs" name="post" type="post" placeholder="Add an image link"/>
            </div>

            <div>
                <input class="AddPostInputs" name="caption" type="caption" placeholder="Add a caption"/>
            </div>

            <div>
                <input class="AddPostInputs" name="hashtag" type="hashtag" placeholder="Add hashtags"/>
            </div>

            <div>
                <input class="AddPostInputs" name="ubication" type="ubication" placeholder="Add an ubication"/>
            </div>

            <button class="AddPostInputs" type="submit">Post</button>
            
        </article>
        `;
    }
}
customElements.define("app-add", AddPost);
