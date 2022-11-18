import React from 'react'

// components
import Row from './Row'

export default function Grid({ guesses, currentGuess, turn, isCorrect }) {

  return (
  
    <div>
      {guesses.map((g, i) => {
        
        if (i === turn) {
          return <Row key={i} currentGuess={currentGuess} turn={turn} isCorrect={isCorrect} />
        }
       
        return <Row key={i} guess={g} turn={turn} isCorrect={isCorrect} /> 
      })}
    </div>
  )
}