'use client'
import React, {useState} from 'react'
import Image from 'next/image'
import styles from './page.module.css'
import Button from './components/Button'
import Auth from './components/Auth'
import Tags from './components/Tags'
import Navbar from './components/Navbar'
import {Modal} from './components/Modal'
import {Tag} from './components/Tag'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faCirclePlus} from "@fortawesome/free-solid-svg-icons";

export default function Home() {
  const [showModal, setShowModal] = useState(false);
  const [mode, setMode] = useState('')

  const openModal = (show, mode) => {
    setMode(mode);
    setShowModal(show);
}

  return (
    <div>
      <Navbar/>
      <main className={styles.main}>
        <section className={styles.hero}>
          <header>
            <h1><u>RecipeAI</u> mends recipes to fit your dietary needs 🥬</h1>
            <p>We adapt recipes to match your dietary preferences, making cooking a breeze. Savor dishes that cater to your tastes, all at the click of a button.</p>
            <Tags>
              Gluten-Free, Kosher, Vegan, Vegetarian, Pollitarian, Dairy Free, Lactose intolerance, Keto, Low carb, Wheat Allergy, Nut Allergy, Fish & Shellfish Allergy, Egg Allergy, Soy Allergy
            </Tags>
          </header>
          <section>
            <h1>Try out the AI!</h1>
            <p>We adapt recipes to match your dietary preferences, making cooking a breeze. Savor dishes that cater to your tastes, all at the click of a button.</p>
            <div onClick={() => openModal(true, 'create')}>
                  <Tag>
                      <FontAwesomeIcon icon={faCirclePlus} className={styles['add-icon']}/> New Recipe
                  </Tag>
              </div>
          </section>
          
        </section>
      </main>
      {showModal && <Modal setShowModal={setShowModal} mode={mode}/>}
    </div>
    
  )
}
