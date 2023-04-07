import React from 'react'
import styles from "./Navbar.module.css"
import {Link} from "react-router-dom"
import useAuthContext from '../hooks/useAuthContext'

import useLogOut from '../hooks/useLogOut'

const Navbar = () => {

    const { user } = useAuthContext()

    const {logout} = useLogOut()

    return (
        <nav className={styles.navbar}>
            <ul>
                <li className={styles.title}><Link  to="/">myMoney</Link></li>
                {user && <li>Welcome, {user.displayName.toUpperCase()}</li>}
                {!user && <li><Link to="/login">Login</Link></li>}
                {!user && <li><Link to="/signup">Signup</Link></li>}
                {user && <li> <button className='btn' onClick={logout}> Logout </button></li>}
                
                
                
            </ul>
        </nav>
    )
}

export default Navbar