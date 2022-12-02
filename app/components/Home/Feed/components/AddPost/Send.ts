import { addUser } from "../../../../../services/dbpost.js";

export class Send extends HTMLElement{

    constructor(){
        super();
        this.attachShadow({mode: "open"});
    }

    connectedCallback(){
        this.render();
        const form = this.shadowRoot?.querySelector("app-add");
        form.addEventListener("post-fullfiled", (evt: CustomEvent)=>{
            const ubication = evt.detail.ubication;
            const post = evt.detail.post;
            const caption = evt.detail.caption;
            const hashtag = evt.detail.hashtag;

            addUser({ubication, post, caption,hashtag});
        })
    }

    render(){
        if(!this.shadowRoot) return;
        this.shadowRoot.innerHTML = `
        <link href="./public/Style.css" rel="stylesheet">
        <section>
            <div class="FormContainer">
                <h3 class="NewPostTitle">Create new post</h3>
                <app-add></app-add>
            </div>
        </section>
        `
    }
}

customElements.define("app-send",Send);