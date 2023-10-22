'use client'
import React, {useState} from 'react'
import styles from './Recipe.module.css'

export const Recipe = ({ingredients,steps}) => {
    let ingredientsList = ingredients.map((item,index) => {
        return <li key={index}>{item}</li>
      })
    let stepsList = steps.map((item,index) => {
        return <li key={index}>{item}</li>
    })

  return (
    <div className={styles.recipe}>
        <h5>Recipe</h5>
        <div>
            <h6>Ingredients</h6>
            {ingredientsList}
        </div>
        <div>
            <h6>Steps</h6>
            {stepsList}
        </div>
    </div>
  )
}
export default Recipe;