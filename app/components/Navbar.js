'use client'
import React, {useState, useEffect} from 'react';
import styles from './Navbar.module.css';
import Link from 'next/link';
import {Button} from './Button';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faXmark, faBars} from "@fortawesome/free-solid-svg-icons";


function Navbar() {
  const [click, setClick] = useState(false);
  const [button, setButton] = useState(true);
  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  useEffect(() => {
    const showButton = () => {
      if(window.innerWidth <= 960) {
        setButton(false);
      } else {
        setButton(true);
      }
    }
    showButton([])
    window.addEventListener('resize', showButton);
  }, []);
  

  return (
    <nav className={styles.nav}>
      <div className={styles.navbar}>
          <div className={styles["navbar-container"]}>
              <Link href='/' className={styles["navbar-logo"]} onClick={closeMobileMenu}> 
                  <img src='/recipe_ai_logo.png'></img>
                  RecipeAI
              </Link>

              <div className={styles["menu-icon"]} onClick={handleClick}>
                <FontAwesomeIcon icon={click ? faXmark : faBars } className={click ? styles['fa-times'] : styles['fa-bars']}></FontAwesomeIcon>
              </div>
              <ul className={click ? `${styles['nav-menu']} ${styles.active}` : styles['nav-menu']}>
                <li className={styles["nav-item"]}> <Link  onClick={closeMobileMenu} className={styles["nav-links"]} href='/ai' >Try AI </Link></li>
              </ul>
          </div>
      </div>
    </nav>
  )
}

export default Navbar;