import React from "react";
import Modal from "react-bootstrap/Modal";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUtensils, faTrashCan } from "@fortawesome/free-solid-svg-icons";

export default function IngredientList(props) {


  // console.log(props.shoppingList);
 

  
  const items = props.shoppingList.map(item => {
    //console.log(item)
    let foodName = item.name;
    
    let ingredients = item.ingredients.map((ingredient,index) => {
        return ( 
         
         <p className= "ingredient-item" key={index}>
        
        <input type="checkbox" name="list-item" className="check-box" checked={ingredient.isStriked} onChange={() => props.handleStrike(index,ingredient)} />

        <label  className="ingredient-label" htmlFor="list-item">{ingredient.isStriked? <p className="final" style={{color: "#422800",}}><s>{ingredient.ingredient_line} </s></p> : <p className="final" style={{color: "#422800",}}>{ingredient.ingredient_line}</p> }</label><br></br>
      </p> 
        )
    });
    
    return (
      <>
      <div>
      <div style={{display: "flex", alignItems : "center"}}> 

      <FontAwesomeIcon icon={faUtensils} size = "lg" style={{color: "#422800",}} />
      <h6 style={{color: "#0c7b68",  marginLeft : "5px", marginBottom : "0"}}>{foodName}</h6>
      <span onClick={()=>props.handleDeleteRecipe(item)}>
      <FontAwesomeIcon icon={faTrashCan} size="sm" style={{color: "#422800", marginLeft: "5px", cursor: "pointer"}} />
      </span>
      
      </div>
      
     
      <div className="ingredients" >{ingredients}</div>
     

  
      </div>
      <br></br>
      </>
    )
  });
  return (
    <>
      <Modal
        show={props.showList}
        onHide={props.handleCloseList}
        backdrop="static"
        keyboard={false}
       
      >
        <Modal.Header >
          <Modal.Title style={{color:"#0c7b68", fontweight : "700" , fontsize: "25px",}}>Your Ingredient List</Modal.Title>
        </Modal.Header>
        <Modal.Body >{items.length ? items.reverse() : "You haven't added any ingredients yet!"}</Modal.Body>
        <Modal.Footer>
          <button className="button-74" onClick={props.handleCloseList}>Close</button>       
         
        </Modal.Footer>
      </Modal>
    </>
  );
}
