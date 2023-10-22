import React from 'react'
import styles from './RecipeCard.module.css'
import {RecipeView} from './RecipeView'

export const RecipeCard = ({cardTitle, cardBlurb, ingredients}) => {
    

  return (
    <div className={styles['recipe-card']} >
        <div className={styles['card-blurb']}>
            <p>{cardBlurb}</p>
        </div>
        <h5>{cardTitle}</h5>
        <p>{cardBlurb}</p>
    </div>
  )
}

export default RecipeCard;
