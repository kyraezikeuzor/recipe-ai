import React from 'react'
import styles from './RecipeView.module.css'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faXmark} from "@fortawesome/free-solid-svg-icons";
import Recipe from './Recipe'

export const RecipeView = ({setShowModal, modalMode, modalTitle, ingredients, steps}) => {

  
    return (
    <div className={styles.modal}>
        <div className={styles.overlay}>
            <div className={styles['modal-content']}>
                
                <Recipe ingredients={ingredients} steps={steps}/>

                <div className={styles.view}>
                    <h2>Generate Recipe</h2>
                    <form>
                        <label>Dietary Restrictions</label>
                        <input/>
                        <label>Substitutes</label>
                        <input/>
                        <label>Enter Link to Recipe</label>
                        <input type="url"/>
                        <input type="submit"/>
                    </form>
                </div>
                <FontAwesomeIcon onClick={()=>setShowModal(false)} className={styles['close-modal']} icon={faXmark}/>
            </div>
        </div>
    </div>

  )
}

export default RecipeView;