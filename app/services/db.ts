import { initializeApp } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-app.js";
import { getFirestore, collection, query, where, getDocs, addDoc } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-firestore.js";

//Al profesor le salen los mismos errores

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

  const usersRef = collection(db,"usuarios");

  export const queryUser = async ({
    email,
    password
  }:{
    email: string;
    password: string;
  }) => {
    try {
        const q = query(usersRef, where("email", "==", email),where("password","==",password));
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
    email,
    password
  }:{
    email: string;
    password: string;
  }) => {
    try {
        if(email != "" && password != ""){
          const docRef = await addDoc(collection(db,"usuarios"),{
              email,
              password
          });
          return true;
        }else{
          swal("You must fill all inputs");
        }
    } catch (error) {
        return false;
    }
  }

//swal es una alerta personalizada de la librería Sweet Alert, razón por la que TS no lo detecta, pero igual funciona