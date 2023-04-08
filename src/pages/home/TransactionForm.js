import { useEffect, useState } from 'react'
import useFirestore from '../../hooks/useFirestore'

const TransactionForm = ({uid}) => {
    const [name, setName] = useState("")
    const [amount, setAmount] = useState("")

    const {response, addDocument} = useFirestore("transactions")

    const handleSubmit = (e) =>{
        e.preventDefault()
        addDocument({name, amount, uid})
    }

    console.log(response)

    useEffect(()=>{
        if(response.success){
            setAmount("")
            setName("")
        }
    }, [response.success])
    return (
        <>
            <h3>Add a transaction</h3>
            <form onSubmit={handleSubmit}>
                <label>
                    <span>Transaction name:</span>
                    <input 
                        type='text'
                        required
                        onChange = {(e) => setName(e.target.value)}
                        value={name}
                    />

                </label>
                <label>
                    <span>Transaction amount ($):</span>
                    <input 
                        type='number'
                        required
                        onChange = {(e) => setAmount(e.target.value)}
                        value={amount}
                    />

                </label>

                <button>Add transaction</button>
            </form>
        </>
    )
}

export default TransactionForm