import {useState, useEffect, useRef} from "react"
import { projectFireStore } from "../config/firebaseConfig"

const useCollection = (collection, _query, _orderBy) =>{
    const [error, setError] = useState(null)
    const [documents, setDocuments] = useState(null)

    const query = useRef(_query).current
    const orderBy = useRef(_orderBy).current

    useEffect(()=>{
        let ref = projectFireStore.collection(collection )

        if(query){
            ref = ref.where(...query)
        }
        if(orderBy){
            ref = ref.orderBy(...orderBy)
        }
        const unsub = ref.onSnapshot((snapshot)=>{
            const result = []

            snapshot.docs.forEach(doc =>{
                result.push({...doc.data(), id: doc.id})
            })
            setError(null)
            setDocuments(result)
        }, (err)=>{
            console.log(err)
            setError(err.message)
        })

        return () => unsub()
    }, [collection, query, orderBy])

    return {error, documents}

}

export default useCollection