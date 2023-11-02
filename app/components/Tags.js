'use client'
import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import styles from './Tag.module.css'
import Tag from './Tag'

export const Tags = ({children}) => {

    let itemList = [];
    let tagList = [];

    if (children) {
        itemList = children.trim().split(", ");

        tagList = itemList.map((item,index)=>{
            return <Tag key={index}>{item}</Tag>
         })
    }
    else {
        itemList = [];
        tagList = "";
    }


    return (
         <div className={styles.tags}>
            {tagList}
         </div>
    )
}

export default Tags;
