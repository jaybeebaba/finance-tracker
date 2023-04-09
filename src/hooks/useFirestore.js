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
        case "DELETED_DOCUMENT":
            return { error: null, isPending: false, success: true, document: null }
        case "ERROR":
            return { error: action.payload, isPending: false, success: false, document: null}
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

    const deleteDocument = async (id) => {
        dispatch({type: "IS_PENDING"})
        try {
            await ref.doc(id).delete()
            dispatchIfNotCancelled({type: "DELETED_DOCUMENT"})
        } catch (error) {
            dispatchIfNotCancelled({type: "ERROR", payload: "could not delete transaction"})
        }
    }



    useEffect(() => {
        return setIsCancelled("")
    }, [])

    return { response, addDocument, deleteDocument }

}

export default useFirestore