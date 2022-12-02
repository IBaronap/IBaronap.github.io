import data from "./data.js";
import "./components/index.js";
import { SAttribute } from "./components/stories/Stories.js";
import { Attribute } from "./components/Profile/Profile.js";
import { SBAttribute } from "./components/Sidebar/Sidebar.js";
class FeedContainer extends HTMLElement {
    constructor() {
        super();
        this.counters = [];
        this.profiles = [];
        this.attachShadow({ mode: "open" });
        const counter = this.ownerDocument.createElement("my-counter");
        counter.button.addEventListener("click", () => {
            console.log("button clicked");
        });
        this.counters.push(counter);
        data.forEach((user) => {
            const profileCard = this.ownerDocument.createElement("my-profile");
            profileCard.setAttribute(Attribute.username, user.username);
            profileCard.setAttribute(Attribute.ubication, user.ubication);
            profileCard.setAttribute(Attribute.profilepic, user.profilepic);
            profileCard.setAttribute(Attribute.post, user.post);
            profileCard.setAttribute(Attribute.usercomment, user.caption.usercomment);
            profileCard.setAttribute(Attribute.hashtag, user.caption.hashtag);
            profileCard.setAttribute(Attribute.numbercomments, String(user.numbercomments));
            profileCard.setAttribute(Attribute.date, user.date);
            this.profiles.push(profileCard);
        });
    }
    connectedCallback() {
        this.render();
    }
    render() {
        if (this.shadowRoot) {
            this.shadowRoot.innerHTML = ``;
            this.profiles.forEach((profile) => {
                var _a;
                (_a = this.shadowRoot) === null || _a === void 0 ? void 0 : _a.appendChild(profile);
            });
        }
    }
}
class StoriesContainer extends HTMLElement {
    constructor() {
        super();
        this.stories = [];
        this.attachShadow({ mode: "open" });
        data.forEach((user) => {
            const storyCard = this.ownerDocument.createElement("my-stories");
            storyCard.setAttribute(SAttribute.username, user.username);
            storyCard.setAttribute(SAttribute.profilepic, user.profilepic);
            this.stories.push(storyCard);
        });
    }
    connectedCallback() {
        this.render();
    }
    render() {
        if (this.shadowRoot) {
            this.shadowRoot.innerHTML = ``;
            this.stories.forEach((story) => {
                var _a;
                (_a = this.shadowRoot) === null || _a === void 0 ? void 0 : _a.appendChild(story);
            });
        }
    }
}
class Recomendation extends HTMLElement {
    constructor() {
        super();
        this.recomendations = [];
        this.attachShadow({ mode: "open" });
        data.forEach((user) => {
            const storyCard = this.ownerDocument.createElement("my-sidebar");
            storyCard.setAttribute(SBAttribute.username, user.username);
            storyCard.setAttribute(SBAttribute.profilepic, user.profilepic);
            this.recomendations.push(storyCard);
        });
    }
    connectedCallback() {
        this.render();
    }
    render() {
        if (this.shadowRoot) {
            this.shadowRoot.innerHTML = ``;
            this.recomendations.forEach((recomendation) => {
                var _a;
                (_a = this.shadowRoot) === null || _a === void 0 ? void 0 : _a.appendChild(recomendation);
            });
        }
    }
}
customElements.define("stories-container", StoriesContainer);
customElements.define("feed-container", FeedContainer);
customElements.define("recomend-container", Recomendation);
