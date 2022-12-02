export var SBAttribute;
(function (SBAttribute) {
    SBAttribute["username"] = "username";
    SBAttribute["profilepic"] = "profilepic";
})(SBAttribute || (SBAttribute = {}));
export default class MyRecomend extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }
    static get observedAttributes() {
        const attrs = {
            username: null,
            profilepic: null,
        };
        return Object.keys(attrs);
    }
    connectedCallback() {
        this.render();
    }
    attributeChangedCallback(propName, oldValue, newValue) {
        switch (propName) {
            default:
                this[propName] = newValue;
                break;
        }
        this.render();
    }
    render() {
        if (this.shadowRoot) {
            this.shadowRoot.innerHTML = `
            <link href="./Style.css" rel="stylesheet">
            <section class="RecomendationCard">
                    <img class="ProfilePic" ${this.profilepic}
                    <div>
                        <h4 class="username">${this.username}</h4>
                        <p class="NewInInstagramText">New in Instagram</p>
                    </div>
                    <p class="FollowText"><t>Follow</t></p>
            </section>
            `;
        }
    }
}
customElements.define("my-sidebar", MyRecomend);
