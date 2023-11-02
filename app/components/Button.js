import React from 'react';
import Link from 'next/link';
import styles from './Button.module.css';

const STYLES = ['btn--primary', 'btn--outline'];
const SIZES = ['btn--medium', 'btn--large'];

export const Button = ({
    children, 
    type,
    path,
    onClick, 
    buttonStyle, 
    buttonSize
}) => 
{
    const checkButtonStyle = STYLES.includes(buttonStyle) ? buttonStyle : STYLES[0];
    const checkButtonSize = SIZES.includes(buttonSize) ? buttonSize : SIZES[0];

    return (
       <a href={`${path}`}>
            <button className={`${styles.btn} ${styles[checkButtonStyle]} ${styles[checkButtonSize]}`} onClick={onClick} type={type}>
                {children}
            </button>
       </a>
        
    );
};


export default Button;