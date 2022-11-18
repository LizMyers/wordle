import React, { useState, useEffect } from 'react'
import data from '../data/db.json'
import Icon from '../components/Icon.js'

export default function Keypad( {usedKeys} ) {
    const[letters, setLetters] = useState(null);

    useEffect(() => {
        setLetters(data.letters)
     }, [])


  return (
    <div className="keypad">
        {letters && letters.map((l) => {
            const color = usedKeys[l.key]
            if(l.key === 'Delete'){
                return (
                    <div key={l.key} className="deleteKey">
                      Delete
                    </div>
                )
            }
            if(l.key === 'Enter'){
                return (
                    <div key={l.key} className="enterKey">ENTER</div>
                )
            }
            return (
                <div key={l.key} className={color}>{l.key}</div>    
            )
        })}
        
    </div>
  )
}
