import { useState } from 'react'; 
import './App.css';
import dice1 from './images/dice1.png';
import dice2 from './images/dice2.png';
import dice3 from './images/dice3.png';
import dice4 from './images/dice4.png';
import dice5 from './images/dice5.png';
import dice6 from './images/dice6.png';

const sleep = (ms = 150) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

function App() {
  
  //Dice
  const [playerDice, setPlayerDice] = useState(0);
  const [computerDice, setComputerDice] = useState(0);
  const [rolling, setRolling] = useState(false);

  //Name
  const [playerName, setPlayerName] = useState('Player1');
  const [nameInput, setNameInput] = useState('');
  const [nameChosen, setNameChosen] = useState(false);

  //Result Message
  const [resultMessage, setResultMessage] = useState('');

  //Change Name
  const handleNameChange = () => {
    if (nameInput.trim() !== '') {
      setPlayerName(nameInput);
    } else {
      setPlayerName('Player1');
    }
    setNameChosen(true);
  };

  
  //Get Dice Image
  const getDiceImage = (value) => {
    switch (value) {
      case 1:
        return dice1;
      case 2:
        return dice2;
      case 3:
        return dice3;
      case 4:
        return dice4;
      case 5:
        return dice5;
      case 6:
        return dice6;
      default:
        return dice1;
    }
  };

  //Roll Dice
  const rollDice = async () => {
    setRolling(true);
    setResultMessage('');

    //const randomPlayerDice = Math.floor(Math.random() * 6) + 1;
    //const randomComputerDice = Math.floor(Math.random() * 6) + 1;

    //setPlayerDice(randomPlayerDice);
    //setComputerDice(randomComputerDice);

    let randomPlayerDice = 0;
    let randomComputerDice = 0;
    
    for (let i = 0; i < 20; i++) {
      randomPlayerDice = Math.floor(Math.random() * 6) + 1;
      randomComputerDice = Math.floor(Math.random() * 6) + 1;

      setPlayerDice(randomPlayerDice);
      setComputerDice(randomComputerDice);
      await sleep();
      if (i === 19) {
        setRolling(false);
      }
    }
    //setTimeout(() => {
    //  setRolling(false);
    //}, 1000);

    if (randomPlayerDice > randomComputerDice) {
      setResultMessage('You win! 🎉');
    } else if (randomPlayerDice < randomComputerDice) {
      setResultMessage('You lose! 😢');
    } else {
      setResultMessage('Draw! 🤝');
    }
  };
  
  return (
    <>
      <h1>Dice Game</h1>
      {!nameChosen ? (
        <div className='nameInputContainer'>
          <div className='nameInput'>
          <input
            type="text"
            placeholder="Enter your name here"
            value={nameInput}
            onChange={(e) => setNameInput(e.target.value)}
          /> 
          <br />
          <br />    
          <button onClick={handleNameChange}>Set Name</button>
        </div>
      </div>   
      ) : (
        <>
          <div>
            <h2 className='resultMessage'>{resultMessage}</h2>
          </div>
          <div className="playerAndComputer">
            <div className='player'>
              <h2>{playerName}</h2>
              <img src={getDiceImage(playerDice)} alt={`Player dice ${playerDice}`} />
            </div>
            <div className='computer'>
              <h2>Computer</h2>
              <img src={getDiceImage(computerDice)} alt={`Computer dice ${computerDice}`} />
            </div>
          </div>
          <br />
          <button className='rollButton' disabled={rolling} onClick={rollDice}>
            {!rolling && <i className='fa-solid fa-shuffle'></i>}
            {rolling ? "Rolling..." : ""}
          </button>
        </>
      )}
    </>
  );
}  

export default App;
