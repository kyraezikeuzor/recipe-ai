import React from 'react'
import styles from './Sidebar.module.css'
import Link from 'next/link'
import Button from './Button'

export default function Sidebar() {
  return (
    <nav className={styles.sidebar}>
        <Link href='/' className={styles["navbar-logo"]}> 
            <img src='/recipe_ai_logo.png'></img>
            RecipeAI
        </Link>
        <Link href='/dashboard'>
          Dashboard
        </Link>
        <Link href='/dashboard/profile'>
          Profile
        </Link>
        <div>
          <Button>Log out</Button>
        </div>
    </nav>
  )
}
