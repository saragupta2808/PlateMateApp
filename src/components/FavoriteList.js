import React from "react";
import Modal from "react-bootstrap/Modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from '@fortawesome/free-solid-svg-icons'

export default function IngredientList(props) {


  // console.log(props.shoppingList);
  const list = props.favList;

  
  const items = list.map((item) => {
    return (
      <div className= "ingredient-item" key={item.url} style={{display: "flex", alignItems : "center" , marginBottom : "1rem"}}>
         <FontAwesomeIcon icon={faHeart} size="sm" style={{color: "rgb(171 40 31)"}} />
          <a style={{color: "#422800", marginLeft : "1rem", fontSize: "15px", width: "440px", whiteSpace:"normal"}} href={`${item.url}`}>{item.label}</a>        
      </div>
    );
  });
  return (
    <>
      <Modal
        show={props.showFavs}
        onHide={props.handleCloseList}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header >
          <Modal.Title style={{color:"#0c7b68", fontweight : "700" , fontsize: "25px",}}>Your Favorite Recipes</Modal.Title>
        </Modal.Header>
        <Modal.Body>{items.length ? items.reverse() : "You don't have any favorites yet!"}</Modal.Body>
        <Modal.Footer>
          <button className="button-74" onClick={props.handleCloseList}>Close</button>
         
         
        </Modal.Footer>
      </Modal>
    </>
  );
}
