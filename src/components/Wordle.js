import React, { useState, useEffect } from 'react'
import useWordle from '../hooks/useWordle'

//components
import Grid from './Grid'
import Keypad from './Keypad'
import Modal from './Modal'

export default function Wordle({ solution }) {
  const { currentGuess, handleKeyUp, handleClick, guesses, isCorrect, turn, usedKeys, errorMsg  } = useWordle(solution)

  const [showModal, setShowModal] = useState(false)
  
  useEffect(() => {
    window.addEventListener('keyup', handleKeyUp)
    document.addEventListener('click', handleClick)

    if(isCorrect){
        setTimeout(() => {
            setShowModal(true)
        }, 3000)
        window.removeEventListener('keyup', handleKeyUp)
        document.removeEventListener('click', handleClick)
    }
    if(turn > 5){
        setTimeout(() => {
            setShowModal(true)
        }, 2000)
        window.removeEventListener('keyup', handleKeyUp)
        document.removeEventListener('click', handleClick)
    }

    return () => {
        window.removeEventListener('keyup', handleKeyUp)
        document.removeEventListener('click', handleClick)
    }
  }, [handleKeyUp, handleClick, isCorrect ]);

  return (
  
    <div>
    <div className='errorMsg'>{errorMsg}</div>
    <Grid currentGuess={currentGuess} guesses={guesses} turn={turn} isCorrect={isCorrect} />
    <Keypad usedKeys={usedKeys} />
    {showModal && <Modal 
    isCorrect={isCorrect} 
    solution={solution} 
    turn={turn} 
    />}
    </div>
  
  )
}
