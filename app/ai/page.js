'use client'
import styles from './page.module.css'
require('dotenv').config();
import React, {useState} from 'react'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faXmark, faPrint} from "@fortawesome/free-solid-svg-icons";
import Axios from 'axios'
import {Document, Page, View, Text, Image, PDFViewer, StyleSheet, Font} from "@react-pdf/renderer";
Font.register( {family: "Inter", src: "/assets/font.otf"})
import Tags from '../components/Tags'

const bullet = "\u2022"; // Unicode character for bullet point

const style = StyleSheet.create({
    body: {
        paddingTop: 20,
        paddingRight: 20,
        paddingLeft: 20,
        fontSize: 10
    },
    section: {
      margin: 10,
      padding: 10,
      flexGrow: 1,
    },
    title: {
      fontSize: 42
    },
    h1: {
      fontSize: 20,
      fontWeight: 600,
      marginTop: 10,
      marginBottom: 10
    },
    tags: {
        display: 'flex',
        flexDirection: 'column',
        flexWrap: 'wrap',
        gap: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    tag: {
        fontSize: 12,
        fontWeight: 600
    }
})

export default function AI() {
    const [showPrint, setShowPrint] = useState(false);
    const handleClick = () => setShowPrint(!showPrint);

    const [showLink, setShowLink] = useState(false);
    const handleInput = () => setShowLink(!showLink);

    const [diet, setDietaryRestrictions] = useState('');
    const [dietArray, setDietArray] = useState()
    const [dish, setDish] = useState('');
    const [recipe, setRecipe] = useState('');
    const [recipeTitle, setRecipeTitle] = useState('')

    const [response, setResponseText] = useState({});

    const diets = ['Gluten-Free', 'Kosher', 'Vegan', 'Vegetarian', 'Pollotarian', 'Dairy Free', 'Keto', 'Low Carb', 'Wheat Allergy', 'Nut Allergy', 'Fish & Shellfish Allergy', 'Egg Allergy', 'Soy Allergy']

    const handleOptions = (e) => {
        const selectedOptions = Array.from(e.target.options)
        .filter(option => option.selected)
        .map(option => option.value)

        setDietArray(selectedOptions);

        setDietaryRestrictions(selectedOptions);


        // Convert the array of selected option values to a string
        const selectedOptionsString = selectedOptions.join(', ');

    // Update the state with this new string
         setDietaryRestrictions(selectedOptionsString);

        
    }
    
    const config = {
        headers: {
        'Authorization': `Bearer ${process.env.NEXT_PUBLIC_OPENAI_API_KEY}`,
        'Content-Type': 'application/json'
        }
    };

    const userMessage = 'Generate me a recipe for' + `${dish}` + 'modified for the dietary restriction(s) of' + `${diet}`;
    const linkMessage = 'Scan the website of this recipe link: ' + `${recipe}` + '. Modify the recipe for the dietary restrictions of' + `${diet}.`

    const message = [
        {
            role: "system", 
            content: "You are a helpful assistant."
        },
        {
            role: "system", 
            content: "You are recipe generator. You will generate recipes modified for a dietary restriction or multiple dietary restrictions. Respond with the recipe in a structured JSON format, with two top-level keys: 'ingredients' as an array of objects with 'quantity' and 'ingredient' keys, and 'directions' as an array of strings. Use the passed in chats as a basis on what to return depending on certain prompts and how to return them. Do not memorize the recipes and give out the exact same input. If you cannot complete the task, respond with an empty JSON object. Do not add any extra text to your response."
        }
    ]
    if (!recipe) {
        message.push({
            role: "user",
            content: userMessage
        })
    } else if (recipe) {
        message.push({
            role: 'user',
            content: linkMessage
        })
    } else if (recipe && dish) {
        message.push({
            role: 'user',
            content: linkMessage
        })
    }
  

    const handle = (e) => {
        e.preventDefault();

        Axios.post('https://api.openai.com/v1/chat/completions', {model: 'gpt-4', messages:message}, config)
        .then(response => {
            const responseJSON = JSON.parse(response.data.choices[0].message.content);
            setResponseText(responseJSON);
            console.log(response.data.choices[0].message.content);
          // You can access the completion in response.data.choices[0].message.content
        })
        .catch(error => {
          console.log("Error making API call:", error.response || error.message);
        });
    }
 
    

  return (
    <main className={styles.main}>
        <div className={styles['create-view']}>
            <div className={styles.view}>
                <div className={styles['btn-group']}>
                    <button className={styles['btn']} onClick={handleClick} disabled={!showPrint}>View Recipe</button>
                    <button className={styles['btn']} onClick={handleClick} disabled={showPrint}>Print Recipe</button>
                    
                </div>
                {showPrint && <div className={style.pdfViewer}>
                    <PDFViewer>
                    <Document>
                        <Page style={style.body} size="A4">
                            <View style={style.section}>
                                {recipeTitle && <Text style={style.title}>
                                    {recipeTitle}
                                </Text>}
                                {!recipeTitle && <Text style={style.title}>
                                    Recipe
                                </Text>}
                                <Text style={style.tags}>
                                    {dietArray && dietArray.map((item, index) => (
                                        <Text style={style.tag} key={index}>
                                            {item + ' ' + bullet + ' '} 
                                        </Text>
                                    ))}
                                </Text>
                                
                                <Text style={style.h1}>Ingredients</Text>
                                {(response && Array.isArray(response.ingredients) && Array.isArray(response.directions)) && response.ingredients.map((item, index) => (
                                    <Text key={index}>
                                        {item.quantity} {item.ingredient}
                                    </Text>
                                ))}
                                
                                <Text style={style.h1}>Directions</Text>
                                {(response && Array.isArray(response.ingredients) && Array.isArray(response.directions)) && response.directions.map((item, index) => (
                                <Text key={index}>
                                    {index + 1} {item}
                                </Text>
                                ))}
                            </View>
                        </Page>
                    </Document>
                    </PDFViewer>
                </div>}
                {!showPrint && <div>
                    {recipeTitle && <h3>{recipeTitle}</h3>}
                    {!recipeTitle && <h3>Recipe</h3>}
                    <Tags>
                        {diet}
                    </Tags>

                    <h4>Ingredients</h4>
                    <ul>
                        {(response && Array.isArray(response.ingredients) && Array.isArray(response.directions)) && response.ingredients.map((item, index) => (
                        <li key={index}>
                            {item.quantity} {item.ingredient}
                        </li>
                        ))
                        }
                    </ul>

                    <h4>Directions</h4>
                    <ol>
                        {(response && Array.isArray(response.ingredients) && Array.isArray(response.directions)) && response.directions.map((item, index) => (
                        <li key={index}>
                            {item}
                        </li>
                        ))
                        }
                    </ol>
                </div>}
                
            </div>
            <div className={styles.view}>
                <div className={styles['btn-group']}>
                    <button className={styles['btn']} onClick={handleInput} disabled={!showLink}>Use Text</button>
                    <button className={styles['btn']} onClick={handleInput} disabled={showLink}>Use Link</button>
                </div>

                <h3>Generate Recipe</h3>
                

                <form method="POST">

                    {!showLink && <div>
                        <label>Enter Recipe</label>
                        <p>Enter the dish you want to make, and the AI will mend the recipe for you.</p>
                        <input type="text" onChange={(e) => {setDish(e.target.value)}} />
                    </div>}

                    <br/>

                    {showLink && <div>
                        <label>Enter Recipe Link </label>
                        <p>Enter the link to your recipe.</p>
                        <input onChange={(e) => {setRecipe(e.target.value)}}/>
                    </div>}

                    

                    <br/>

                    <label>Dietary Restrictions</label>
                    <p>Enter the dietary restrictions. Press ctrl + shift or cmd + shift to select multiple.</p>
                    <input type="text" name='diet' value={diet} readOnly/> 
                    
                    <select multiple={true} onChange={handleOptions}>
                        {diets.map((item, index) => (
                            <option value={item} key={index}>
                                {item}
                            </option>
                        ))}
                    </select>

                    <br/>

                    <label>Enter Recipe Title</label>
                    <p>Enter a title for your recipe.</p>
                    <input type="text" onChange={(e) => {setRecipeTitle(e.target.value)}} />
                    
                    <br/>

                    <br/>

                    <input type="submit" value="Generate" onClick={handle}/>
                </form>
                
            </div>
        </div>
    </main>
  )
}
