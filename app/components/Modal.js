import React, {useState} from 'react'
import styles from './Modal.module.css'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faXmark} from "@fortawesome/free-solid-svg-icons";
import Recipe from './Recipe'
import {Button} from './Button'
import Axios from 'axios'
import {parseRecipe} from '../../utilities'

export const Modal = ({setShowModal, mode, modalTitle, ingredients, steps}) => {
    const [diet, setDietaryRestrictions] = useState('');
    const [dish, setDish] = useState('');
    const [recipe, setRecipe] = useState('');
    const [recipeTitle, setRecipeTitle] = useState('')

    const [response, setResponseText] = useState();

    const handleSubmit = (e) => {
        console.log(90)
        e.preventDefault();

        Axios.post('http://localhost:3001/api/generate', {diet: diet, dish: dish, recipe: recipe})
    .then(response => {
        // Handle successful response
        setResponseText(response.data);
        console.log(response.data);
    })
    .catch(error => {
        // Handle error
        console.log('Error:', error.response.data);
    });

    }
  
    return (
    <div className={styles.modal}>
        <div className={styles.overlay}>
            <div className={styles['modal-content']}>
                {mode == 'create' &&
                <div className={styles['create-view']}>
                    <div className={styles.view}>
                        <h3>Recipe</h3>
                        
                        {response}
                    </div>
                    <div className={styles.view}>
                        <h3>Generate Recipe</h3>
                        <form method="POST">
                            <label>Enter Recipe</label>
                            <p>Enter the dish to make and the AI will mend the recipe for you.</p>
                            <input type="text" onChange={(e) => {setDish(e.target.value)}} />
                            
                            <br/>

                            <label>Enter Recipe Link </label>
                            <p>Enter the link to your recipe</p>
                            <input onChange={(e) => {setRecipe(e.target.value)}}/>

                            <label>Dietary Restrictions</label>
                            <p>Enter the dietary restrictions.</p>
                            <input type="text" name='diet' onChange={(e) => {setDietaryRestrictions(e.target.value)}} /> 
                            
                            <br/>

                            <input type="submit" value="Generate" onClick={handleSubmit}/>
                        </form>
                        
                    </div>
                </div>}
                {mode == 'view' &&
                    <Recipe ingredients={ingredients} steps={steps}/>
                }
                <FontAwesomeIcon onClick={()=>setShowModal(false)} className={styles['close-modal']} icon={faXmark}/>
            </div>
        </div>
    </div>

  )
}

export default Modal;