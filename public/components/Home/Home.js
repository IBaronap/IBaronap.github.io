import "./Index.js";
export class Home extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
    }
    connectedCallback() {
        this.render();
    }
    render() {
        if (!this.shadowRoot)
            return;
        this.shadowRoot.innerHTML = `<link href="./public/Style.css" rel="stylesheet">
        <article>

            <nav-container></nav-container>

            <div class="HomeBody">
                <div>
                    <div class="StoriesContainer">
                        <stories-container></stories-container>
                    </div>
            
                    <newpost-container></newpost-container>
                    <feed-container></feed-container>

                </div>

                <div class="Sidebar">
                    <div class="UserDiv">
                        <img class="ProfilePic" src="https://i.pinimg.com/originals/49/88/21/498821435726040a731f849a8c9d9244.png">
                
                        <div>
                            <p class="UserNameA">Skeleton666</p>
                            <p class="UserNameB">Skeleton666</p>
                        </div>

                        <p class="SwitchUserText">Switch</p>
                    </div>

                    <div class="SuggestionsSection">
                        <p class="SuggestionsText">Suggestions for you</p>
                        <p class="SeeAllText">See All</p>
                    </div>
            
                    <recomend-container></recomend-container>
            
                    <p class="AboutText">About · Help · Press · API · Jobs · Privacy · Terms · Locations · Top Accounts · Hashtags · Language</p>
                    <p class="AboutText">2022 INSTAGRAM BUT NOT FROM META</p>
                </div>
            </div>
        </article>
        `;
    }
}
customElements.define("app-home", Home);
