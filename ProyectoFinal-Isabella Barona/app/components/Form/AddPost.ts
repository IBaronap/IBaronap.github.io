export class AddPost extends HTMLElement{
    ubication = "";
    post = "";
    caption = "";
    hashtag = "";

    constructor(){
        super();
        this.attachShadow({mode: "open"});
    }

    connectedCallback(){
        this.render();

        const btn = this.shadowRoot?.querySelector("button");
        btn?.addEventListener("click",()=>{
            const event: CustomEvent<{ubication: string, post: string, caption: string, hashtag: string}> = 
            new CustomEvent("post-fullfiled",{
                detail: {ubication: this.ubication, post: this.post, caption: this.caption, hashtag: this.hashtag},
                composed: true
            });

            this.dispatchEvent(event);
            console.log(event);
        });

        const ubicationInput = this.shadowRoot?.querySelector('input[type="ubication"]');
        const postInput = this.shadowRoot?.querySelector('input[type="post"]');
        const captionInput = this.shadowRoot?.querySelector('input[type="caption"]');
        const hashtagInput = this.shadowRoot?.querySelector('input[type="hashtag"]');
        
        ubicationInput?.addEventListener("change",(evt) => {
            const value: string = (evt.target as HTMLInputElement).value || "";
            this.ubication = value;
        });

        postInput?.addEventListener("change",(evt) => {
            const value: string = (evt.target as HTMLInputElement).value || "";
            this.post = value;
        });

        captionInput?.addEventListener("change",(evt) => {
            const value: string = (evt.target as HTMLInputElement).value || "";
            this.caption = value;
        });

        hashtagInput?.addEventListener("change",(evt) => {
            const value: string = (evt.target as HTMLInputElement).value || "";
            this.hashtag = value;
        });
    }

    render(){
        if(!this.shadowRoot) return;
        this.shadowRoot.innerHTML = `
        <article>
        <link href="./Style.css" rel="stylesheet">

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
        `
    }
}

customElements.define("app-add",AddPost);