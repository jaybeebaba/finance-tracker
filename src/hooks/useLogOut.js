import { useState } from "react";
import { projectAuth } from "../config/firebaseConfig";
import useAuthContext from "./useAuthContext";


const useLogOut = () =>{
    const [error, setError] = useState(null)
    const [isPending, setIsPending] = useState(false)
        const { logOut } = useAuthContext()
   
        const logout = async() =>{
            try {
                setIsPending(true)
                setError(null)
                await projectAuth.signOut()
                logOut()
            } catch (error) {
                console.log(error)
                setIsPending(true)
                setError(error.message)
            }
            
        }

        return {logout, error, isPending}
}

export default useLogOut