'use client'
import styles from './page.module.css'
require('dotenv').config();
import React, {useState} from 'react'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faXmark} from "@fortawesome/free-solid-svg-icons";
import Axios from 'axios'
import {parseRecipe} from '../../utilities'

export default function AI() {
    const [diet, setDietaryRestrictions] = useState('');
    const [dish, setDish] = useState('');
    const [recipe, setRecipe] = useState('');

    const [response, setResponseText] = useState({});

    
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
            content: "You are recipe generator. You will generate recipes modified for a dietary restriction or multiple dietary restrictions. Respond with the recipe in a structured JSON format, with two top-level keys: 'ingredients' as an array of objects with 'quantity' and 'ingredient' keys, and 'directions' as an array of strings. Use the passed in chats as a basis on what to return depending on certain prompts and how to return them. Do not memorize the recipes and give out the exact same input. If you cannot complete the task, respond with an empty JSON object."
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

    const dog = {
        "ingredients": [
          {
            "quantity": "1 cup",
            "ingredient": "All-purpose flour"
          },
          {
            "quantity": "1/2 cup",
            "ingredient": "Cocoa powder"
          },
          {
            "quantity": "1 cup",
            "ingredient": "Granulated sugar"
          },
          {
            "quantity": "1/2 teaspoon",
            "ingredient": "Salt"
          },
          {
            "quantity": "1/2 cup",
            "ingredient": "Vegetable oil"
          },
          {
            "quantity": "1/4 cup",
            "ingredient": "Water"
          },
          {
            "quantity": "1 teaspoon",
            "ingredient": "Vanilla extract"
          },
          {
            "quantity": "1/2 cup",
            "ingredient": "Dairy-free dark chocolate chips"
          }
        ],
        "directions": [
          "Preheat the oven to 350°F (175°C).",
          "In a mixing bowl, combine the all-purpose flour, cocoa powder, granulated sugar, and salt.",
          "Add the vegetable oil, water, and vanilla extract to the dry ingredients. Mix until well combined.",
          "Fold in the dairy-free dark chocolate chips.",
          "Pour the batter into a greased 8x8-inch baking dish.",
          "Bake in the preheated oven for 25-30 minutes, or until a toothpick inserted into the center comes out with a few moist crumbs.",
          "Remove from the oven and let the brownies cool completely before cutting into squares.",
          "Enjoy these delicious dairy-free brownies!"
        ]
      }
   
    

  return (
    <main className={styles.main}>
        <div className={styles['create-view']}>
            <div className={styles.view}>
            
                {diet && dish && <h3>{diet + ' ' + dish}</h3>}
                {!diet && !diet && <h3>Recipe</h3>}

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

            </div>
            
            <div className={styles.view}>
                <h3>Generate Recipe</h3>
                <form method="POST">
                    <label>Enter Recipe</label>
                    <p>Enter the dish to make and the AI will mend the recipe for you.</p>
                    <input type="text" onChange={(e) => {setDish(e.target.value)}} />
                    
                    <br/>

                    <label>Enter Recipe Link </label>
                    <p>Enter the link to your recipe (Optional)</p>
                    <input onChange={(e) => {setRecipe(e.target.value)}}/>

                    <label>Dietary Restrictions</label>
                    <p>Enter the dietary restrictions.</p>
                    <input type="text" name='diet' onChange={(e) => {setDietaryRestrictions(e.target.value)}} /> 
                    
                    <br/>

                    <input type="submit" value="Generate" onClick={handle}/>
                </form>
                
            </div>
        </div>
    </main>
  )
}
