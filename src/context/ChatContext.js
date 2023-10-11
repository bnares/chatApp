import { onAuthStateChanged } from "firebase/auth";
import { createContext, useContext, useEffect, useReducer, useState } from "react"
import { auth } from "../firebase";
import { AuthCOntext } from "./AuthContext";

export const ChatContext = createContext();

export const ChatContextProvider = ({children})=>{  //children represents our components
    const INITIAL_STATE = {
        chatId:'null',
        user:{},
    }
    const {currentUser} = useContext(AuthCOntext);
    const chatReducer = (state,action)=>{
        switch(action.type){
            case "CHANGE_USER":
                return{
                    user:action.payload,
                    chatId: currentUser.uid > action.payload.uid 
                    ? currentUser.uid+action.payload.uid : action.payload.uid + currentUser.uid,
                }
            default:
                return state;
        }
    };
    
    const [state, dispatch] = useReducer(chatReducer, INITIAL_STATE);

    return(
        //children is all in our App.js file so all children components can reach currentUser set in value params
        //data is user info
    <ChatContext.Provider value={{data:state, dispatch}}> 
        {children}  
    </ChatContext.Provider>
    )
    
}


