export enum Attribute {
    "username"="username",
    "ubication" = "ubication",
    "profilepic" = "profilepic",
    "post" = "post",
    "usercomment" = "usercomment",
    "hashtag" = "hashtag",
    "numbercomments" = "numbercomments",
    "date" = "date",
}

export default class MyProfile extends HTMLElement{
    username?: string;
    ubication?: string;
    profilepic?: string;
    post?: string;
    usercomment?: string;
    hashtag?: string;
    numbercomments?: number;
    date?: string;

    static get observedAttributes(){
        const attrs: Record<Attribute,null> = {
            username: null,
            ubication: null,
            profilepic: null,
            post: null,
            usercomment: null,
            hashtag: null,
            numbercomments: null,
            date: null,
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
        propName: Attribute,
        oldValue: string | undefined,
        newValue: string | undefined,
        ){
            switch (propName) {
                case Attribute.numbercomments:
                    this.numbercomments = newValue ? Number(newValue) : undefined;                                        
                    break;
            
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
            <section class="PostCard">

                <section id="PostHeader">
                    <img class="ProfilePic" ${this.profilepic}

                    <div>
                        <h4 class="username">${this.username}</h4>
                        <p class="Ubication">${this.ubication}</p>
                    </div>

                    <img class="PointsIcon" alt="Posted Picture Not Found" src="https://static.thenounproject.com/png/585197-200.png">
                </section>

                <img class="PostPicture" ${this.post}

                <my-counter></my-counter>

                <section id="UserCaptionSection">
                    <p class="Caption"><b class="username">${this.username}</b> ${this.usercomment} <t>${this.hashtag}</t> </p>
                    <p class="Comment">View all ${this.numbercomments} comments</p>
                    <p class="Date">${this.date}</p>
                </section>
                
            </section>
            `
        }
    }
}

customElements.define("my-profile", MyProfile);


