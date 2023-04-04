import { useEffect, useState  } from "react";
import { projectAuth } from "../config/firebaseConfig";
import useAuthContext from "./useAuthContext";


const useLogOut = () =>{
    const [isCancelled, setIsCancelled] = useState(false)
    const [error, setError] = useState(null)
    const [isPending, setIsPending] = useState(false)
        const { logOut } = useAuthContext()
   
        const logout = async() =>{
            try {
                await projectAuth.signOut()
                logOut()
                if(!isCancelled){
                    setIsPending(true)
                    setError(null)
                }
            } catch (error) {
                if(!isCancelled){
                    setIsPending(true)
                    setError(error.message)
                }
                
            }
            
        }

        useEffect(() => setIsCancelled(true), [])

        return {logout, error, isPending}
}

export default useLogOut