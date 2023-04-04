import { createContext, useReducer } from "react"

export const AuthContext = createContext()

export const AuthReducer = (state, action)=>{
    switch(action.type){
        case("SIGN_IN"):
            return {...state, user: action.payload}
        case("LOG_OUT"):
            return { ...state, user: null}

        default:
            return state

    }
}

const AuthContextProvider = ({children}) =>{
    const [state, dispatch] = useReducer(AuthReducer, { user: null})

    const signIn = (user) =>{
        dispatch({type: "SIGN_IN", payload: user})
    }

    const logOut = () =>{
        dispatch({type: "LOG_OUT"})
    }

    console.log("Auth state", state)

    return (
        <AuthContext.Provider value={{...state, dispatch, signIn, logOut}}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContextProvider