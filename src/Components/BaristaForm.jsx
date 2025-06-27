import { useState, useSyncExternalStore } from 'react';
import '../App.css'
import RecipeChoices from './RecipeChoices';
import drinksJson from "./drinks.json";

const BaristaForm = () => {
    const [temp, setTemp] = useState("");
    const [syrup, setSyrup] = useState("");
    const [milk, setMilk] = useState("");
    const [blended, setBlended] = useState("");

    const [drink, setDrink] = useState("");

    const [recipe, setRecipe] = useState({
        'temp': '',
        'milk': '',
        'syrup': '',
        'blended': ''
    });

    const [inputs, setInputs] = useState({
        'temperature': '',
        'milk': '',
        'syrup': '',
        'blended': ''
    });

    const ingredients = {
        'temperature' : ['hot', 'lukewarm', 'cold'],
        'syrup': ['mocha', 'vanilla', 'toffee', 'maple', 'caramel', 'other', 'none'],
        'milk': ['cow', 'oat', 'goat', 'almond', 'none'],
        'blended': ['yes', 'turbo', 'no']
    };
    
    const onCheckAnswer = () => {
        if (recipe.temp != inputs['temperature']){
            setTemp('wrong');
        }
        else {
            setTemp("correct");
        }

        if (recipe.milk != inputs['milk']){
            setMilk('wrong');
        }
        else {
            setMilk("correct");
        }

        if (recipe.syrup != inputs['syrup']){
            setSyrup('wrong');
        }
        else {
            setSyrup("correct");
        }

        if (recipe.blended != inputs['blended']){
            setBlended('wrong');
        }
        else {
            setBlended("correct");
        }
    }
    
    const onNewDrink = () => {
        setInputs({
            'temperature': '',
            'milk': '',
            'syrup': '',
            'blended': '' 
        });

        getNextDrink();

        setTemp("");
        setMilk("");
        setSyrup("");
        setBlended("");
    }

    const getNextDrink = () => {
        let randomDrinkIndex = Math.floor(Math.random() * drinksJson.drinks.length);
        setDrink(drinksJson.drinks[randomDrinkIndex].name);
        setRecipe(drinksJson.drinks[randomDrinkIndex].ingredients);
    };

    return (
        <div>
            <h2>
                Hi, I'd like to order a:
            </h2>
            <div className="drink-container">
                <h2 className="mini-header">
                    {drink}
                </h2>
                <button type="new-drink-button" className="button newdrink" onClick={onNewDrink}>
                    🔄
                </button>
            </div>
            <form className="container">
                <div className="mini-container">
                    <h3>Temperature</h3>
                    <div id={temp} className="answer-space" >
                        {inputs["temperature"]} 
                    </div>
                    <RecipeChoices
                        handleChange={(e) => setInputs((prevState) => ({
                            ...prevState,
                            [e.target.name]: e.target.value,
                        }))}
                        label="temperature"
                        choices={ingredients["temperature"]}
                        checked={inputs["temperature"]}
                    />
                </div>
                
                <div className="mini-container">
                    <h3>Milk</h3>
                    <div id={milk} className="answer-space" >
                        {inputs["milk"]} 
                    </div>
                    <RecipeChoices
                        handleChange={(e) => setInputs((prevState) => ({
                            ...prevState,
                            [e.target.name]: e.target.value,
                        }))}
                        label="milk"
                        choices={ingredients["milk"]}
                        checked={inputs["milk"]}
                    />
                </div>

                <div className="mini-container">
                    <h3>Syrup</h3>
                    <div id={syrup} className="answer-space" >
                    {inputs["syrup"]} 
                    </div>
                    <RecipeChoices
                        handleChange={(e) => setInputs((prevState) => ({
                            ...prevState,
                            [e.target.name]: e.target.value,
                        }))}
                        label="syrup"
                        choices={ingredients["syrup"]}
                        checked={inputs["syrup"]}
                    />
                </div>


                <div className="mini-container">
                    <h3>Blended</h3>
                    <div id={blended} className="answer-space" >
                        {inputs["blended"]} 
                    </div>
                    <RecipeChoices
                        handleChange={(e) => setInputs((prevState) => ({
                            ...prevState,
                            [e.target.name]: e.target.value,
                        }))}
                        label="blended"
                        choices={ingredients["blended"]}
                        checked={inputs["blended"]}
                    />
                </div>
            </form>
            <button type="submit" className="button submit" onClick={onCheckAnswer}>
                Check Answer
            </button>
        </div>
    );
};

export default BaristaForm;
