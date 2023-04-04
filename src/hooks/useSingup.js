import { projectAuth } from "../config/firebaseConfig";
import { useState } from "react";
import  useAuthContext  from "./useAuthContext"

const useSignup = () =>{
    const [error, setError] = useState(null)
    const [ isPending, setIsPending] = useState(false)

    const {user, signIn} = useAuthContext()

    const signup = async( email, password, displayName) =>{
            setError(null)
            setIsPending(true)

            try {
              const response =   await projectAuth.createUserWithEmailAndPassword(email, password)
              if(!response){
                throw new Error("Could not complete signup")
              }
                await response.user.updateProfile({displayName})

                signIn(response.user)
                
                setIsPending(false)
                setError(null)
            } catch (error) {
                setError(error.message)
                setIsPending(false)
            }
    }

    return {error, isPending, signup}
}

export default useSignup