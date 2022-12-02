import { queryUser } from "../../services/db.js";

export class Login extends HTMLElement{

    constructor(){
        super();
        this.attachShadow({mode: "open"});
    }

    connectedCallback(){
        this.render();
        const form = this.shadowRoot?.querySelector("app-form");
        form.addEventListener("form-fullfiled", (evt: CustomEvent)=>{
            const email = evt.detail.email;
            const password = evt.detail.password;

            queryUser({email,password}).then(value => {
                if(value){
                    const event: CustomEvent = new CustomEvent("login-success",{
                        composed: true
                    })
                    this.dispatchEvent(event);
                }else{
                    swal("Email or password is incorrect");
                }
            })
        })
    }

    //swal es una alerta personalizada de la librería Sweet Alert, razón por la que TS no lo detecta, pero igual funciona

    render(){
        if(!this.shadowRoot) return;
        this.shadowRoot.innerHTML = `
        <section class="LoginForm">
        <link href="./public/Style.css" rel="stylesheet">

            <img class="InstaLogo" src="https://logos-download.com/wp-content/uploads/2016/03/Instagram_Logo_2016.png">

            <app-form></app-form>

            <h3 class="GreyText">OR</h3>
            <h5 class="BlueText">Log in with Facebook</h5>
            <h6 class="BlueText">Forgot password?</h6>

        </section>

        <section class="ChangeScreenText">
            <p>Don't have an account? <t id="ChangeScreenText">Register</t></p>
        </section>

        <section class="DownloadTheApp">
            <p>Download the app</p>
            <img class="StoreIcon" src="https://www.seekpng.com/png/full/22-227594_download-on-the-app-store-badge-available-on.png">
            <img class="StoreIcon" src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/78/Google_Play_Store_badge_EN.svg/2560px-Google_Play_Store_badge_EN.svg.png">
        </section>

        <section>
            <p class="GreySmallText">Meta  About  Blog  Jobs  Help  API  Privacy  Terms  Top Accounts  Hashtags  Locations  Instagram  Lite  Contact Uploading & Non-Users  Dance  Food & Drink  Home & Garden  Music  Visual Arts</p>
            <p class="GreySmallText">English ˅  © 2022 Instagram from Meta</p>
        </section>
        `
    }
}

customElements.define("app-login",Login);