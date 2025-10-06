import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'

import './App.css'
import TopPlate from './topPlate/TopPlate'
function App() {
  let [count, setCount] = useState(0);
  let [maxCount, setMaxCount] = useState(0);
  let [ch1, setCh1] = useState(getCharcter());
  let [ch2, setCh2] = useState(getCharcter());
  function getCharcter(){
    let character = fetch('https://api.rule34.gg/getRandomPosts?amount=1&tags=solo')
      .then(response => response.json());
    return character;
  }
  async function setCharacters(){
    setCh1(await getCharcter());
    setCh2(await getCharcter());
  }
  function onCorrect(){
    setCount(count + 1);
    setMaxCount(Math.max(maxCount, count + 1));
  }
  function onIncorrect(){
    setCount(0);
  }
  return (
    <>
      <div>
        Streak: {count}
      </div>
      <div>
        Record: {maxCount}
      </div>
      <div>
        <Option onClick ={onCorrect} character = {ch1}></Option>
        <Option onClick ={onIncorrect} character = {ch2}></Option> 
      </div>
    </>
  )
}

function Option({onClick, character}) {
  character.name = 0;
  return (
  <button onClick={onClick}>
    <ul>
      {Object.keys(character).map(
        element => (<li> {element}</li>)
      )}
    </ul>
    <h1>
      {typeof character}
    </h1>
  </button>
  )
}

export default App
