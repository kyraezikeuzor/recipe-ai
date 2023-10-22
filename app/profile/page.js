import React from 'react'
import styles from './profile.module.css'

export default function Profile() {
  return (
    <main className={styles.main}>
        <section className={styles.profile}>
            <h3>Edit Profile</h3>

            <form>
                <label>Name</label>
                <input type="text" placeholder="Kyra"/>
                <label>Surname</label>
                <input type="text" placeholder="Ezikeuzor"/>
                <label>Dietary Restrictions</label>
                <input/>
                <select>
                    <option></option>
                </select>
                <label>Substitutions</label>
                <select>
                    <option></option>
                </select>

                <input type="submit" value="Save"/>
            </form>
        </section>
    </main>
  )
}
