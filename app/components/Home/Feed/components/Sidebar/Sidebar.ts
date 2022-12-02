export enum SBAttribute {
    "username"="username",
    "profilepic" = "profilepic"
}

export default class MyRecomend extends HTMLElement{
    username?: string;
    profilepic?: string;

    static get observedAttributes(){
        const attrs: Record<SBAttribute,null> = {
            username: null,
            profilepic: null,
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
        propName: SBAttribute,
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
            <link href="./public/Style.css" rel="stylesheet">
            <section class="RecomendationCard">
                    <img class="ProfilePic" ${this.profilepic}
                    <div>
                        <h4 class="username">${this.username}</h4>
                        <p class="NewInInstagramText">New in Instagram</p>
                    </div>
                    <p class="FollowText"><t>Follow</t></p>
            </section>
            `
        }
    }
}

customElements.define("my-sidebar", MyRecomend);