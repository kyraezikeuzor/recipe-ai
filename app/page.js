'use client'
import React, {useState} from 'react'
import Image from 'next/image'
import styles from './page.module.css'
import {Button} from './components/Button'
import Auth from './components/Auth'
import Tags from './components/Tags'
import Navbar from './components/Navbar'
import {Modal} from './components/Modal'
import {Tag} from './components/Tag'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faCirclePlus} from "@fortawesome/free-solid-svg-icons";
import AI from './components/AI'

export default function Home() {


  return (
    <main>
      <header className={styles.header}>
        <h1> 
          <img src='/recipe_ai_logo.png'/>
          Recipe AI
        </h1>
        <p>
          Enter a dish you would like to make, then input your dietary restrictions for the AI to modify the recipe to your diet.
        </p>
      </header>
      <AI/>
    </main>
    
  )
}
