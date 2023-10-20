import React from "react";

function Die(props) {
    
    const styles = {
        backgroundColor: props.isHeld ? "#59E391" : "white" 
    }
    
    return (
        <div 
            className="dice-face" 
            style={styles} 
            onClick={props.holdDice}
        >
            <h3>
                {props.value}
            </h3>
        </div>
    )
}


export default Die;