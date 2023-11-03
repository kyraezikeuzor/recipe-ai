require('dotenv').config();
import React, {useState} from 'react'
import styles from './Modal.module.css'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faXmark} from "@fortawesome/free-solid-svg-icons";
import Recipe from './Recipe'
import {Button} from './Button'
import Axios from 'axios'
import {parseRecipe} from '../../utilities'

export const Modal = ({setShowModal, mode, modalTitle, ingredients, steps}) => {
    const [diet, setDietaryRestrictions] = useState('');
    const [dish, setDish] = useState('');
    const [recipe, setRecipe] = useState('');

    const [response, setResponseText] = useState();

    
    const config = {
        headers: {
        'Authorization': `Bearer ${process.env.NEXT_PUBLIC_OPENAI_API_KEY}`,
        'Content-Type': 'application/json'
        }
    };

    const userMessage = 'Generate me a recipe for' + `${dish}` + 'modified for the dietary restriction(s) of' + `${diet}`;
    const linkMessage = 'Scan the website of this recipe link: ' + `${recipe}` + '. Modify the recipe for the dietary restrictions of' + `${diet}` + 'Return the ingredients and directions of the recipe in a neat format.'

    const message = [
        {
            role: "system", 
            content: "You are a helpful assistant."
        },
        {
            role: "system", 
            content: "You are recipe generator. You will generate recipes modified for a dietary restriction or multiple dietary restrictions. Respond with the recipe and no extra text. Do not add titles to the lists of ingredients or to the list of directions. Do not put bullet points, dashes, or numbers on the list of ingredients or directions. Use the passed in chats as a basis on what to return depending on certain prompts and how to return them. Do not memorize the recipes and give out the exact same input."
        },
        {
            role: 'user', 
            content: "Generate me a recipe for pasta carbonara modied for the dietary restricton of celiac disease."
        },
        {
            role: 'assistant', 
            content: 
            `Ingredients:
            - 8 ounces (about 225 grams) gluten-free spaghetti or fettuccine
            - 1 tablespoon olive oil
            - Salt for boiling water
            - 4 slices of gluten-free bacon, diced
            - 2 large eggs
            - 1 cup grated Pecorino Romano cheese (make sure it's gluten-free)
            - 1/2 cup grated Parmesan cheese (make sure it's gluten-free)
            - 2 cloves garlic, minced
            - Freshly ground black pepper
            - Chopped fresh parsley, for garnish

            Directions:
            1. Bring a large pot of salted water to a boil.
            2. Cook the gluten-free pasta according to the package instructions until al dente.
            3. Drain the pasta and reserve about 1/2 cup of pasta cooking water.
            4. Toss the cooked pasta with a tablespoon of olive oil to prevent sticking and set it aside.
            5. In a large skillet, cook the diced bacon over medium heat until it becomes crispy, about 5-7 minutes. Remove the cooked bacon from the skillet and place it on a paper towel-lined plate to drain excess grease. Leave about 2 tablespoons of bacon grease in the skillet.
            6. In a bowl, whisk together the eggs, grated Pecorino Romano cheese, and grated Parmesan cheese until well combined. Season with a generous amount of freshly ground black pepper.
            7. In the same skillet with the reserved bacon grease, add the minced garlic and cook for about 1 minute until fragrant.
            8. Reduce the heat to low, then quickly add the cooked gluten-free pasta to the skillet and toss to combine with the garlic and bacon grease.
            9. Remove the skillet from the heat, and while the pasta is still hot, pour the egg and cheese mixture over it. Quickly toss the pasta to coat it evenly. If the sauce seems too thick, you can add a small amount of the reserved pasta cooking water to achieve your desired consistency.
            10. Add the crispy bacon back into the skillet and give it a final toss to combine.
            11. Garnish the gluten-free pasta carbonara with chopped fresh parsley and extra grated cheese, if desired.`,
        },
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

        Axios.post('https://api.openai.com/v1/chat/completions', {model: 'gpt-3.5-turbo', messages:message}, config)
        .then(response => {
            setResponseText(response.data.choices[0].message.content)
            console.log(parseRecipe(response.datachoices[0].message.content))
          console.log(response.data);
          // You can access the completion in response.data.choices[0].message.content
        })
        .catch(error => {
          console.error("Error making API call:", error.response || error.message);
        });
    }

    const handleSubmit = (e) => {
        console.log(90)
        e.preventDefault();

        Axios.post('http://localhost:3001/api/generate', {diet: diet, dish: dish, recipe: recipe})
    .then(response => {
        // Handle successful response
        setResponseText(response.data);
        console.log(response.data);
    })
    .catch(error => {
        // Handle error
        console.log('Error:', error.response);
    });

    }
  
    return (
    <div className={styles.modal}>
        <div className={styles.overlay}>
            <div className={styles['modal-content']}>
                {mode == 'create' &&
                <div className={styles['create-view']}>
                    <div className={styles.view}>
                        <h3>Recipe</h3>
                        
                        {response}
                    </div>
                    <div className={styles.view}>
                        <h3>Generate Recipe</h3>
                        <form method="POST">
                            <label>Enter Recipe</label>
                            <p>Enter the dish to make and the AI will mend the recipe for you.</p>
                            <input type="text" onChange={(e) => {setDish(e.target.value)}} />
                            
                            <br/>

                            <label>Enter Recipe Link </label>
                            <p>Enter the link to your recipe</p>
                            <input onChange={(e) => {setRecipe(e.target.value)}}/>

                            <label>Dietary Restrictions</label>
                            <p>Enter the dietary restrictions.</p>
                            <input type="text" name='diet' onChange={(e) => {setDietaryRestrictions(e.target.value)}} /> 
                            
                            <br/>

                            <input type="submit" value="Generate" onClick={handle}/>
                        </form>
                        
                    </div>
                </div>}
                {mode == 'view' &&
                    <Recipe ingredients={ingredients} steps={steps}/>
                }
                <FontAwesomeIcon onClick={()=>setShowModal(false)} className={styles['close-modal']} icon={faXmark}/>
            </div>
        </div>
    </div>

  )
}

export default Modal;