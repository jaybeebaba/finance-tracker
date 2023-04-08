import { useState, useReducer, useEffect } from "react";
import { projectFireStore, timeStamp } from "../config/firebaseConfig";

const initState = {
    error: null,
    isPending: false,
    document: null,
    success: null
}

const firestoreReducer = (state, action) => {
    switch (action.type) {
        case "IS_PENDING":
            return { error: null, document: null, success: false, isPending: true}
        case "ADDED_DOCUMENT":
            return { error: null, isPending: false, success: true, document: action.payload }

        default:
            return state
    }
}

const useFirestore = (collection) => {

    const [response, dispatch] = useReducer(firestoreReducer, initState)

    const [isCancelled, setIsCancelled] = useState(null)  

    const ref = projectFireStore.collection(collection)

    const dispatchIfNotCancelled = (action) =>{
        !isCancelled && dispatch(action)
    }

    const addDocument = async (doc) => {
        dispatch({type: "IS_PENDING"})
        try {
            const createdAt = timeStamp.fromDate(new Date())
            const addedDocument = await ref.add({...doc, createdAt})
            dispatchIfNotCancelled({ type: "ADDED_DOCUMENT", payload: addedDocument })

        } catch (err) {
            dispatchIfNotCancelled({type: "ERROR", payload: err.message})
        }
    }

    const deleteDocument = (id) => {

    }



    useEffect(() => {
        return setIsCancelled("")
    }, [])

    return { response, addDocument, deleteDocument }

}

export default useFirestore