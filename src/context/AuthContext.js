import { createContext, useReducer, useEffect } from "react"
import { projectAuth } from "../config/firebaseConfig"

export const AuthContext = createContext()

export const AuthReducer = (state, action)=>{
    switch(action.type){
        case("SIGN_IN"):
            return {...state, user: action.payload}
        case("LOG_OUT"):
            return { ...state, user: null}
        case("AUTH_IS_READY"):
            return { ...state, user: action.payload, authIsReady: true }

        default:
            return state

    }
}

const AuthContextProvider = ({children}) =>{
    const [state, dispatch] = useReducer(AuthReducer, { user: null, authIsReady: false})

    const signIn = (user) =>{
        dispatch({type: "SIGN_IN", payload: user})
    }

    const logOut = () =>{
        dispatch({type: "LOG_OUT"})
    }

    useEffect(() =>{
        const unsub = projectAuth.onAuthStateChanged((user) =>{
            dispatch({type: "AUTH_IS_READY", payload: user})
            unsub()
        })
    }, [])

    console.log("Auth state", state)

    return (
        <AuthContext.Provider value={{...state, dispatch, signIn, logOut}}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContextProvider