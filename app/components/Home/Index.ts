import "./Feed/components/index.js"
import {getUsers, deleteUsers, listenUsers} from '../../services/dbpost.js'

import data from "./Feed/data.js"

import MyCounter from "./Feed/components/Counter/Counter.js";
import MyStories, {SAttribute} from "./Feed/components/stories/Stories.js";
import MyRecomend, {SBAttribute} from "./Feed/components/Sidebar/Sidebar.js";

import MyProfile, {Attribute} from "./Feed/components/Profile/Profile.js";

//Llamar info para los posts ya existentes

export class FeedContainer extends HTMLElement{
    counters: MyCounter[] = [];
    profiles: MyProfile[] =[];

    constructor(){
        super();
        this.attachShadow({mode: "open"});
        const counter = this.ownerDocument.createElement("my-counter") as MyCounter;
        counter.button.addEventListener("click",()=>{
            console.log("button clicked");
        })
        this.counters.push(counter);

        data.forEach((user)=>{
            const profileCard = this.ownerDocument.createElement("my-profile") as MyProfile;
            profileCard.setAttribute(Attribute.username, user.username);
            profileCard.setAttribute(Attribute.ubication, user.ubication);
            profileCard.setAttribute(Attribute.profilepic, user.profilepic);
            profileCard.setAttribute(Attribute.post, user.post);
            profileCard.setAttribute(Attribute.usercomment, user.caption.usercomment);
            profileCard.setAttribute(Attribute.hashtag, user.caption.hashtag);
            profileCard.setAttribute(Attribute.numbercomments, String(user.numbercomments));
            profileCard.setAttribute(Attribute.date, user.date);
            this.profiles.push(profileCard);
        });
    }

    connectedCallback(){
        this.render();
    }

    render(){
        if(this.shadowRoot){
            this.shadowRoot.innerHTML = ``;
            this.profiles.forEach((profile)=>{
                this.shadowRoot?.appendChild(profile);
            })
        }
    }
}

customElements.define("feed-container",FeedContainer);

//Llamar info para los posts nuevos

export class PostContainer extends HTMLElement{

    constructor(){
        super();
        this.attachShadow({mode: 'open'});
    }

    async connectedCallback(){
        
        listenUsers((users)=>{
            this.render(users);

            const card = this.shadowRoot?.querySelectorAll("my-newpost");
            card?.forEach((cardE) => {
                cardE?.addEventListener('delete-user', async (evt: CustomEvent) => {
                    deleteUsers(evt.detail.uid);
                })
            })
        })
    }

    render(users?){
        if(!this.shadowRoot) return;
        const cardUser = users.map(e => {
            return `<my-newpost uid="${e.id}" ubication="${e.data.ubication}" post="${e.data.post}" caption="${e.data.caption}" hashtag="${e.data.hashtag}"></my-newpost>`
        });
        this.shadowRoot.innerHTML = cardUser.join('');
    }
}

customElements.define("newpost-container",PostContainer);


//Llamar info para las Stories

export class StoriesContainer extends HTMLElement{
    stories: MyStories[] =[];
    

    constructor(){
        super();
        this.attachShadow({mode: "open"});

        data.forEach((user)=>{
            const storyCard = this.ownerDocument.createElement("my-stories") as MyStories;
            storyCard.setAttribute(SAttribute.username, user.username);
            storyCard.setAttribute(SAttribute.profilepic, user.profilepic);
            this.stories.push(storyCard);
        });
    }

    connectedCallback(){
        this.render();
    }

    render(){
        if(this.shadowRoot){
            this.shadowRoot.innerHTML = ``;
            this.stories.forEach((story)=>{
                this.shadowRoot?.appendChild(story);
            })
        }
    }
}

customElements.define("stories-container",StoriesContainer);

//Llamar info para las Recomendation

export class Recomendation extends HTMLElement{
    recomendations: MyRecomend[] =[];

    constructor(){
        super();
        this.attachShadow({mode: "open"});

        data.forEach((user)=>{
            const storyCard = this.ownerDocument.createElement("my-sidebar") as MyRecomend;
            storyCard.setAttribute(SBAttribute.username, user.username);
            storyCard.setAttribute(SBAttribute.profilepic, user.profilepic);
            this.recomendations.push(storyCard);
        });
    }

    connectedCallback(){
        this.render();
    }

    render(){
        if(this.shadowRoot){
            this.shadowRoot.innerHTML = ``;
            this.recomendations.forEach((recomendation)=>{
                this.shadowRoot?.appendChild(recomendation);
            })
        }
    }
}

customElements.define("recomend-container",Recomendation);