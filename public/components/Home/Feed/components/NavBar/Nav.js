export class MyNavBar extends HTMLElement {
    constructor() {
        super();
        this.OpenModal = () => {
            var _a;
            let modal = (_a = this.shadowRoot) === null || _a === void 0 ? void 0 : _a.getElementById("ModalOverlay");
            modal.style.display = "block";
            this.CloseBTN.style.display = "block";
        };
        this.CloseModal = () => {
            var _a;
            let modal = (_a = this.shadowRoot) === null || _a === void 0 ? void 0 : _a.getElementById("ModalOverlay");
            modal.style.display = "none";
            this.CloseBTN.style.display = "none";
        };
        this.attachShadow({ mode: 'open' });
        this.OpenBTN = this.ownerDocument.createElement("img");
        this.OpenBTN.setAttribute('src', "./components/Home/Feed/components/Profile/Imgs/Upload.png");
        this.OpenBTN.className = "HeaderIcon";
        this.OpenBTN.id = "AddNewPostBtn";
        this.OpenBTN.onclick = (this.OpenModal);
        this.CloseBTN = this.ownerDocument.createElement("h2");
        this.CloseBTN.innerHTML = "X";
        this.CloseBTN.id = "Close";
        this.CloseBTN.onclick = (this.CloseModal);
    }
    connectedCallback() {
        this.render();
    }
    render() {
        if (this.shadowRoot) {
            this.shadowRoot.innerHTML = `
            <link href="./public/Style.css" rel="stylesheet">

            <div class="Header">
                <section class="RecomendationCard">
                    <img class="Logo" src="./components/Home/Feed/components/Profile/Imgs/Logo.png">
                    <input type="text" class="search" placeholder="Search">
                    <div class="NavIconsSection">
                        <img class="HeaderIcon" src="./components/Home/Feed/components/Profile/Imgs/Home.png">
                        <img class="HeaderIcon" src="./components/Home/Feed/components/Profile/Imgs/Chat.jpg">
                        <img class="HeaderIcon" id="FalseIcon" src="./components/Home/Feed/components/Profile/Imgs/Upload.png">
                        <img class="HeaderIcon" src="./components/Home/Feed/components/Profile/Imgs/Explore.png">
                        <img class="HeaderIcon" src="./components/Home/Feed/components/Profile/Imgs/heart.png">
                        <img class="HeaderIcon" id="UserProfilePicture" src="https://i.pinimg.com/originals/49/88/21/498821435726040a731f849a8c9d9244.png">    
                    </div>
                </section>
            </div>

            <div id="ModalOverlay" class="ModalOverlay">
                <app-send></app-send>
            </div>
            `;
            this.shadowRoot.appendChild(this.OpenBTN);
            this.shadowRoot.appendChild(this.CloseBTN);
        }
    }
}
customElements.define("nav-container", MyNavBar);
