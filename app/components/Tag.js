'use client'
import React, { Component } from 'react'
import styles from './Tag.module.css'

export const Tag = ({children}) => {
    return (
        <div className={styles.tag}>
            {children}
        </div>
    )
}

export default Tag;