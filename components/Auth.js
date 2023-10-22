'use client'
import React, {useState} from 'react'
import styles from './Auth.module.css'
import Button from './Button'

export default function Auth() {
    const [login, setLogin] = useState(false);

  return (
    <section className={styles.auth}>
        {!login && <h4>Sign Up</h4>}
        {login && <h4>Login</h4>}
        <p></p>
        <form>
            <label>Email</label>
            <input type="email"/>
            <label>Password</label>
            <input type="password"/>

            {!login && <input type="submit" value="Sign Up"/>}
            {login && <input type="submit" value="Login"/>}
            
        </form>
        <div className={styles['auth-btn-group']}>
            {!login && <button className={styles['auth-btn']} onClick={() => setLogin(!login)}>Login</button>}
            {login && <button className={styles['auth-btn']} onClick={() => setLogin(!login)} >Sign Up</button>}
        </div>
    </section>
  )
}
