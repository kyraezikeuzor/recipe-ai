'use client'
import React, {useState, useEffect} from 'react'
import {useRouter} from 'next/navigation'
import Axios from 'axios'
import styles from './Auth.module.css'
import Button from './Button'

export default function Auth() {
    const router = useRouter();
    const [login, setLogin] = useState(false);
    const [loginStatus, setLoginStatus] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    Axios.defaults.withCredentials = true; // To prevent constantly going back -- check cors variables
    // if user has already loggedin - dont let them go to login page by just typing /login
    useEffect(()=> {
        Axios.get('http://localhost:3001/dashboard')
          .then( res => {
              if (res.data.valid) {
                router.push('/dashboard');
              } else {
                  router.push('/');
              }
          })
          .catch(err=>console.log(err))  
      }, []);


    const handleLogin = (e) => {
      e.preventDefault();
      Axios.post('http://localhost:3001/', {
        username: username,
        password: password
        }).then((response) => {
        if (response.data.login == "Login successful") {
            setLoginStatus(response.data.login);
            router.push('/dashboard');
        }
        else {
            setLoginStatus(response.data.login);
        }
        })
        .catch((err) => console.log(err));
    }

  return (
    <section className={styles.auth}>
        {!login && <h4>Sign Up</h4>}
        {login && <h4>Login</h4>}
        <p></p>
        <form method="POST" onSubmit={handleLogin}>
            <label>Email</label>
            <input type="text" onChange={(e) => {setUsername(e.target.value)}}/>
            <label>Password</label>
            <input type="password" onChange={(e) => {setPassword(e.target.value)}}/>

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
