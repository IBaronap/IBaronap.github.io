import { initializeApp } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-app.js";
import { getFirestore, collection, doc, query, where, getDocs, addDoc, deleteDoc, onSnapshot} from "https://www.gstatic.com/firebasejs/9.10.0/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyCZEIDYF-ocWOHm6rgemKj_Uh9rjPgYEVo",
    authDomain: "baseiniciosesion.firebaseapp.com",
    projectId: "baseiniciosesion",
    storageBucket: "baseiniciosesion.appspot.com",
    messagingSenderId: "875251194960",
    appId: "1:875251194960:web:67a6180f17325688984555"
};

  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);

  const usersRef = collection(db,"posts");

  export const queryUser = async ({
    ubication,
    post,
    caption,
    hashtag,
  }:{
    ubication: string,
    post: string,
    caption: string,
    hashtag: string,
  }) => {
    try {
        const q = query(usersRef, where("ubication", "==", ubication),where("post", "==", post),where("caption", "==", caption),where("hashtag","==",hashtag));
        const querySnapshot = await getDocs(q);
        console.log(querySnapshot);

        querySnapshot.forEach((doc:any) => {
            console.log(doc.id,"=>",doc.data());
        });
        
        return !querySnapshot.empty;
    } catch (error) {
        return false;
    }
  }

  export const addUser = async ({
    ubication,
    post,
    caption,
    hashtag,
  }:{
    ubication: string,
    post: string,
    caption: string,
    hashtag: string,
  }) => {
    try {if (post != "" && caption != ""){
      const docRef = await addDoc(collection(db,"posts"),{
        ubication,
        post,
        caption,
        hashtag,
    });
      return true;
    }else{
      swal("You must post a picture and add a caption");
    }
    } catch (error) {
        return false;
    }
  }

  //swal es una alerta personalizada de la librería Sweet Alert, razón por la que TS no lo detecta, pero igual funciona

  export const listenUsers = (cb: (users:any) => void) =>{
    try {
      onSnapshot(collection(db, "posts"), (documentos) => {
        const users = documentos.docs.map( (doc:any) => ({id: doc.id, data: doc.data()}));
        cb(users);
      });
    } catch (error) {
      
    }
  }
  
  export const getUsers = async () =>{
    try {
      const users = [];
      const q = query(usersRef);
      const querySnapshot = await getDocs(q);

      querySnapshot.forEach(doc => {
        users.push({id: doc.id, data: doc.data()});
      });
      return users;
    } catch (error) {
      
    }
  }

  export const deleteUsers = async (id) => {
    try {
      await deleteDoc(doc(db, "posts", id));
    } catch (error) {
    }
  }