import { useState } from 'react'
import useSignup from "../../hooks/useSingup"

// styles
import styles from './Signup.module.css'

export default function SignUp() {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [displayName, setDisplayName] = useState("")
  const {signup, error, isPending} = useSignup()

  const handleSubmit = (e) => {
    e.preventDefault()
    signup(email, password, displayName)
  }

  return (
    <form onSubmit={handleSubmit} className={styles['signup-form']}>
      <h2>signup</h2>
      <label>
        <span>email:</span>
        <input 
          type="email" 
          onChange={(e) => setEmail(e.target.value)} 
          value={email}
        />
      </label>
      <label>
        <span>password:</span>
        <input 
          type="password" 
          onChange={(e) => setPassword(e.target.value)} 
          value={password} 
        />
      </label>
      <label>
        <span>display name:</span>
        <input 
          type="text" 
          onChange={(e) => setDisplayName(e.target.value)} 
          value={displayName} 
        />
      </label>
      {!isPending && <button className="btn">signup</button>}
      {isPending && <button className="btn">loading</button>}
      {error && <p>{error}</p>}
    </form>
  )
}