var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import "./Feed/components/index.js";
import { deleteUsers, listenUsers } from '../../services/dbpost.js';
import data from "./Feed/data.js";
import { SAttribute } from "./Feed/components/stories/Stories.js";
import { SBAttribute } from "./Feed/components/Sidebar/Sidebar.js";
import { Attribute } from "./Feed/components/Profile/Profile.js";
//Llamar info para los posts ya existentes
export class FeedContainer extends HTMLElement {
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
customElements.define("feed-container", FeedContainer);
//Llamar info para los posts nuevos
export class PostContainer extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }
    connectedCallback() {
        return __awaiter(this, void 0, void 0, function* () {
            listenUsers((users) => {
                var _a;
                this.render(users);
                const card = (_a = this.shadowRoot) === null || _a === void 0 ? void 0 : _a.querySelectorAll("my-newpost");
                card === null || card === void 0 ? void 0 : card.forEach((cardE) => {
                    cardE === null || cardE === void 0 ? void 0 : cardE.addEventListener('delete-user', (evt) => __awaiter(this, void 0, void 0, function* () {
                        deleteUsers(evt.detail.uid);
                    }));
                });
            });
        });
    }
    render(users) {
        if (!this.shadowRoot)
            return;
        const cardUser = users.map(e => {
            return `<my-newpost uid="${e.id}" ubication="${e.data.ubication}" post="${e.data.post}" caption="${e.data.caption}" hashtag="${e.data.hashtag}"></my-newpost>`;
        });
        this.shadowRoot.innerHTML = cardUser.join('');
    }
}
customElements.define("newpost-container", PostContainer);
//Llamar info para las Stories
export class StoriesContainer extends HTMLElement {
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
customElements.define("stories-container", StoriesContainer);
//Llamar info para las Recomendation
export class Recomendation extends HTMLElement {
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
customElements.define("recomend-container", Recomendation);
