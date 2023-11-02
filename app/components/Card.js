import React from 'react'
import styles from './Card.module.css'
import {Modal} from './Modal'
import Tags from './Tags'

export const Card = ({cardTitle, cardBlurb, cardTypes, ingredients}) => {
    
  let itemList = [];
    let tagList = [];

    if (ingredients) {
        itemList = ingredients.trim().split(", ");

        tagList = itemList.map((item,index)=>{
            return <li key={index}>{item}</li>
         })
    }
    else {
        itemList = [];
        tagList = "";
    }

  return (
    <div className={styles['card']} >
        <h5>{cardTitle}</h5>
        <p>{cardTypes}</p>
    </div>
  )
}

export default Card;
