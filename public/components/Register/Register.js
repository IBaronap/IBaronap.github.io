import { addUser } from "../../services/db.js";
export class Register extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
    }
    connectedCallback() {
        var _a;
        this.render();
        const form = (_a = this.shadowRoot) === null || _a === void 0 ? void 0 : _a.querySelector("app-form");
        form.addEventListener("form-fullfiled", (evt) => {
            const email = evt.detail.email;
            const password = evt.detail.password;
            addUser({ email, password }).then(value => {
                if (value) {
                    const event = new CustomEvent("register-success", {});
                    console.log(this);
                    this.dispatchEvent(event);
                }
            });
        });
    }
    render() {
        if (!this.shadowRoot)
            return;
        this.shadowRoot.innerHTML = `
        <section class="RegisterForm">
        <link href="./public/Style.css" rel="stylesheet">

            <img class="InstaLogo" src="https://logos-download.com/wp-content/uploads/2016/03/Instagram_Logo_2016.png">
            <h4 class="GreyText">Register to see photos and vídeos of your friends</h4>
            <button>Log in with Facebook</button>
            <h3 class="GreyText">OR</h3>

            <app-form></app-form>

            <p id="RegisterTerms" class="GreyText">By signing up, you agree to our <b>Terms, Data Policy</b> and <b>Cookies Policy</b></p>
        </section>

        <section class="ChangeScreenText">
            <p>Have an account? <t>Enter</t></p>
        </section>

        <section class="DownloadTheApp">
            <p>Download the app</p>
            <img class="StoreIcon" src="https://www.seekpng.com/png/full/22-227594_download-on-the-app-store-badge-available-on.png">
            <img class="StoreIcon" src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/78/Google_Play_Store_badge_EN.svg/2560px-Google_Play_Store_badge_EN.svg.png">
        </section>

        <section>
            <p class="GreySmallText">Meta · About · Blog · Jobs · Help · API  Privacy · Terms · Top Accounts · Hashtags · Locations · Instagram  Lite · Contact Uploading & Non-Users · Dance · Food & Drink · Home & Garden · Music · Visual Arts</p>
            <p class="GreySmallText">English ˅  ·  © 2022 Instagram from Meta</p>
        </section>
        `;
    }
}
customElements.define("app-register", Register);
