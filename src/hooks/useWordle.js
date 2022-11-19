import {useState} from 'react';
//import solutions from '../data/db.json';
const useWordle = (solution) => {
    const [turn, setTurn] = useState(0)
    const [currentGuess, setCurrentGuess] = useState('')
    const [guesses, setGuesses] = useState([...Array(6)]) // each guess is an array
    const [history, setHistory] = useState([]) // each guess is a string
    const [isCorrect, setIsCorrect] = useState(false)
    const [usedKeys, setUsedKeys] = useState({})  
    const [errorMsg, setErrorMsg] = useState('')
  
    //format a guess into an arry of letter objects
    //e. g. [key: 'a', color: 'yellow' ]
    const formatGuess = () => {
        let solutionArray = [...solution];
        let formattedGuess = [...currentGuess].map((l) => {
            return {key: l, color: 'grey'}
        })

        //find any green letters
        formattedGuess.forEach((l, i) => {
            if(solutionArray[i] === l.key){
                formattedGuess[i].color = 'green'
                solutionArray[i] = null
            }
        })

         //find any yellow letters
         formattedGuess.forEach((l, i) => {
            if(solutionArray.includes(l.key) && l.color !== 'green'){
                formattedGuess[i].color = 'yellow'
                solutionArray[solutionArray.indexOf(l.key)] = null
            }
        })
        return formattedGuess
    }
      
    //add a new guess to the guesses state
    // update the isCorrect state if the guess is correct
    // add one to the turn state
    const addNewGuess = (formattedGuess) => {
  
        if(currentGuess === solution){
            setIsCorrect(true)
            if(turn < 1){
              console.log('you got it in: ' + (turn + 1) +' guess!')
            } else if (turn >= 1) {
              console.log('you got it in: ' + (turn + 1) +' guesses!')
            }
            formattedGuess.forEach((l, i) => {
                formattedGuess[i].color = 'winner'
          })
        
        }
        setGuesses((prevGuesses) => {
            let newGuesses = [...prevGuesses];
            newGuesses[turn] = formattedGuess
            return newGuesses
        })
        setTurn((prevTurn) => {
          console.log('prevTurn ' + prevTurn);
            return prevTurn + 1
        })
        setHistory((prevHistory) => {
            return[...prevHistory, currentGuess]
        })
        setUsedKeys(prevUsedKeys => {
            formattedGuess.forEach(l => {
              const currentColor = prevUsedKeys[l.key]
      
              if (l.color === 'green') {
                prevUsedKeys[l.key] = 'green'
                return
              }
              if (l.color === 'yellow' && currentColor !== 'green') {
                prevUsedKeys[l.key] = 'yellow'
                return
              }
              if (l.color === 'grey' && currentColor !== ('green' || 'yellow')) {
                prevUsedKeys[l.key] = 'grey'
                return
              }
            })
      
            return prevUsedKeys
          })
          setCurrentGuess('')
        }

    // handle keyup event & track current guess
    // if the user presses enter, add the new guess
    const handleKeyUp = ({ key }) => {
      
        setErrorMsg('')
        
        if (key === 'Enter') {
         
            // only add guess if turn is less than 5
            if(turn > 5){
                setErrorMsg('You used all your guesses')
                return
            }
            // do not allow duplicate words
            if(history.includes(currentGuess)){
                setErrorMsg('You already tried that word')
                return
            }
            // check word is 5 chars long
            if(currentGuess.length !== 5){
                setErrorMsg('Word must be 5 characters long')
                return
            }
               
          //  check if word is in dictionary
            // if(!solutions.includes(currentGuess)){
            //   setErrorMsg('Sorry, that word is not in the dictionary')
            //   return
            // }
          
          const formatted = formatGuess(); 
            
          addNewGuess(formatted);
        }

        if (key === 'Backspace') {
          setCurrentGuess(prev => prev.slice(0, -1))
          setErrorMsg('')
          return
        }
        if (/^[A-Za-z]$/.test(key)) {
          if (currentGuess.length < 5) {
            setCurrentGuess(prev => prev + key)
            setErrorMsg('')
          }
        }
      }

      const handleClick = (e) => {
        let letterClicked = e.target.innerHTML
       
        setErrorMsg('')
        
        if (letterClicked === 'ENTER') {
          
            // only add guess if turn is less than 5
            if(turn > 5){
                setErrorMsg('You used all your guesses')
                return
            }
            // do not allow duplicate words
            if(history.includes(currentGuess)){
                setErrorMsg('You already tried that word')
                return
            }
            // check word is 5 chars long
            if(currentGuess.length !== 5){
                setErrorMsg('Word must be 5 chars long')
                return
            }
               
            // //check if word is in dictionary
            // if(solutionsArr.includes(currentGuess)){
            
            
            // } else {
            //   setErrorMsg('Word is not in dictionary')
            //   return
            // }
          
          const formatted = formatGuess(); 
       
          addNewGuess(formatted);
        }

        if (letterClicked === 'Delete') {
          setCurrentGuess(prev => prev.slice(0, -1))
          setErrorMsg('')
          return
        }
        if (/^[A-Za-z]$/.test(letterClicked)) {
          if (currentGuess.length <= 5) {
            setCurrentGuess(prev => prev + letterClicked)
            setErrorMsg('')
          }
        }
      }
    

    return {
        currentGuess,
        guesses,
        turn,
        isCorrect,
        handleKeyUp,
        handleClick,
        usedKeys,
        errorMsg,
    }

}

export default useWordle