'use client'
import React, {useState} from 'react'
import styles from './dashboard.module.css'
import {Card} from '../components/Card'
import {Modal} from '../components/Modal'
import {Tag} from '../components/Tag'
import {Button} from '../components/Button'
import Sidebar from '../components/Sidebar'

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faCirclePlus} from "@fortawesome/free-solid-svg-icons";

export default function Dashboard() {
    const [showModal, setShowModal] = useState(false);
    const [mode, setMode] = useState('')
    const [cardTitle, setCardTitle] = useState('');
    const [cardBlurb, setCardBlurb] = useState('');
    const [ingredients, setIngredients] = useState([]);
    const [steps, setSteps] = useState([]);

    const openModal = (show, mode, title, blurb, ingredients, steps) => {
        setMode(mode);
        setShowModal(show);
        setCardTitle(title);
        setCardBlurb(blurb);
        setIngredients(ingredients);
        setSteps(steps);
    }
 
  return (
    <div>
        <Sidebar/>
        <main className={showModal == false ? styles.main : `${styles.main} "modal-open"` }>
            <header>
                <h1>Recipes</h1>
                <div onClick={() => openModal(true, 'create')}>
                    <Tag>
                        <FontAwesomeIcon icon={faCirclePlus} className={styles['add-icon']}/> New Recipe
                    </Tag>
                </div>
            </header>
            
            <section className={styles.recipes}>
                <div onClick={() => openModal(true, 'view', "Kosher Salad", "Peas, Greens, Beans, Cheese, Beans, Tomatoes, Rice", ["1 tablespoon olive oil", "Cheese", "Veggies"], ["Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam a consectetur orci. Maecenas viverra vulputate scelerisque. Aliquam eget est magna. Phasellus tristique commodo elit vitae porta. ", "Pellentesque venenatis fermentum posuere. Ut nec risus volutpat, suscipit ligula eu, iaculis dolor. Nulla gravida turpis nisl, ac suscipit justo mattis at. ", "Pellentesque venenatis fermentum posuere. Ut nec risus volutpat, suscipit ligula eu, iaculis dolor. Nulla gravida turpis nisl, ac suscipit justo mattis at. "])}>
                    <Card 
                    cardTitle="Vegan Salad" 
                    cardTypes="Vegan, Vegetarian"
                    cardBlurb="Peas, Greens, Beans, Cheese, Beans, Tomatoes, Rice"
                    ingredients="Peas, Greens, Beans, Cheese"
                    />
                </div>
                <div onClick={() => openModal(true, 'view', "Strawberry Icecream", "Peas, Greens, Beans, Cheese, Beans, Tomatoes, Rice", ["1 tablespoon olive oil", "Cheese", "Veggies"], ["Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam a consectetur orci. Maecenas viverra vulputate scelerisque. Aliquam eget est magna. Phasellus tristique commodo elit vitae porta. ", "Pellentesque venenatis fermentum posuere. Ut nec risus volutpat, suscipit ligula eu, iaculis dolor. Nulla gravida turpis nisl, ac suscipit justo mattis at. ", "Pellentesque venenatis fermentum posuere. Ut nec risus volutpat, suscipit ligula eu, iaculis dolor. Nulla gravida turpis nisl, ac suscipit justo mattis at. "])}>
                    <Card 
                    cardTitle="Lactose-Free Strawberry Icecream" 
                    cardBlurb="Peas, Greens, Beans, Cheese, Beans, Tomatoes, Rice"
                    cardTypes="Lactose-Free"
                    ingredients="Peas, Greens, Beans, Cheese, Beans, Tomatoes, Rice"
                    />
                </div>
                
            </section>
            {showModal && <Modal setShowModal={setShowModal} mode={mode} modalTitle={cardTitle} modalText={cardBlurb} ingredients={ingredients} steps={steps}/>}
        </main>
    </div>
    
  )
}
