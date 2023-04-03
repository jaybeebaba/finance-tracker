import { projectAuth } from "../config/firebaseConfig";
import { useState } from "react";


const useSignup = () =>{
    const [error, setError] = useState(null)
    const [ isPending, setIsPending] = useState(false)

    const signup = async( email, password, displayName) =>{
            setError(null)
            setIsPending(true)

            try {
              const response =   await projectAuth.createUserWithEmailAndPassword(email, password)

              console.log(response.user)
              if(!response){
                throw new Error("Could not complete signup")
              }
                await response.user.updateProfile({displayName})
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