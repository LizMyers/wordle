
import React from 'react'

export default function Modal({ isCorrect, solution, turn }) {
 
  var turns = 1;
  console.log("turns " + turns);
  
  const newGame = () => {
    window.location.reload(false)
  }
  
  var wins = JSON.parse(localStorage.getItem("wins"));
  console.log('wins from local storage' + wins)
  var losses = JSON.parse(localStorage.getItem('losses'));
  var percentWon;

  if(!wins >= 1){
    wins = 0;
  }
  if(!losses >= 1){
    losses = 0;
  }
  if(!percentWon >= 0){
    percentWon = 0;
  }
  if(wins <=0 && losses <= 0){
  var count = 1;
  }

  if(isCorrect){
    wins += 1;
    localStorage.setItem('wins', wins)
    count = wins + losses
    percentWon = Math.round(wins / count * 100);
    localStorage.setItem('wins', wins);

    var msg = '';

    switch(turn){
      case 1:
        msg = 'Incredible!'
        break;
      case 2:
        msg = 'Magnificent!'
        break;
      case 3:
        msg = 'Excellent!'
        break;
      case 4:
        msg = 'Outstanding!'
        break;
      case 5:
        msg = 'Well Done!'
        break;
      case 6:
        msg = 'Congrats!'
        break;
      default:
        msg = 'Well Done!'
        break;
          
    }

    return (

      <div className="modal">
      
        {isCorrect && (
          <div>
            <h1 className="modalTitle">{msg}</h1>

            {/* <p className='solution'>{solution}</p> */}
            
            <table className='statsContainer'>
              <tbody>
              <tr>
                <td className='statsItem'>
                  <p className='statsNumber'>{count}</p>
                  <span className='statsLabel'>GAMES PLAYED</span>
                </td>

                <td className='statsItem'>
                  <p className='statsNumber'>&nbsp;{percentWon}%</p>
                  <span className='statsLabel'>PERCENT WON</span>
                </td>
              </tr>
              </tbody>
            </table>
          
            <button onClick={newGame}>New Game</button>

          </div>
        )}
      </div>
    )
  } else if (!isCorrect) {
     losses += 1;
    localStorage.setItem('losses', losses)
    count = wins + losses
    percentWon = Math.round(wins / count * 100);
    localStorage.setItem('losses', losses);
  

  return (

    <div className="modal">
    
      {!isCorrect && (
        <div>
            <h1 className="modalTitle">Better Luck Next Time!</h1>

            <p className='solution'>{solution}</p>
            
            <table className='statsContainer'>
            <tbody>
              <tr>
                <td className='statsItem'>
                  <p className='statsNumber'>{count}</p>
                  <span className='statsLabel'>GAMES PLAYED</span>
                </td>

                <td className='statsItem'>
                  <p className='statsNumber'>&nbsp;{percentWon}%</p>
                  <span className='statsLabel'>PERCENT WON</span>
                </td>
              </tr>
              </tbody>
            </table>
          
            <button onClick={newGame}>New Game</button>
            
          </div>
      )}

    </div>
  )
}
}