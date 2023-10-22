import Image from 'next/image'
import styles from './page.module.css'
import Button from '../components/Button'
import Auth from '../components/Auth'

export default function Home() {
  return (
    <main className={styles.main}>
      <section className={styles.hero}>
        <header>
          <h1><u>MealMatch</u> mends recipes to fit your dietary needs 🥬</h1>
          <p>Calculate your carbon footprint, offset with a simple monthly subscription and follow your friends to track their impact.</p>
        </header>
        <Auth/>
      </section>
    </main>
  )
}
