import { initializeApp } from "firebase/app";
import {signInWithEmailAndPassword, getAuth} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyB-zTMLiNdXaaIH-XD697VY6QvXLOwSKVM",
  authDomain: "sublimegracia-d62a7.firebaseapp.com",
  projectId: "sublimegracia-d62a7",
  storageBucket: "sublimegracia-d62a7.appspot.com",
  messagingSenderId: "394984608158",
  appId: "1:394984608158:web:f849e255d4d731786d868f"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

//Login

export const login = async ({email, password}) => {
    try{
        const res = await signInWithEmailAndPassword(auth, email, password)
        return res
    }catch(error){
        console.log(error)
    }
    
}

//Registro
//Login con google
//logout
//forgot password
