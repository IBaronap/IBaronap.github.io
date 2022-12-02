class MyCounter extends HTMLElement {
    constructor() {
        super();
        this.count = 666;
        this.handleClick = () => {
            this.count++;
            this.render();
        };
        this.attachShadow({ mode: "open" });
        this.button = this.ownerDocument.createElement("img");
        this.button.setAttribute('src', "./components/Home/Feed/components/Profile/Imgs/heart_red.png");
        this.button.className = "FooterIcon";
        this.button.id = "HeartCounterIcon";
        this.button.addEventListener("click", this.handleClick);
    }
    connectedCallback() {
        this.render();
    }
    render() {
        if (this.shadowRoot) {
            this.shadowRoot.innerHTML = `
            <section>
            <link href="./Style.css" rel="stylesheet">
                <div id="PostFooter">

                    <div id="FooterIconSection">
                        <img class="FooterIcon" src="./components/Home/Feed/components/Profile/Imgs/comment.png">
                        <img class="FooterIcon" src="./components/Home/Feed/components/Profile/Imgs/share.png">
                    </div>

                    <img class="SwipePointsIcon" src="./components/Home/Feed/components/Profile/Imgs/swipe.jpg">
                    <img class="FooterIcon" id="bookmark" src="./components/Home/Feed/components/Profile/Imgs/bookmark.png">
                </div>

                <b>${this.count} likes</b>
            </section>
            `;
            this.shadowRoot.appendChild(this.button);
        }
    }
}
customElements.define("my-counter", MyCounter);
export default MyCounter;
