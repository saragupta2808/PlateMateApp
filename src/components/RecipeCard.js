import React from "react";
import Card from "react-bootstrap/Card";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import Popover from "react-bootstrap/Popover";
import Table from 'react-bootstrap/Table';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleInfo ,faHeartCircleCheck} from '@fortawesome/free-solid-svg-icons'
import {  faHeart as faHeartRegular}  from '@fortawesome/free-regular-svg-icons'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function RecipeCard(props) {
 
  const ingredientLines = props.ingredientLines.map((line) => {
    return <li>{line}</li>;
  });



  const nutritionalValuepopover = (
    <Popover id="popover-basic">
      <Popover.Header as="h3">{Math.round(props.calories*100) / 100} kcal per serving</Popover.Header>
      <Popover.Body className="m-1 p-0 table-responsive" >
      
      <Table striped bordered hover size="sm" >
      <thead>
        <tr>
          <th>Nutrients</th>
          <th>Value</th>
        </tr>
      </thead>
      <tbody>
       
          {props.nutrition.map((value) =>
              (<tr>
                <td>{value.label}</td>
                <td>{Math.round(value.total*100) / 100}{value.unit}</td>
              </tr>)
          )}        
         
        
       
      </tbody>
    </Table>
      </Popover.Body>
    </Popover>
  );
  

  const IngredientLines = () => (
    <>
    
    <OverlayTrigger
      placement="bottom"
      delay={{ show: 250, hide: 400 }}
      overlay={renderTooltip}
    >

<button className="button-74"  onClick={props.addIngredients}  style={{position:"absolute", bottom: "55px", left: "72px"}}> Add Ingredients to List</button>
      



    </OverlayTrigger>
   
    </>
  );

  const renderTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      {ingredientLines}
    </Tooltip>
  );

   
  const Nutrition = () => (
    <OverlayTrigger
      trigger="click"
      placement="right"
      overlay={nutritionalValuepopover}
    >
       <FontAwesomeIcon  icon={faCircleInfo} size="xl" style={{color: "rgb(3 15 9)" , position: "absolute", left: "31px", bottom:"82px"}} />
      
      
    </OverlayTrigger>
  );
    
 
  return (
    <Card >
      <Card.Img variant="bottom" src={props.image} alt={props.title} />
      <Card.Title ><div>{props.title}</div></Card.Title>
      <Card.Body>
        
          <Card.Text>
          <Nutrition />
         
          
          <span onClick={props.handleFavs}>
          <FontAwesomeIcon icon={ props.isFavorite ?faHeartCircleCheck : faHeartRegular} size="2xl" style={{color: "rgb(171 40 31)", position: "absolute", right: "15px", bottom: "81px"}}/>
          </span>
          
        
         
        </Card.Text>
        <IngredientLines />
        <ToastContainer position="top-right"
          autoClose={1500}
          hideProgressBar
          />
        <a class="button-74" href={props.url} target="_blank" rel="noreferrer" style={{position:"absolute", bottom: "10px", left: "121px"}}>Go to recipe</a>
       
    
      </Card.Body>
    </Card>
   
  );
}
