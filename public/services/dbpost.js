var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-app.js";
import { getFirestore, collection, doc, query, where, getDocs, addDoc, deleteDoc, onSnapshot } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-firestore.js";
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
const usersRef = collection(db, "posts");
export const queryUser = ({ ubication, post, caption, hashtag, }) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const q = query(usersRef, where("ubication", "==", ubication), where("post", "==", post), where("caption", "==", caption), where("hashtag", "==", hashtag));
        const querySnapshot = yield getDocs(q);
        console.log(querySnapshot);
        querySnapshot.forEach((doc) => {
            console.log(doc.id, "=>", doc.data());
        });
        return !querySnapshot.empty;
    }
    catch (error) {
        return false;
    }
});
export const addUser = ({ ubication, post, caption, hashtag, }) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (post != "" && caption != "") {
            const docRef = yield addDoc(collection(db, "posts"), {
                ubication,
                post,
                caption,
                hashtag,
            });
            return true;
        }
        else {
            swal("You must post a picture and add a caption");
        }
    }
    catch (error) {
        return false;
    }
});
//swal es una alerta personalizada de la librería Sweet Alert, razón por la que TS no lo detecta, pero igual funciona
export const listenUsers = (cb) => {
    try {
        onSnapshot(collection(db, "posts"), (documentos) => {
            const users = documentos.docs.map((doc) => ({ id: doc.id, data: doc.data() }));
            cb(users);
        });
    }
    catch (error) {
    }
};
export const getUsers = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = [];
        const q = query(usersRef);
        const querySnapshot = yield getDocs(q);
        querySnapshot.forEach(doc => {
            users.push({ id: doc.id, data: doc.data() });
        });
        return users;
    }
    catch (error) {
    }
});
export const deleteUsers = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield deleteDoc(doc(db, "posts", id));
    }
    catch (error) {
    }
});
