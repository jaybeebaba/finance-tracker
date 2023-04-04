import {useState, useEffect} from "react"
import {projectAuth} from "../config/firebaseConfig"
import  useAuthContext from "./useAuthContext"


const useLogin = () =>{
    const [isCancelled, setIsCancelled] = useState(false)
    const [error, setError] = useState(null)
    const [isPending, setIspending] = useState(false)

    const { signIn } = useAuthContext()

    const login = async(email, password) => {
                setIspending(true)
                setError(null)
            try{
               const res = await projectAuth.signInWithEmailAndPassword(email, password)

                signIn(res.user)
                 if(!isCancelled){
                    setError(null)
                    setIspending(false)
                 }
            }catch(err){
                 if(!isCancelled){
                    setError(err.message)
                    setIspending(false)
                 }
            }

    }

    useEffect(() => setIsCancelled(true), [])

    return { login, error, isPending}

}

export default useLogin