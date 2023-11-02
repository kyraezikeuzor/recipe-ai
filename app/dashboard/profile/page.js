import React from 'react'
import styles from './profile.module.css'
import Sidebar from '../../components/Sidebar'

export default function Profile() {
  return (
    <div>
        <Sidebar/>
        <main className={styles.main}>
            <section className={styles.profile}>
                <h3>Edit Profile</h3>

                <form>
                    <label>Name</label>
                    <input type="text" placeholder="Kyra"/>

                    <label>Surname</label>
                    <input type="text" placeholder="Ezikeuzor"/>

                    <label>Password</label>
                    <input type="text" placeholder="Ezikeuzor"/>

                    <input type="submit" value="Save"/>
                </form>
            </section>
        </main>
    </div>
    
  )
}
