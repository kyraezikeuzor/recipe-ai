require('dotenv').config();
const {OpenAI} = require("openai");
const openai = new OpenAI({apiKey: process.env.OPENAI_API_KEY});
const bodyParser = require('body-parser')
const cors = require('cors');
const express = require('express');
const app = express();
const PORT = 3002;
app.use(express.json());
app.use(bodyParser.urlencoded({extended:true}));

app.use(cors({
    origin: ["http://localhost:3001"],
    methods: ["POST", "GET"],
    credentials: true}
));

const cookieParser = require('cookie-parser');
const session = require("express-session");

app.use(cookieParser());



/*//login 
// For dashboard page
app.get('/dashboard', (req,res) => {
    if (req.session.username) {
        return res.json({valid: true, username: req.session.username, password: req.session.password, role: req.session.role});
    } else {
        return res.json({valid: false})
    }
});*/


/*// Post request for login
app.post('/', async (req,res) => {
    const username = req.body.username;
    const password = req.body.password;
    
        try {
            const result =
            await sql`SELECT * FROM users WHERE Username = ${username} AND Password = ${password};`;
            if (result.length > 0) {
                return res.json({login: "Login successful", username: req.session.username});
            } else {
                return res.json({login: "Incorrect username or password"});
            }
            
        } catch (error) {
            return NextResponse.json({ error }, { status: 500 });
        }
    
});*/


/*app.post('/api/save', (req, res) => {
    const name = req.body.name;
    const content = req.body.content;
    const diettypes = req.body.diet;
    {
    try {
        const result =
         sql`INSERT INTO recipes (Name, Content, Diettypes, Userid) VALUES(?,?,?)`;
        return NextResponse.json({ result }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error }, { status: 500 });
    }
    }
});*/

app.post('/api/generate', async (req, res) => {
    console.log('Received a POST request to /api/generate');
    const diet = req.body.diet;
    const dish = req.body.dish;
    const recipe = req.body.recipe;

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

    try {
        const response = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: message

        });

        res.json(response.choices[0].message.content)
    } catch (error) {
        console.log('Error:', error);
        res.status(500).json({error: 'An error occurred'})
    }

});

app.listen(PORT, (err) => {
    if (err) console.log(err);
    console.log('Server running on PORT', PORT);
});