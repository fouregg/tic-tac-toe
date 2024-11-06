import { useState } from 'react';

import './App.css';

function App() {
  return(
    <div className="App">
      <Board/>
    </div>
  );
}

function Square({ value, onSquareClick }) // value и onSquareClick - это props(свойства этого Square)
{
  return (
    <button className='square' onClick={onSquareClick}>{ value }</button>  
  )
}

function Board()
{
  const [onPlay, setOnPlay] = useState(true); // Хук, который меняет значение состояния возможности игры
  const [whoIsNext, setNext] = useState(true) // Хук, который меняет значение переменной налету без обновления страницы
  const [gameStatus, setGameStatus] = useState(true); // Хук, который меняет состояние строки вывода игры
  const [squares, setSquares] = useState(new Array(9).fill('')); // Хук, который меняет массив крестиков и ноликов, т.к. нам нужно его обнулять после рестарта

  function checkWinner(squares)
  {
    const winLines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];

    for(let i = 0; i < winLines.length; i++)
    {
       const [a, b, c] = winLines[i];
       if(squares[a] === squares[b] && squares[a] === squares[c] && squares[a] !== '')
          return squares[a];
    }

    if (!squares.includes(''))
    {
       restartGame();
       return 'Nobody';
    }
    return null;
  }

  function onSquareClick(i){
    if (squares[i] === '' && onPlay)
    {
      if (whoIsNext)
      {
        squares[i] = 'X';
        setNext(false);
      }
      else
      {
        squares[i] = 'O';
        setNext(true);
      }
    }
    
    afterClick();
  }

  function afterClick()
  {
    const winner = checkWinner(squares);
    if (winner !== null && winner !== 'Nobody')
    {
      setOnPlay(false);
      setGameStatus(winner + ' is win this game');
    }
    else
      setGameStatus('Next turn is: ' + (whoIsNext ? 'O' : 'X'));
  }

  function restartGame()
  {
    setOnPlay(true);
    setSquares(new Array(9).fill(''));
    setGameStatus('');
  }

  return (
    <>
      <div className='row'>
        <Square value={squares[0]} onSquareClick={() => onSquareClick(0)}/>
        <Square value={squares[1]} onSquareClick={() => onSquareClick(1)}/>
        <Square value={squares[2]} onSquareClick={() => onSquareClick(2)}/>
      </div>
      <div className='row'>
        <Square value={squares[3]} onSquareClick={() => onSquareClick(3)}/>
        <Square value={squares[4]} onSquareClick={() => onSquareClick(4)}/>
        <Square value={squares[5]} onSquareClick={() => onSquareClick(5)}/>
      </div>
      <div className='row'>
        <Square value={squares[6]} onSquareClick={() => onSquareClick(6)}/>
        <Square value={squares[7]} onSquareClick={() => onSquareClick(7)}/>
        <Square value={squares[8]} onSquareClick={() => onSquareClick(8)}/>
      </div>
      <h5 className='status'>{ gameStatus }</h5>
      <button onClick={restartGame}>Restart!</button>
    </>
  );
}
export default App;
