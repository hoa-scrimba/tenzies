import React from "react";
import Die from "./Die.js";

function App() {
    
    const [numArray, setNumArray] = React.useState(allNewDice())
    // console.log(numArray)
    
    const[didUserWin, setDidUserWin] = React.useState(false)
    
    React.useEffect(() => {
        // console.log("effect ran")  
        const allHeld = numArray.every( (dice) => {
            return dice.isHeld === true;
        })
        const sameVal = numArray.every( (dice, i, arr) => {
            return dice.value === arr[0].value;
        })
        if (allHeld && sameVal) {
            setDidUserWin(true)
            console.log("You won!")
        }
    }, [numArray])
    
    function allNewDice() {
        const diceNumArray = [];
        for (let i = 0; i < 10; i++) {
            diceNumArray.push(
                {
                    id: Math.random().toFixed(9),
                    value: Math.floor((Math.random()*6)+1),
                    isHeld: false
                }
            )
        }
        return diceNumArray
    }
    
    function holdDice(id) {
        setNumArray((prev) => {
            return prev.map((item) => {
                return (
                    item.id === id ? {...item, isHeld: !item.isHeld} : item
                );
            });
        });
    }
    
    
    function rollDice() {
        if (didUserWin === false) {
            setNumArray((prev) => {
                return prev.map((item) => {
                    return (
                        item.isHeld === true 
                        ? item 
                        : { 
                            id: Math.random().toFixed(9),
                            value: Math.floor((Math.random()*6)+1),
                            isHeld: false
                        } 
                    )
                })
            })
        } else {
            setDidUserWin(false)
            setNumArray(allNewDice())
        }
    }
    
    
    const DiceElements = numArray.map(function (num){
        return (
            <Die
                key={num.id} 
                value={num.value}
                isHeld={num.isHeld}
                holdDice={() => holdDice(num.id)}
            /> 
        );
    });
    
    return (
        <main className="main--container">
            <div className="dice--container">
                {DiceElements}
            </div>
            <button 
                type="button" 
                className="btn-roll-dice"
                onClick={rollDice}
            >
                {didUserWin ? "New Game" : "Roll Dice"}
            </button>
        </main>
    )
}


export default App;
