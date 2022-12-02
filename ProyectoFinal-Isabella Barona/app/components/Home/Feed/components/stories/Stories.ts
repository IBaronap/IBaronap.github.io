export enum SAttribute {
    "username"="username",
    "profilepic" = "profilepic",
}

export default class MyStories extends HTMLElement{
    username?: string;
    profilepic?: string;

    static get observedAttributes(){
        const attrs: Record<SAttribute,null> = {
            username: null,
            profilepic: null
        };
        return Object.keys(attrs);
    }

    constructor(){
        super();
        this.attachShadow({mode: 'open'});
    }

    connectedCallback(){
        this.render();
    }

    attributeChangedCallback(
        propName: SAttribute,
        oldValue: string | undefined,
        newValue: string | undefined,
        ){
            switch (propName) {
                default:
                    this[propName] = newValue;
                    break;
            }
            this.render();
    }

    render(){
        if(this.shadowRoot){
            this.shadowRoot.innerHTML = `
            <link href="./Style.css" rel="stylesheet">
            <section class="StoryCard">
                <img class="ProfilePicStory" ${this.profilepic}
                <p class="UserNameStory">${this.username}</p>
            </section>
            `
        }
    }
}

customElements.define("my-stories", MyStories);