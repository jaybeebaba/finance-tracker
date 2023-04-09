import styles from "./Home.module.css"
import React from 'react'
import TransactionForm from "./TransactionForm"
import useAuthContext from "../../hooks/useAuthContext"
import useCollection from "../../hooks/useCollection"
import useFirestore from "../../hooks/useFirestore"

const Home = () => {
  const {user} = useAuthContext()

  const { documents, error } = useCollection(
    'transactions', ["uid", "==", user.uid], ['createdAt', 'desc']
  )

  const {deleteDocument} = useFirestore("transactions")
  
  const transactionList = documents && documents.map(document=> {
    return (
      <li key={document.id}>
        <h3 className={styles.name}>{document.name}</h3>
        <div className={styles.amount}>#{document.amount}</div>
        <button onClick={()=>deleteDocument(document.id)}>Delete</button>
      </li>
    )
  })
  return (
    <div className={styles.container}>
        <div className={styles.content}>
            { error && <p>{error}</p>}
            <ul className={styles.transactions}>{transactionList}</ul>
        </div>
        <div className={styles.sidebar}>
            <TransactionForm uid={user.uid}/>
        </div>
    </div>
  )
}

export default Home