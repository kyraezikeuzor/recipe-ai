'use client'
import React, {useState} from 'react'
import styles from './dashboard.module.css'
import {RecipeCard} from '../../components/RecipeCard'
import {RecipeView} from '../../components/RecipeView'

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faCirclePlus} from "@fortawesome/free-solid-svg-icons";

export default function Dashboard() {
    const [showModal, setShowModal] = useState(false);
    const [cardTitle, setCardTitle] = useState('');
    const [cardBlurb, setCardBlurb] = useState('');
    const [ingredients, setIngredients] = useState([]);
    const [steps, setSteps] = useState([]);

    const openModal = (show, title, blurb, ingredients, steps) => {
        setShowModal(show);
        setCardTitle(title);
        setCardBlurb(blurb);
        setIngredients(ingredients);
        setSteps(steps);
    }
 
  return (
    <main className={showModal == false ? styles.main : `${styles.main} "modal-open"` }>
        <h1>Recipes</h1>
        <section className={styles.recipes}>

            <div className={styles.add} onClick={() => openModal(true, "Kosher Salad", "Peas, Greens, Beans, Cheese, Beans, Tomatoes, Rice", ["Ice", "Cheese", "Veggies"], ["Cook Bread", "Eat ice", "Fry cookies"])}>
                <FontAwesomeIcon icon={faCirclePlus} className={styles['add-icon']}/>
            </div>

            <div onClick={() => openModal(true, "Kosher Salad", "Peas, Greens, Beans, Cheese, Beans, Tomatoes, Rice", ["Ice", "Cheese", "Veggies"], ["Cook Bread", "Eat ice", "Fry cookies"])}>
                <RecipeCard 
                cardTitle="Kosher Salad" 
                cardBlurb="Peas, Greens, Beans, Cheese, Beans, Tomatoes, Rice"
                />
            </div>
        
        </section>
        {showModal && <RecipeView setShowModal={setShowModal} modalTitle={cardTitle} modalText={cardBlurb} ingredients={ingredients} steps={steps}/>}
    </main>
  )
}
