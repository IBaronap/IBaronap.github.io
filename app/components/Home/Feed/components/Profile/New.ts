export enum NewAttribute {
    "uid" = "uid",
    "ubication" = "ubication",
    "post" = "post",
    "caption" = "caption",
    "hashtag" = "hashtag",
}

export default class NewPost extends HTMLElement{
    uid?: string;
    ubication?: string;
    post?: string;
    caption?: string;
    hashtag?: string;

    static get observedAttributes(){
        const attrs: Record<NewAttribute,null> = {
            uid: null,
            ubication: null,
            post: null,
            caption: null,
            hashtag: null,
        };
        return Object.keys(attrs);
    }

    constructor(){
        super();
        this.attachShadow({mode: 'open'});
    }

    connectedCallback(){
        this.render();

        const btn = this.shadowRoot.querySelector('button');
        btn?.addEventListener('click',()=>{
            const event: CustomEvent<{uid:string,ubication:string,post:string,caption:string,hashtag:string}> = new CustomEvent('delete-user',{
                detail: {uid: this.uid},
                composed: true,
            });
            this.dispatchEvent(event);
        })
    }

    attributeChangedCallback(
        propName: NewAttribute,
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
            <section class="PostCard">
                
                <section id="PostHeader">
                    <img class="ProfilePic" src="https://i.pinimg.com/originals/49/88/21/498821435726040a731f849a8c9d9244.png">

                    <div>
                        <h4 class="username">Skeleton666</h4>
                        <p class="Ubication">${this.ubication}</p>
                    </div>

                    <button class="DeleteBtn"><b>Delete</b></button>
                </section>

                <img class="PostPicture" alt="Posted Picture Not Found" src="${this.post}">

                <my-counter></my-counter>
                
                <section id="UserCaptionSection">
                    <p class="Caption"><b class="username">Skeleton666</b> ${this.caption} <t>${this.hashtag}</t> </p>
                    <p class="Comment">No comments yet</p>
                    <p class="Date">1 min ago</p>
                </section>
            </section>
            `
        }
    }
}

customElements.define("my-newpost", NewPost);