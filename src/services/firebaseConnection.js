import firebase from "firebase/app";
import 'firebase/database';
import 'firebase/auth';

let firebaseConfig = {
  apiKey: "AIzaSyAgcfOI2xUdngQBTLdAiNd1BNv1OupBRDs",
  authDomain: "tarefas-f7d8e.firebaseapp.com",
  projectId: "tarefas-f7d8e",
  storageBucket: "tarefas-f7d8e.appspot.com",
  messagingSenderId: "867872400918",
  appId: "1:867872400918:web:e00194067d65df55bef737"
};

if(!firebase.apps.length){
  firebase.initializeApp(firebaseConfig);
}


export default firebase;
