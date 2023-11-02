'use client'
import React, {useState} from 'react'
import styles from './Recipe.module.css'
import Tags from './Tags'

export const Recipe = ({types, ingredients,steps}) => {
    let ingredientsList = ingredients.map((item,index) => {
        return <li key={index}>{item}</li>
      })
    let stepsList = steps.map((item,index) => {
        return <li key={index}>{item}</li>
    })

  return (
    <div className={styles.recipe}>
      <div className={styles['recipe-header']}>
        <h3>Chili Dog Mac and Cheese</h3>
        <Tags>Hello, Gluten-Free, Kosher, Vegetarian, Vegan</Tags>
      </div>
        <div className={styles['recipe-content']}>
          
          <h4>Recipe</h4>

          {/*<div>
              <h4>Ingredients</h4> 
              <ul>
                {ingredientsList}
              </ul>
          </div>
          <div>
              <h4>Directions</h4>
              <ol>
                {stepsList}
              </ol>
          </div>*/}
  </div>
        
    </div>
  )
}
export default Recipe;