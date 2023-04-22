import React, { useEffect } from "react";
import "./App.css";
import Head from "./components/Head.js";
import RecipeCard from "./components/RecipeCard";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { MDBFooter, MDBContainer } from 'mdb-react-ui-kit';





export default function App() {
 
 
  // const [username, setUsername] = React.useState('');
  // msalInstance.addEventCallback(event => {
  //   if(event.eventType === EventType.LOGIN_SUCCESS){
      
  //     console.log('logged in',event)
  //     msalInstance.setActiveAccount(event.payload.account)

  //     setUsername(event.payload.account.name)
      
      
      
  //   }})
  //   useEffect(() => {
  //     const currentaccount = msalInstance.getActiveAccount();
  //     console.log('active account ',currentaccount)
  //     if(currentaccount){
  //       console.log(currentaccount)
  //       setUsername(currentaccount.name)
  //     }
  //   },[msalInstance])



    
    
    
  
  //azure till here
  const [recipeData, setRecipeData] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);
  const [search, setSearch] = React.useState(undefined);
  const [filterValue, setFilterValue] = React.useState("");
  const [filter, setFilter] = React.useState("")
  const [shoppingList, setShoppingList] = React.useState([]);
  const [showList, setShowList] = React.useState(false);
  const [favList, setfavList] = React.useState([]);
  const [showFavs, setShowFavs] = React.useState(false);
  const [chatBot, setChatBot] = React.useState(false);
  const [greeting, setGreeting] = React.useState("")

  const handleOpenFavs = () => setShowFavs(true);
  const handleCloseFavs = () => setShowFavs(false);

  const handleCloseList = () => setShowList(false);
  const handleShowList = () => setShowList(true);

  const handleCloseBot = () => setChatBot(false);
  const handleShowBot = () => {
    setChatBot(true);
    //console.log('chatbot clicked at app.js')
  }



  function handleAddToFavs(recipe) {
    setfavList((prevState) => {
      const favs = [];
      if (prevState.length) {
        let found = false;
        for (let i = 0; i < prevState.length; i++) {
          if(prevState[i].url === recipe.url){
            const mr = {
              ...prevState[i],
              fav : !prevState[i].fav
            }
            favs.push(mr);
            found=true;
            
          }
          else
            favs.push(prevState[i]);
          
        }
        if(!found){
          favs.push({...recipe, fav: true});
        }

       
      } 
      else {
        favs.push({...recipe, fav: true});
      }
      return favs;
    });
  }
  //console.log(favList)
  function handleStrike(index, line) {
    //console.log(line)
    // console.log(isStriked)
    setShoppingList((prevState) => {
      return prevState.map((item) => {
        let obj={...line};

        if(item.name === line.recipe)
        {   
          //console.log('found')
          obj.isStriked = !line.isStriked;
          const ing= [...item.ingredients];
          ing[index]=obj;
          console.log(ing)
          return {name: item.name, ingredients:ing}
          
         

        }
        else{
          return {...item}
        }
       
        
      });
    });
  }

  const [hasMore, sethasMore] = React.useState(true);
  const [url, setUrl] = React.useState(`https://api.edamam.com/api/recipes/v2/?type=public&app_id=89d6a7bf&app_key=b6aafb08de37e4b384672eea7066b05f&${filter}=${filterValue}`);
  const [nextUrl, setNextUrl] = React.useState('')
  

  function getApiData (prevResponse) {
    console.log(url)
    setLoading(true)
    const result =  fetch(url)
      .then((response) => response.json())
      // setProgress(progress + 10)
      .then((response) => {
        const recp = response.hits;
        const newResponse = [...prevResponse, ...recp];
        // setProgress(progress + 20)
        if (response["_links"] && response["_links"].next) {
          setNextUrl(response["_links"].next.href);
          setError(null);
          sethasMore(true);
        }
        else{
          sethasMore(false);
        }
        // setProgress(progress + 30)

        return newResponse;
      })
      .catch((err) => {
        setError(err.message);
      })
      .finally(() => {
        setLoading(false);
      });
      
     return result;
  };
  
  React.useEffect(()=>{
    const date = new Date();
    const hours = date.getHours();
    if(hours >= 0 && hours <= 12){
      setFilter("mealType");
      setFilterValue("Breakfast");
      setGreeting(`Good Morning! Here are some breakfast ideas for you`)
    }
    else if(hours > 12  && hours <= 16){
      setFilter("mealType");
      setFilterValue("Lunch");
      setGreeting(`Good Afternoon!Here are some lunch ideas for you`)
    }
    else if(hours > 16  && hours <= 18){
      setFilter("mealType");
      setFilterValue("Teatime");
      setGreeting("Good Evening ! Here are some teatime recipes for you")
    }
    else if(hours > 18  && hours <= 20){
      setFilter("mealType");
      setFilterValue("Snack");
      setGreeting("Good Evening ! Here are some snack ideas for you")
    }
    else if(hours >= 20){
      setFilter("mealType");
      setFilterValue("Dinner");
      setGreeting("Good Evening !Here are some dinner recipes for you")
    }
  },[])
  React.useEffect(() => {
   
    //console.log('rendered')
    let promise = getApiData(recipeData);
    promise.then(
      (result) => { 
         //console.log(result);
         setRecipeData(result);
         
      },
      (error) => { 
         console.log(error);
      }
    );   
    
  }, [url]);
  React.useEffect(() => {
   
   
    setRecipeData([]);

    setUrl(`https://api.edamam.com/api/recipes/v2/?type=public&app_id=89d6a7bf&app_key=b6aafb08de37e4b384672eea7066b05f&${filter}=${filterValue}`)
  
   
    
  }, [filter, filterValue]);
 

  function onScroll(){
    const scrollTop = document.documentElement.scrollTop
    const scrollHeight = document.documentElement.scrollHeight
    const clientHeight = document.documentElement.clientHeight
    //console.log(Math.ceil(scrollTop))
   
    if (Math.ceil(scrollTop) + clientHeight >= scrollHeight && hasMore) {
      //console.log('reached at the end')
      setUrl(nextUrl);
      console.log(nextUrl)
    }
  }

  React.useEffect(()=>{
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  },[recipeData])

  function handleFilter(category, filter){
    
    const parameter = category + "Type"
    console.log(parameter, filter)
    setFilter(parameter);
    setFilterValue(filter);
    setGreeting("")
    
  }

  function handleSearch(event) {
    setSearch(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault(); //to prevent page from reloading and the form getting cleared
    console.log(search);
    setFilterValue(search);
    setFilter("q");
    setGreeting("")

  }
  function addIngredients(idx) {
    const recipeName = recipeData[idx].recipe.label;
    for(let i=0;i<shoppingList.length;i++){
      if(shoppingList[i].name === recipeName)
      {
        toast.info(`${recipeName} ingredients are already in your list!`)
        return;
      }
    }
    const ingredients = recipeData[idx].recipe.ingredientLines.map(line => {
      return {ingredient_line : line, isStriked: false, recipe : recipeName};
    })
    
    const newRecipe = {name : recipeName, ingredients: ingredients};

    setShoppingList((prevState) => {
      const updatedList = [];
      for(let item = 0;item< prevState.length;item++)
        updatedList.push(prevState[item]);
      updatedList.push(newRecipe);
      
     
      return updatedList;
    });
    

toast.success("Successfully added ingredients to your list!")
    
  }
  //console.log(shoppingList)
 
  // console.log(shoppingList)
  const recipelist = recipeData.map((recipe, index) => {
    return (
      <RecipeCard
        key={index}
        title={recipe.recipe.label}
        image={recipe.recipe.image}
        url={recipe.recipe.url}
        calories={recipe.recipe.calories}
        nutrition={recipe.recipe.digest}
        ingredientLines={recipe.recipe.ingredientLines}
        isFavorite={handleIsFavorite(recipe.recipe.url)}
        handleFavs={() => handleAddToFavs(recipe.recipe)}
        addIngredients={() => addIngredients(index)}
      />
    );
  });
  function handleIsFavorite(url) {
    for (let i = 0; i < favList.length; i++) {
      if (favList[i].url === url) {
        return favList[i].fav;
      }
    }
    return false;
  }
  
  function handleDeleteRecipe(item){
    
    //console.log(item.name)
      setShoppingList(prevState => {     
        const newShoppinglist=[]   
        for(let i=0;i<prevState.length;i++){
          if(!(prevState[i].name === item.name))
            newShoppinglist.push(prevState[i]);
        }
        return newShoppinglist;
      })
  }
 

   return (
  <div className="App">
     
     
      <Head
        search={search}
        handleSearch={handleSearch}
        handleSubmit={handleSubmit}
        showList={showList}
        handleCloseList={handleCloseList}
        handleShowList={handleShowList}
        shoppingList={shoppingList}
        handleStrike={handleStrike}
        showFavs={showFavs}
        handleCloseFavs={handleCloseFavs}
        handleOpenFavs={handleOpenFavs}
        favList={favList}
        handleFilter={handleFilter}
        handleDeleteRecipe ={handleDeleteRecipe}
        handleCloseBot = {handleCloseBot}
        handleShowBot = {handleShowBot}
        chatBot = {chatBot}
       
      />

      
    
     
        <h5 style={{color : "#226946"}}>{greeting}</h5>
      
     
        
        <main>{recipelist}</main>
        {loading && <div class="d-flex justify-content-center">
        <div class="spinner-border" role="status">
          <span class="sr-only"></span>
        </div>
      </div>}


      {error && (
        <div>{`There is a problem fetching the post data - ${error}`}</div>
      )}
     
        {/* <div>
          <h2 className="logo home-logo">Plate Mate</h2>
            <div className="home-image"></div>
        </div>
         */}
  <br></br>
  <br></br>

      <MDBFooter className='text-center text-white' style={{ backgroundColor: 'white' }}>
          <MDBContainer className='p-4'></MDBContainer>

          <div className='text-center p-3' style={{ backgroundColor: 'rgb(149 219 207)' }}>
            © 2023 Copyright:
           
            <p className='text-white' >
                PlateMate : Your Recipe Buddy 
            </p>
          </div>
          <footer id="edamam-badge" data-color="white"></footer>
      </MDBFooter>
     
     
      
        </div>
  );
}
