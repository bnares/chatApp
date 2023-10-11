import { onAuthStateChanged } from "firebase/auth";
import { createContext, useEffect, useState } from "react"
import { auth } from "../firebase";

export const AuthCOntext = createContext();

export const AuthContextProvider = ({children})=>{  //children represents our components
    const [currentUser, setCurrentUser] = useState({});

    useEffect(()=>{
        const unsub = onAuthStateChanged(auth,(user)=>{
            setCurrentUser(user);
            console.log(user);
        });

        return ()=>{
            unsub();
        }
    },[]);

    return(
        //children is all in our App.js file so all children components can reach currentUser set in value params
    <AuthCOntext.Provider value={{currentUser}}>
        {children}  
    </AuthCOntext.Provider>
    )
    
}


