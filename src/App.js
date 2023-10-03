import { useEffect, useState } from 'react';
import './App.css';

function App() {
let length=20;
let snakeInitialposition=[{x:length/2,y:length/2},{x:(length/2)+1,y:length/2}];
  const[food,setFood]=useState({x:5,y:5});
  const[snake,setSnake]=useState(snakeInitialposition);
  const[direction,setDirection]=useState("UP");
  const[score,setScore]=useState(0);
  const[info,setInfo]=useState("Press Enter to Start");
let cellArray=[];
  function renderCells(){
    let k=0;
    for(let row=0; row<20; row++){
      for(let col=0; col<20; col++){
        
        let cell=<div className='cell' key={k++}></div>
        
        if(food.x===row && food.y===col){
          cell=<div className='food'  key={k++}></div>
        }
        let isSnake=snake.some((ce)=>{return ce.x===row && ce.y===col});
        let isSnakeHead=snake[0].x===row&&snake[0].y===col;
        
        if(isSnake){
          cell=<div className='snake'  key={k++}></div>
        }

        if(isSnakeHead){
          cell=<div className='snakehead'  key={k++}></div>
        }

        cellArray.push(cell);
      }
    }
    return cellArray;
  }

  function renderFood(){
    let xaxis=Math.floor(Math.random()*length);
    let yaxis=Math.floor(Math.random()*length);
    setFood(()=>{console.log('here');return {x:xaxis,y:yaxis}});
  }
  function gameOver(){
    console.log("game Over");
    setScore(0);
    setSnake(snakeInitialposition);
  }
 
  function updateCells(){
    let newPosition=[...snake];
    

      switch (direction){      
        case "LEFT":
           newPosition.unshift({x: newPosition[0].x,y:newPosition[0].y-1});
           break;
        case "RIGHT":
          newPosition.unshift({x: newPosition[0].x,y:newPosition[0].y+1});
            break;
        case "UP":
          newPosition.unshift({x: newPosition[0].x-1,y:newPosition[0].y});
              break;
        case "DOWN":
          newPosition.unshift({x: newPosition[0].x+1,y:newPosition[0].y});
                break;
          default:
            console.log('no match');
            break;
      }
      if(food.x===newPosition[0].x && food.y===newPosition[0].y){
        renderFood();
        setScore((prev)=>  prev+1);
      }else{
        newPosition.pop();
      }
      let isAte=snake.splice(1).some((ele)=>{
        return ele.x===snake[0].x && ele.y===snake[0].y
      });
      let isBeyond=snake[0].x>=20 || snake[0].y>=20 || snake[0].x<0 || snake[0].y<0;
      if(isAte || isBeyond){
        setInfo(`    Game Over
                Press Enter To Restart`);
        gameOver();
        return;
      }
      setSnake(newPosition);

      
  }
  function changeDirection(event){

   let key=event.code;
   console.log(key);
   let d="";
   if (event.keyCode == 37 && direction != "RIGHT") {
    d = "LEFT";
} else if (event.keyCode == 38 && direction != "DOWN") {
    d = "UP";
} else if (event.keyCode == 39 && direction != "LEFT") {
    d = "RIGHT";
} else if (event.keyCode == 40 && direction != "UP") {
    d = "DOWN";
}

   setDirection(d);
   return;
  }

 
  

  useEffect(()=>{
   
    let interval=setTimeout(updateCells,200);
    return ()=>clearInterval(interval,updateCells);
   });

   useEffect(()=>{
    document.addEventListener('keydown',changeDirection);
   
   });


  return (
    <div className="App" >
      
        <div className='scoreboard'>
        
            <span className='score'>Score: {score}</span>
        </div>
        <div className='board' >
              {renderCells()}
             
        </div>
     
    
    </div>
  );
}

export default App;
